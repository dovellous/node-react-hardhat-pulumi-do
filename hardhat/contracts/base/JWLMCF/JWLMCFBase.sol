// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "../../libs/Snippets.sol";
import "./IJWLX.sol";
import "../JWLXTKN/JWLXTKNFactoryBase.sol";

contract JWLMCFBase is Ownable, ReentrancyGuard {
    using Snippets for *;

    using SafeERC20 for *;

    using Math for uint256;

    struct UserInfo {
        uint256 amount;
        uint256 pendingReward;
    }

    struct PoolInfo {
        IJWLX lpToken;
        uint256 allocPoint;
        uint256 lastRewardBlock;
        uint256 rewardTokenPerShare;
    }

    IJWLX public jwlx;
    address public dev;
    uint256 public jwlrPerBlock;

    PoolInfo[] public poolInfo;
    mapping(uint256 => mapping(address => UserInfo)) public userInfo;
    uint256 public totalAllocation = 0;
    uint256 public startBlock;
    uint256 public BONUS_MULTIPLIER;

    event Deposit(address indexed user, uint256 indexed pid, uint256 amount);
    event Withdraw(address indexed user, uint256 indexed pid, uint256 amount);
    event EmergencyWithdraw(
        address indexed user,
        uint256 indexed pid,
        uint256 amount
    );

    constructor(
        IJWLX _jwlx,
        address _dev,
        uint256 _jwlrPerBlock,
        uint256 _startBlock,
        uint256 _multiplier
    ) Ownable(_msgSender()) {
        jwlx = _jwlx;
        dev = _dev;
        jwlrPerBlock = _jwlrPerBlock;
        startBlock = _startBlock;
        BONUS_MULTIPLIER = _multiplier;

        poolInfo.push(
            PoolInfo({
                lpToken: _jwlx,
                allocPoint: 1000,
                lastRewardBlock: startBlock,
                rewardTokenPerShare: 0
            })
        );
        totalAllocation = 1000;
    }

    modifier validatePool(uint256 _pid) {
        require(_pid < poolInfo.length, "pool Id Invalid");
        _;
    }

    function updateMultiplier(uint256 multiplierNumber) public onlyOwner {
        BONUS_MULTIPLIER = multiplierNumber;
    }

    function poolLength() external view returns (uint256) {
        return poolInfo.length;
    }

    function checkPoolDuplicate(IJWLX _lpToken) public view {
        uint256 length = poolInfo.length;
        for (uint256 _pid = 0; _pid < length; _pid++) {
            require(poolInfo[_pid].lpToken != _lpToken, "add: existing pool");
        }
    }

    function add(
        uint256 _allocPoint,
        IJWLX _lpToken,
        bool _withUpdate
    ) public onlyOwner {
        if (_withUpdate) {
            massUpdatePools();
        }
        checkPoolDuplicate(_lpToken);
        uint256 lastRewardBlock = block.number > startBlock
            ? block.number
            : startBlock;
        totalAllocation = Snippets.mathAdd(totalAllocation, _allocPoint);
        poolInfo.push(
            PoolInfo({
                lpToken: _lpToken,
                allocPoint: _allocPoint,
                lastRewardBlock: lastRewardBlock,
                rewardTokenPerShare: 0
            })
        );
        updateStakingPool();
    }

    function set(
        uint256 _pid,
        uint256 _allocPoint,
        bool _withUpdate
    ) public onlyOwner {
        if (_withUpdate) {
            massUpdatePools();
        }
        uint256 prevAllocPoint = poolInfo[_pid].allocPoint;
        poolInfo[_pid].allocPoint = _allocPoint;
        if (prevAllocPoint != _allocPoint) {
            totalAllocation = Snippets.mathSubAdd(
                totalAllocation,
                prevAllocPoint,
                _allocPoint
            );
            updateStakingPool();
        }
    }

    function updateStakingPool() internal {
        uint256 length = poolInfo.length;
        uint256 points = 0;
        for (uint256 pid = 1; pid < length; ++pid) {
            points = points + (poolInfo[pid].allocPoint);
        }
        if (points != 0) {
            points = points / (3);
            totalAllocation = Snippets.mathSubAdd(
                totalAllocation,
                poolInfo[0].allocPoint,
                points
            );
            poolInfo[0].allocPoint = points;
        }
    }

    function getMultiplier(
        uint256 _from,
        uint256 _to
    ) public view returns (uint256) {
        return Snippets.mathSubMul(_to, _from, BONUS_MULTIPLIER);
    }

    function pendingReward(
        uint256 _pid,
        address _user
    ) external returns (uint256) {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][_user];
        uint256 rewardTokenPerShare = pool.rewardTokenPerShare;
        uint256 lpSupply = pool.lpToken.balanceOf(address(this));
        if (block.number > pool.lastRewardBlock && lpSupply != 0) {
            uint256 multiplier = getMultiplier(
                pool.lastRewardBlock,
                block.number
            );
            uint256 tokenReward = Snippets.mathMulDiv(
                (multiplier * jwlrPerBlock),
                pool.allocPoint,
                totalAllocation
            );
            rewardTokenPerShare = Snippets.mathDivAdd(
                tokenReward * 10 ** 12,
                lpSupply,
                rewardTokenPerShare
            );
        }
        return
            Snippets.mathMulSub(
                user.amount,
                ((rewardTokenPerShare / 10) * 10 ** 12),
                user.pendingReward
            );
    }

    function massUpdatePools() public {
        uint256 length = poolInfo.length;
        for (uint256 pid = 0; pid < length; ++pid) {
            updatePool(pid);
        }
    }

    function updatePool(uint256 _pid) public validatePool(_pid) {
        PoolInfo storage pool = poolInfo[_pid];
        if (block.number <= pool.lastRewardBlock) {
            return;
        }
        uint256 lpSupply = pool.lpToken.balanceOf(address(this));
        if (lpSupply == 0) {
            pool.lastRewardBlock = block.number;
            return;
        }
        uint256 multiplier = getMultiplier(pool.lastRewardBlock, block.number);
        uint256 tokenReward = Snippets.mathMulDiv(
            (multiplier * jwlrPerBlock),
            pool.allocPoint,
            totalAllocation
        );

        jwlx.mint(dev, Snippets.mathDiv(tokenReward, 10));

        //Todo: jwlx.mint(address(jwlp), tokenReward);

        pool.rewardTokenPerShare = Snippets.mathAddDiv(
            pool.rewardTokenPerShare,
            (tokenReward * 10 ** 12),
            lpSupply
        );
        pool.lastRewardBlock = block.number;
    }

    function stake(uint256 _pid, uint256 _amount) public validatePool(_pid) {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        updatePool(_pid);
        if (user.amount > 0) {
            uint256 pending = (user.amount * (pool.rewardTokenPerShare)) /
                (1e12) -
                (user.pendingReward);
            if (pending > 0) {
                safeJWLXTransfer(msg.sender, pending);
            }
        }
        if (_amount > 0) {
            pool.lpToken.safeTransferFrom(
                address(msg.sender),
                address(this),
                _amount
            );
            user.amount = Snippets.mathAdd(user.amount, _amount);
        }
        user.pendingReward = Snippets.mathMulDiv(
            user.amount,
            pool.rewardTokenPerShare,
            (10 ** 12)
        );
        emit Deposit(msg.sender, _pid, _amount);
    }

    function autoCompound() public {
        PoolInfo storage pool = poolInfo[0];
        UserInfo storage user = userInfo[0][msg.sender];
        updatePool(0);
        if (user.amount > 0) {
            uint256 pending = Snippets.mathMulSub(
                user.amount,
                (pool.rewardTokenPerShare) / (10 ** 12),
                user.pendingReward
            );
            if (pending > 0) {
                user.amount = Snippets.mathAdd(user.amount, pending);
            }
        }
        user.pendingReward = Snippets.mathMulDiv(
            user.amount,
            pool.rewardTokenPerShare,
            (10 ** 12)
        );
    }

    function unstake(uint256 _pid, uint256 _amount) public validatePool(_pid) {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        require(user.amount >= _amount, "withdraw: not good");
        updatePool(_pid);
        uint256 pending = Snippets.mathMulSub(
            user.amount,
            (pool.rewardTokenPerShare / 10 ** 12),
            user.pendingReward
        );
        if (pending > 0) {
            safeJWLXTransfer(msg.sender, pending);
        }
        if (_amount > 0) {
            user.amount = Snippets.mathSub(user.amount, _amount);
            pool.lpToken.safeTransfer(address(msg.sender), _amount);
        }
        user.pendingReward = Snippets.mathMulDiv(
            user.amount,
            pool.rewardTokenPerShare,
            (10 ** 12)
        );
        emit Withdraw(msg.sender, _pid, _amount);
    }

    function emergencyWithdraw(uint256 _pid) public {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        pool.lpToken.safeTransfer(address(msg.sender), user.amount);
        emit EmergencyWithdraw(msg.sender, _pid, user.amount);
        user.amount = 0;
        user.pendingReward = 0;
    }

    function getPoolInfo(
        uint256 _pid
    )
        public
        view
        returns (
            address lpToken,
            uint256 allocPoint,
            uint256 lastRewardBlock,
            uint256 rewardTokenPerShare
        )
    {
        return (
            address(poolInfo[_pid].lpToken),
            poolInfo[_pid].allocPoint,
            poolInfo[_pid].lastRewardBlock,
            poolInfo[_pid].rewardTokenPerShare
        );
    }

    function safeJWLXTransfer(address _to, uint256 _amount) internal {
        jwlx.safeJWLXTransfer(_to, _amount);
    }

    function changeDev(address _dev) public {
        require(msg.sender == dev, "Not Authorized");
        dev = _dev;
    }
}
