/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  MyToken1155,
  MyToken1155Interface,
} from "../../../contracts/_samples/MyToken1155";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "defaultAdmin",
        type: "address",
      },
      {
        internalType: "address",
        name: "pauser",
        type: "address",
      },
      {
        internalType: "address",
        name: "minter",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AccessControlBadConfirmation",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "neededRole",
        type: "bytes32",
      },
    ],
    name: "AccessControlUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC1155InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC1155InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "idsLength",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "valuesLength",
        type: "uint256",
      },
    ],
    name: "ERC1155InvalidArrayLength",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "ERC1155InvalidOperator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC1155InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC1155InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC1155MissingApprovalForAll",
    type: "error",
  },
  {
    inputs: [],
    name: "EnforcedPause",
    type: "error",
  },
  {
    inputs: [],
    name: "ExpectedPause",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MINTER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PAUSER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "URI_SETTER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "burnBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "exists",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "mintBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "callerConfirmation",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "newuri",
        type: "string",
      },
    ],
    name: "setURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162002259380380620022598339810160408190526200003491620001b7565b60405180606001604052806026815260200162002233602691396200005981620000d5565b506004805460ff1916905562000071600084620000e7565b506200009e7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a83620000e7565b50620000cb7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a682620000e7565b5050505062000372565b6002620000e38282620002a6565b5050565b60008281526003602090815260408083206001600160a01b038516845290915281205460ff16620001905760008381526003602090815260408083206001600160a01b03861684529091529020805460ff19166001179055620001473390565b6001600160a01b0316826001600160a01b0316847f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a450600162000194565b5060005b92915050565b80516001600160a01b0381168114620001b257600080fd5b919050565b600080600060608486031215620001cd57600080fd5b620001d8846200019a565b9250620001e8602085016200019a565b9150620001f8604085016200019a565b90509250925092565b634e487b7160e01b600052604160045260246000fd5b600181811c908216806200022c57607f821691505b6020821081036200024d57634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620002a157600081815260208120601f850160051c810160208610156200027c5750805b601f850160051c820191505b818110156200029d5782815560010162000288565b5050505b505050565b81516001600160401b03811115620002c257620002c262000201565b620002da81620002d3845462000217565b8462000253565b602080601f831160018114620003125760008415620002f95750858301515b600019600386901b1c1916600185901b1785556200029d565b600085815260208120601f198616915b82811015620003435788860151825594840194600190910190840162000322565b5085821015620003625787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b611eb180620003826000396000f3fe608060405234801561001057600080fd5b50600436106101c35760003560e01c80636b20c454116100f9578063bd85b03911610097578063e63ab1e911610071578063e63ab1e914610415578063e985e9c51461043c578063f242432a14610478578063f5298aca1461048b57600080fd5b8063bd85b039146103bb578063d5391393146103db578063d547741f1461040257600080fd5b80638456cb59116100d35780638456cb591461035f57806391d1485414610367578063a217fddf146103a0578063a22cb465146103a857600080fd5b80636b20c45414610312578063731133e9146103255780637f3457101461033857600080fd5b80632eb2c2d6116101665780633f4ba83a116101405780633f4ba83a146102bd5780634e1273f4146102c55780634f558e79146102e55780635c975abb1461030757600080fd5b80632eb2c2d6146102845780632f2ff15d1461029757806336568abe146102aa57600080fd5b80630e89341c116101a25780630e89341c1461022657806318160ddd146102465780631f7fdffa1461024e578063248a9ca31461026157600080fd5b8062fdd58e146101c857806301ffc9a7146101ee57806302fe530514610211575b600080fd5b6101db6101d636600461153e565b61049e565b6040519081526020015b60405180910390f35b6102016101fc36600461157e565b6104c6565b60405190151581526020016101e5565b61022461021f366004611641565b6104d1565b005b610239610234366004611692565b610508565b6040516101e591906116f1565b6006546101db565b61022461025c3660046117b3565b61059c565b6101db61026f366004611692565b60009081526003602052604090206001015490565b61022461029236600461184c565b6105d9565b6102246102a53660046118f6565b610664565b6102246102b83660046118f6565b61068f565b6102246106c7565b6102d86102d3366004611922565b6106fc565b6040516101e59190611a1d565b6102016102f3366004611692565b600090815260056020526040902054151590565b60045460ff16610201565b610224610320366004611a30565b6107d1565b610224610333366004611aa4565b610830565b6101db7f7804d923f43a17d325d77e781528e0793b2edd9890ab45fc64efd7b4b427744c81565b610224610866565b6102016103753660046118f6565b60009182526003602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6101db600081565b6102246103b6366004611af9565b610898565b6101db6103c9366004611692565b60009081526005602052604090205490565b6101db7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a681565b6102246104103660046118f6565b6108a3565b6101db7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a81565b61020161044a366004611b35565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205460ff1690565b610224610486366004611b5f565b6108c8565b610224610499366004611bc4565b610946565b6000818152602081815260408083206001600160a01b03861684529091529020545b92915050565b60006104c08261097c565b7f7804d923f43a17d325d77e781528e0793b2edd9890ab45fc64efd7b4b427744c6104fb816109a1565b610504826109ab565b5050565b60606002805461051790611bf7565b80601f016020809104026020016040519081016040528092919081815260200182805461054390611bf7565b80156105905780601f1061056557610100808354040283529160200191610590565b820191906000526020600020905b81548152906001019060200180831161057357829003601f168201915b50505050509050919050565b7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a66105c6816109a1565b6105d2858585856109b7565b5050505050565b336001600160a01b038616811480159061061957506001600160a01b0380871660009081526001602090815260408083209385168352929052205460ff16155b1561064f5760405163711bec9160e11b81526001600160a01b038083166004830152871660248201526044015b60405180910390fd5b61065c86868686866109ef565b505050505050565b60008281526003602052604090206001015461067f816109a1565b6106898383610a4f565b50505050565b6001600160a01b03811633146106b85760405163334bd91960e11b815260040160405180910390fd5b6106c28282610afd565b505050565b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a6106f1816109a1565b6106f9610b84565b50565b6060815183511461072d5781518351604051635b05999160e01b815260048101929092526024820152604401610646565b6000835167ffffffffffffffff811115610749576107496115a2565b604051908082528060200260200182016040528015610772578160200160208202803683370190505b50905060005b84518110156107c95760208082028601015161079c9060208084028701015161049e565b8282815181106107ae576107ae611c31565b60209081029190910101526107c281611c5d565b9050610778565b509392505050565b6001600160a01b03831633148015906107f157506107ef833361044a565b155b1561082557335b60405163711bec9160e11b81526001600160a01b0391821660048201529084166024820152604401610646565b6106c2838383610bd6565b7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a661085a816109a1565b6105d285858585610c1c565b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a610890816109a1565b6106f9610c79565b610504338383610cb6565b6000828152600360205260409020600101546108be816109a1565b6106898383610afd565b336001600160a01b038616811480159061090857506001600160a01b0380871660009081526001602090815260408083209385168352929052205460ff16155b156109395760405163711bec9160e11b81526001600160a01b03808316600483015287166024820152604401610646565b61065c8686868686610d4c565b6001600160a01b03831633148015906109665750610964833361044a565b155b1561097157336107f8565b6106c2838383610dda565b60006001600160e01b03198216637965db0b60e01b14806104c057506104c082610e42565b6106f98133610e92565b60026105048282611cbc565b6001600160a01b0384166109e157604051632bfa23e760e11b815260006004820152602401610646565b610689600085858585610ee7565b6001600160a01b038416610a1957604051632bfa23e760e11b815260006004820152602401610646565b6001600160a01b038516610a4257604051626a0d4560e21b815260006004820152602401610646565b6105d28585858585610ee7565b60008281526003602090815260408083206001600160a01b038516845290915281205460ff16610af55760008381526003602090815260408083206001600160a01b03861684529091529020805460ff19166001179055610aad3390565b6001600160a01b0316826001600160a01b0316847f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45060016104c0565b5060006104c0565b60008281526003602090815260408083206001600160a01b038516845290915281205460ff1615610af55760008381526003602090815260408083206001600160a01b0386168085529252808320805460ff1916905551339286917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45060016104c0565b610b8c610f3a565b6004805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b6001600160a01b038316610bff57604051626a0d4560e21b815260006004820152602401610646565b6106c2836000848460405180602001604052806000815250610ee7565b6001600160a01b038416610c4657604051632bfa23e760e11b815260006004820152602401610646565b6040805160018082526020820186905281830190815260608201859052608082019092529061065c600087848487610ee7565b610c81610f5f565b6004805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258610bb93390565b6001600160a01b038216610cdf5760405162ced3e160e81b815260006004820152602401610646565b6001600160a01b03838116600081815260016020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001600160a01b038416610d7657604051632bfa23e760e11b815260006004820152602401610646565b6001600160a01b038516610d9f57604051626a0d4560e21b815260006004820152602401610646565b60408051600180825260208201869052818301908152606082018590526080820190925290610dd18787848487610ee7565b50505050505050565b6001600160a01b038316610e0357604051626a0d4560e21b815260006004820152602401610646565b604080516001808252602082018590528183019081526060820184905260a082019092526000608082018181529192916105d291879185908590610ee7565b60006001600160e01b03198216636cdb3d1360e11b1480610e7357506001600160e01b031982166303a24d0760e21b145b806104c057506301ffc9a760e01b6001600160e01b03198316146104c0565b60008281526003602090815260408083206001600160a01b038516845290915290205460ff166105045760405163e2517d3f60e01b81526001600160a01b038216600482015260248101839052604401610646565b610ef385858585610f83565b6001600160a01b038416156105d25782513390600103610f2c5760208481015190840151610f25838989858589610f8f565b505061065c565b61065c8187878787876110b3565b60045460ff16610f5d57604051638dfc202b60e01b815260040160405180910390fd5b565b60045460ff1615610f5d5760405163d93c066560e01b815260040160405180910390fd5b6106898484848461119c565b6001600160a01b0384163b1561065c5760405163f23a6e6160e01b81526001600160a01b0385169063f23a6e6190610fd39089908990889088908890600401611d7c565b6020604051808303816000875af192505050801561100e575060408051601f3d908101601f1916820190925261100b91810190611dbf565b60015b611077573d80801561103c576040519150601f19603f3d011682016040523d82523d6000602084013e611041565b606091505b50805160000361106f57604051632bfa23e760e11b81526001600160a01b0386166004820152602401610646565b805181602001fd5b6001600160e01b0319811663f23a6e6160e01b14610dd157604051632bfa23e760e11b81526001600160a01b0386166004820152602401610646565b6001600160a01b0384163b1561065c5760405163bc197c8160e01b81526001600160a01b0385169063bc197c81906110f79089908990889088908890600401611ddc565b6020604051808303816000875af1925050508015611132575060408051601f3d908101601f1916820190925261112f91810190611dbf565b60015b611160573d80801561103c576040519150601f19603f3d011682016040523d82523d6000602084013e611041565b6001600160e01b0319811663bc197c8160e01b14610dd157604051632bfa23e760e11b81526001600160a01b0386166004820152602401610646565b6111a8848484846112f6565b6001600160a01b03841661125b576000805b83518110156112415760008382815181106111d7576111d7611c31565b6020026020010151905080600560008785815181106111f8576111f8611c31565b60200260200101518152602001908152602001600020600082825461121d9190611e3a565b9091555061122d90508184611e3a565b9250508061123a90611c5d565b90506111ba565b5080600660008282546112549190611e3a565b9091555050505b6001600160a01b038316610689576000805b83518110156112e557600083828151811061128a5761128a611c31565b6020026020010151905080600560008785815181106112ab576112ab611c31565b6020026020010151815260200190815260200160002060008282540392505081905550808301925050806112de90611c5d565b905061126d565b506006805491909103905550505050565b6112fe610f5f565b6106898484848480518251146113345781518151604051635b05999160e01b815260048101929092526024820152604401610646565b3360005b8351811015611443576020818102858101820151908501909101516001600160a01b038816156113eb576000828152602081815260408083206001600160a01b038c168452909152902054818110156113c4576040516303dee4c560e01b81526001600160a01b038a166004820152602481018290526044810183905260648101849052608401610646565b6000838152602081815260408083206001600160a01b038d16845290915290209082900390555b6001600160a01b03871615611430576000828152602081815260408083206001600160a01b038b1684529091528120805483929061142a908490611e3a565b90915550505b50508061143c90611c5d565b9050611338565b5082516001036114c45760208301516000906020840151909150856001600160a01b0316876001600160a01b0316846001600160a01b03167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6285856040516114b5929190918252602082015260400190565b60405180910390a450506105d2565b836001600160a01b0316856001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8686604051611513929190611e4d565b60405180910390a45050505050565b80356001600160a01b038116811461153957600080fd5b919050565b6000806040838503121561155157600080fd5b61155a83611522565b946020939093013593505050565b6001600160e01b0319811681146106f957600080fd5b60006020828403121561159057600080fd5b813561159b81611568565b9392505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156115e1576115e16115a2565b604052919050565b600067ffffffffffffffff831115611603576116036115a2565b611616601f8401601f19166020016115b8565b905082815283838301111561162a57600080fd5b828260208301376000602084830101529392505050565b60006020828403121561165357600080fd5b813567ffffffffffffffff81111561166a57600080fd5b8201601f8101841361167b57600080fd5b61168a848235602084016115e9565b949350505050565b6000602082840312156116a457600080fd5b5035919050565b6000815180845260005b818110156116d1576020818501810151868301820152016116b5565b506000602082860101526020601f19601f83011685010191505092915050565b60208152600061159b60208301846116ab565b600067ffffffffffffffff82111561171e5761171e6115a2565b5060051b60200190565b600082601f83011261173957600080fd5b8135602061174e61174983611704565b6115b8565b82815260059290921b8401810191818101908684111561176d57600080fd5b8286015b848110156117885780358352918301918301611771565b509695505050505050565b600082601f8301126117a457600080fd5b61159b838335602085016115e9565b600080600080608085870312156117c957600080fd5b6117d285611522565b9350602085013567ffffffffffffffff808211156117ef57600080fd5b6117fb88838901611728565b9450604087013591508082111561181157600080fd5b61181d88838901611728565b9350606087013591508082111561183357600080fd5b5061184087828801611793565b91505092959194509250565b600080600080600060a0868803121561186457600080fd5b61186d86611522565b945061187b60208701611522565b9350604086013567ffffffffffffffff8082111561189857600080fd5b6118a489838a01611728565b945060608801359150808211156118ba57600080fd5b6118c689838a01611728565b935060808801359150808211156118dc57600080fd5b506118e988828901611793565b9150509295509295909350565b6000806040838503121561190957600080fd5b8235915061191960208401611522565b90509250929050565b6000806040838503121561193557600080fd5b823567ffffffffffffffff8082111561194d57600080fd5b818501915085601f83011261196157600080fd5b8135602061197161174983611704565b82815260059290921b8401810191818101908984111561199057600080fd5b948201945b838610156119b5576119a686611522565b82529482019490820190611995565b965050860135925050808211156119cb57600080fd5b506119d885828601611728565b9150509250929050565b600081518084526020808501945080840160005b83811015611a12578151875295820195908201906001016119f6565b509495945050505050565b60208152600061159b60208301846119e2565b600080600060608486031215611a4557600080fd5b611a4e84611522565b9250602084013567ffffffffffffffff80821115611a6b57600080fd5b611a7787838801611728565b93506040860135915080821115611a8d57600080fd5b50611a9a86828701611728565b9150509250925092565b60008060008060808587031215611aba57600080fd5b611ac385611522565b93506020850135925060408501359150606085013567ffffffffffffffff811115611aed57600080fd5b61184087828801611793565b60008060408385031215611b0c57600080fd5b611b1583611522565b915060208301358015158114611b2a57600080fd5b809150509250929050565b60008060408385031215611b4857600080fd5b611b5183611522565b915061191960208401611522565b600080600080600060a08688031215611b7757600080fd5b611b8086611522565b9450611b8e60208701611522565b93506040860135925060608601359150608086013567ffffffffffffffff811115611bb857600080fd5b6118e988828901611793565b600080600060608486031215611bd957600080fd5b611be284611522565b95602085013595506040909401359392505050565b600181811c90821680611c0b57607f821691505b602082108103611c2b57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600060018201611c6f57611c6f611c47565b5060010190565b601f8211156106c257600081815260208120601f850160051c81016020861015611c9d5750805b601f850160051c820191505b8181101561065c57828155600101611ca9565b815167ffffffffffffffff811115611cd657611cd66115a2565b611cea81611ce48454611bf7565b84611c76565b602080601f831160018114611d1f5760008415611d075750858301515b600019600386901b1c1916600185901b17855561065c565b600085815260208120601f198616915b82811015611d4e57888601518255948401946001909101908401611d2f565b5085821015611d6c5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60006001600160a01b03808816835280871660208401525084604083015283606083015260a06080830152611db460a08301846116ab565b979650505050505050565b600060208284031215611dd157600080fd5b815161159b81611568565b60006001600160a01b03808816835280871660208401525060a06040830152611e0860a08301866119e2565b8281036060840152611e1a81866119e2565b90508281036080840152611e2e81856116ab565b98975050505050505050565b808201808211156104c0576104c0611c47565b604081526000611e6060408301856119e2565b8281036020840152611e7281856119e2565b9594505050505056fea2646970667358221220453be3571f0ad6af5ebf8d6684b2ed41b6d14fff0207d402aaa82462127f839964736f6c6343000814003368747470733a2f2f7777772e6f70656e7a657070656c696e2e636f6d2f636f6e747261637473";

type MyToken1155ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MyToken1155ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MyToken1155__factory extends ContractFactory {
  constructor(...args: MyToken1155ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    defaultAdmin: AddressLike,
    pauser: AddressLike,
    minter: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      defaultAdmin,
      pauser,
      minter,
      overrides || {}
    );
  }
  override deploy(
    defaultAdmin: AddressLike,
    pauser: AddressLike,
    minter: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      defaultAdmin,
      pauser,
      minter,
      overrides || {}
    ) as Promise<
      MyToken1155 & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): MyToken1155__factory {
    return super.connect(runner) as MyToken1155__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MyToken1155Interface {
    return new Interface(_abi) as MyToken1155Interface;
  }
  static connect(address: string, runner?: ContractRunner | null): MyToken1155 {
    return new Contract(address, _abi, runner) as unknown as MyToken1155;
  }
}
