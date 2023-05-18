import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
const Snippets = require("../scripts/libs/Snippets");

const MAXIMUM_SUPPLY: number | any = parseInt(`${process.env.MAXIMUM_SUPPLY}`);

describe("ERC721Factory", async function () {

    let ERC721FactorySmartContract:any;

    let deployerWallet:any, aliceWallet:any, bobWallet:any, charlieWallet:any, deanWallet:any, args:any;

    let deployerWalletAccount:any;
    let aliceWalletAccount:any;
    let bobWalletAccount:any;
    let charlieWalletAccount:any;
    let deanWalletAccount:any;

    beforeEach( async () => {

        const { smartContract, _deployerWallet, _aliceWallet, _bobWallet, _charlieWallet, _deanWallet, _args } = await loadFixture(deploySmartContract);

        ERC721FactorySmartContract = smartContract;
        deployerWallet = _deployerWallet;
        aliceWallet = _aliceWallet;
        bobWallet = _bobWallet;
        charlieWallet = _charlieWallet;
        deanWallet = _deanWallet;
        args = _args;

        deployerWalletAccount = await ERC721FactorySmartContract.connect(deployerWallet);
        aliceWalletAccount = await ERC721FactorySmartContract.connect(aliceWallet);
        bobWalletAccount = await ERC721FactorySmartContract.connect(bobWallet);
        charlieWalletAccount = await ERC721FactorySmartContract.connect(charlieWallet);
        deanWalletAccount = await ERC721FactorySmartContract.connect(deanWallet);

    });

    const deploySmartContract = async (): Promise<{ smartContract: any; _deployerWallet:any ; _aliceWallet: any; _bobWallet: any, _charlieWallet: any, _deanWallet: any, _args:any }> => {

        const [_deployerWallet, _aliceWallet, _bobWallet, _charlieWallet, _deanWallet] = await ethers.getSigners();

        console.log("      💰  Deploying contracts with the account:", _deployerWallet.address);

        console.log("      💴  Account balance:", (await _deployerWallet.getBalance()).toString());

        const CONTRACT_FILE: any = process.env.CONTRACT_FILE;

        const CONTRACT_PARAMS: any = require(`../scripts/contract-configs/${CONTRACT_FILE}Config.ts`)

        const ContractLinkedLibrary = await ethers.getContractFactory(CONTRACT_PARAMS.LINKED_LIBRARY);
        const contractLinkedLibrary = await ContractLinkedLibrary.deploy();
        await contractLinkedLibrary.deployed();

        const SmartContract:any = await ethers.getContractFactory(
            CONTRACT_FILE,
            {
                libraries: {
                    Snippets: contractLinkedLibrary.address,
                },
            }
        );

        
        console.warn(
            "Deploy with the following arguments",
            CONTRACT_PARAMS.ABI_VALUES
        );
        
        console.warn(
            "Deploy with the following arguments",
            CONTRACT_PARAMS.ABI_ENCODED
        );
        

        const smartContract = await SmartContract.deploy(
            CONTRACT_PARAMS.CONTRACT_NAME,
            CONTRACT_PARAMS.CONTRACT_SYMBOL,
            CONTRACT_PARAMS.ABI_ENCODED
        );

        await smartContract.deployed();

        const _args:any = {
            contractName: CONTRACT_PARAMS.CONTRACT_NAME,
            contractSymbol: CONTRACT_PARAMS.CONTRACT_SYMBOL,
            contractABI: CONTRACT_PARAMS.ABI_VALUES
        }

        console.log("  Arguments ...", _args, CONTRACT_PARAMS.ABI_ENCODED);

        return { smartContract, _deployerWallet, _aliceWallet, _bobWallet, _charlieWallet, _deanWallet, _args };

    }

    const mintTokens = async (offset:number=1, count:number = 5) => {

        let mintingFee:number = args.contractABI[7];

        for(let i=offset; i<(offset+count); i++){
                
            let txn:any = await ERC721FactorySmartContract.mintNewToken(
                aliceWallet.address,
                `metadata-${i}.json`,
                i, 
                {value: mintingFee}
            );

            await txn.wait();
        
        }

        const transaction:any = await deployerWalletAccount.mintNewToken(
            deployerWallet.address,
            `metadata-${(offset+count)}.json`,
            0, 
            {value: mintingFee}
        );

        await transaction.wait();

        const items:any = await ERC721FactorySmartContract.getNFTItems();

        return items;

    }

    const transferTokens = async () => {

        let txn:any;

        txn = await aliceWalletAccount.transferFrom(
                aliceWallet.address,
                deployerWallet.address,
                1
            );

        await txn.wait();

        txn = await aliceWalletAccount.transferFrom(
                aliceWallet.address,
                bobWallet.address,
                2
            );

        await txn.wait();

    }

    const burnTokens = async () => {

        let txn:any;

        let accountWallet:any = aliceWalletAccount;
            
        txn = await deployerWalletAccount.burnToken(1);

        await txn.wait();

        txn = await accountWallet.burnToken(3);

        await txn.wait();

    }

    describe("Deployment", () => {

        console.log("  Deploying Contract ...");

        it("Should deploy the contract successfully!", async function () {

            expect(ERC721FactorySmartContract.address).to.be.properAddress;

        });

        it("It has a name", async function () {

            expect(await ERC721FactorySmartContract.name()).to.equal(args.contractName);

        });

        it("It has a symbol", async function () {

            expect(await ERC721FactorySmartContract.symbol()).to.equal(args.contractSymbol);

        });

        it("It has a contract uri", async function () {

            expect(await ERC721FactorySmartContract.contractURI()).to.equal(args.contractABI[0]);

        });

        it("It has a base uri", async function () {

            expect(await ERC721FactorySmartContract.getBaseURI()).to.equal(args.contractABI[1]);

        });

        it("It has a maximum supply", async function () {

            expect(await ERC721FactorySmartContract.getTokenMaximumSupply()).to.equal(args.contractABI[2]);

        });

        it("It sets the royalty fraction", async function () {

            expect(await ERC721FactorySmartContract.getRoyaltyFraction()).to.equal(args.contractABI[3]);

        });

        it("It sets the royalty receiver", async function () {

            expect(await ERC721FactorySmartContract.getRoyaltyReceiver()).to.equal(args.contractABI[4]);

        });

        it("It has admins", async function () {

            expect(await ERC721FactorySmartContract.getRoyaltyFraction()).to.equal(args.contractABI[3]);

        });

        it("It has minters", async function () {

            expect(await ERC721FactorySmartContract.getRoyaltyFraction()).to.equal(args.contractABI[3]);

        });

        it("It sets the minting fee", async function () {

            expect(await ERC721FactorySmartContract.getTokenMintingFee()).to.equal(args.contractABI[7]);

        });

        it("It has owner", async function () {

            expect(await ERC721FactorySmartContract.getOwner()).to.equal(deployerWallet.address);

        });

        it("It has a minter role", async function () {

            expect(await ERC721FactorySmartContract.hasRole(Snippets.MINTER_ROLE, deployerWallet.address)).to.be.true;

        });

        it("It has a admin role", async function () {

            expect(await ERC721FactorySmartContract.hasRole(Snippets.ADMIN_ROLE, deployerWallet.address)).to.be.true;

        });

        it("It sets the collection category", async function () {

            expect(await ERC721FactorySmartContract.collectionCategory()).to.equal(parseInt(args.contractABI[8]));

        });

        it("It is pausable", async function () {

            const {pausable} = await ERC721FactorySmartContract.contractOptionsStruct()

            expect(pausable).to.be.true;

        });

        it("It is burnable", async function () {

            const {burnable} = await ERC721FactorySmartContract.contractOptionsStruct()

            expect(burnable).to.be.true;

        }); 

    });

    /*

    describe("Token Transfers", () => {

        let transaction:any;

        beforeEach( async () => {
            
            await mintTokens();

        });

        it(`Must be able to mint tokens`, async function () {

            console.warn("     🟩 Mint Tokens");

            await deployerWalletAccount.getAccountTokenBalance(aliceWallet.address).then((amount:number) =>{
                    
                expect(amount).to.equal(5);
            
            });.catch((err:any) =>{

                console.log("MINT_ERROR:", err);

            });

        });

        it("Updates the total supply after minting", async () => {
        
            const nftItems: Array<any> = await ERC721FactorySmartContract.getNFTItems();

            const currentTotalSupply:number = await ERC721FactorySmartContract.getTokenCurrentSupply();

            expect(nftItems.length).to.equal(currentTotalSupply);

            const mintedTokensCount = 6;

            expect(await ERC721FactorySmartContract.totalSupply()).to.equal(mintedTokensCount);

        });

        it("Emits TokenMinted event", async () => {
            
            expect(transaction).to.emit(ERC721FactorySmartContract, "TokenMinted")

        });

        it("Throws a {PriceBelowMintingFee} error", async () => {

            const mintingFeeExpected:number = args.contractABI[7];
            
            const mintingFeeTest:number = 6;

            await expect(ERC721FactorySmartContract.mintNewToken(
                aliceWallet.address,
                `test-nft-metadata-1.json`,
                10, 
                {value: mintingFeeTest}
            ))
            .to.be.revertedWithCustomError(ERC721FactorySmartContract, "PriceBelowMintingFee")
            .withArgs(mintingFeeExpected, mintingFeeTest, Snippets.AMOUNT_BELOW_MINTING_FEE);
            
        });

        it("Throws a {MaximumTokenSupplyReached} error", async () => {

            const mintingFee:number = args.contractABI[7];

            const tokenMaximumSupply:number = args.contractABI[2];

            let txn:any;

            for(let i=7; i<11; i++){
                
                txn = await ERC721FactorySmartContract.mintNewToken(
                    aliceWallet.address,
                    `test-nft-metadata-${i}.json`,
                    i, 
                    {value: mintingFee}
                );

                await txn.wait();
            
            }

            const outOfBoundsTokenId:number = parseInt(await ERC721FactorySmartContract.getTokenCurrentId())+1;

            await expect(ERC721FactorySmartContract.mintNewToken(
                aliceWallet.address,
                `test-nft-metadata-11.json`,
                11, 
                {value: mintingFee}
            ))
            .to.be.revertedWithCustomError(ERC721FactorySmartContract, "MaximumTokenSupplyReached")
            .withArgs(tokenMaximumSupply, outOfBoundsTokenId, Snippets.MAX_SUPPLY_REACHED);
            
        });

        it(`Must be able to transfer tokens between accounts`, async function () {
        
            console.warn("     🟩 Transfer Tokens");

            await transferTokens();

            let deployerTokens:any, aliceWalletTokens:any, bobWalletTokens:any;
            
            deployerTokens = await ERC721FactorySmartContract.getAccountTokenBalance(deployerWallet.address);

            aliceWalletTokens = await ERC721FactorySmartContract.getAccountTokenBalance(aliceWallet.address);

            bobWalletTokens = await ERC721FactorySmartContract.getAccountTokenBalance(bobWallet.address);

            expect(deployerTokens).to.equal(2);
        
            expect(aliceWalletTokens).to.equal(3);
        
            expect(bobWalletTokens).to.equal(1);
        
        });

        it("Emits TokenTransfered event", () => {
            expect(transaction).to.emit(ERC721FactorySmartContract, "TokenTransfered")
        });

        it("Throws a {ExceededMaxValue} error", async () => {

            const tokenId:number = 11;

            await expect(ERC721FactorySmartContract.tokenTransfer(
                bobWallet.address,
                tokenId
            ))
            .to.be.revertedWithCustomError(ERC721FactorySmartContract, "ExceededMaxValue")
            .withArgs(await ERC721FactorySmartContract.getTokenMaximumSupply(), tokenId, Snippets.INDEX_OUT_OF_BOUNDS);

        });

        it("Throws a {BelowMinValue} error", async () => {

            const tokenId:number = 0;

            await expect(ERC721FactorySmartContract.tokenTransfer(
                bobWallet.address,
                tokenId
            ))
            .to.be.revertedWithCustomError(ERC721FactorySmartContract, "BelowMinValue")
            .withArgs(1, tokenId, Snippets.INDEX_OUT_OF_BOUNDS);
            
        });

        it("Throws a {TokenDoesNotExists} error", async () => {

            const tokenId:number = 7;

            await expect(ERC721FactorySmartContract.tokenTransfer(
                bobWallet.address,
                tokenId
            ))
            .to.be.revertedWithCustomError(ERC721FactorySmartContract, "TokenDoesNotExists")
            .withArgs(tokenId, Snippets.TOKEN_DOES_NOT_EXISTS);
            
        });

        it(`Must be able to burn tokens`, async function () {
        
            console.warn("     🟩 Burn Tokens");

            await transferTokens();

            await burnTokens();

            let deployerTokens:any, aliceWalletTokens:any, bobWalletTokens:any;

            deployerTokens = await ERC721FactorySmartContract.getAccountTokenBalance(deployerWallet.address);

            aliceWalletTokens = await ERC721FactorySmartContract.getAccountTokenBalance(aliceWallet.address);

            bobWalletTokens = await ERC721FactorySmartContract.getAccountTokenBalance(bobWallet.address);

            //console.log("TOKEN BALANCES AFTER BURN", deployerTokens, aliceWalletTokens, bobWalletTokens);

            expect(deployerTokens).to.equal(1);
        
            expect(aliceWalletTokens).to.equal(2);
        
            expect(bobWalletTokens).to.equal(1);

            const currentTotalSupply:number = await ERC721FactorySmartContract.getTokenCurrentSupply();

            expect(currentTotalSupply).to.equal(4);
        });

        it("Updates the total supply after burning", async () => {
        
            await transferTokens();

            await burnTokens();

            const nftItems: Array<any> = await ERC721FactorySmartContract.getNFTItems();

            const currentTotalSupply:number = await ERC721FactorySmartContract.getTokenCurrentSupply();

            expect(nftItems.length).to.equal(currentTotalSupply);
            
        });

        it("Reverts with a {ERC721: invalid token ID} error", async () => {

            const tokenId:number = 0;

            await expect(ERC721FactorySmartContract.burnToken(
                tokenId
            ))
            .to.be.revertedWith("ERC721: invalid token ID");
            
        });

        it("Reverts with a {ERC721: invalid token ID} error", async () => {

            const tokenId:number = 7;

            await expect(ERC721FactorySmartContract.burnToken(
                tokenId
            ))
            .to.be.revertedWith("ERC721: invalid token ID");
            
        });

        it("Emits TokenBurned event", () => {
            expect(transaction).to.emit(ERC721FactorySmartContract, "TokenBurned")
        });


    });

    describe("Token Owners", () => {
        
        beforeEach( async () => {
            
            await mintTokens();

        });

        it("Verifies the token rightful owners, soon after mint.", async () => {
        
            console.warn("     🟩 Mint Tokens");

            const nftItems: Array<any> = await ERC721FactorySmartContract.getNFTItems();

            nftItems.map(async (nft:any) => {
                await expect(Snippets.parseNFTItem(nft).ownerAddress).to.equal(await ERC721FactorySmartContract.ownerOf(Snippets.parseNFTItem(nft).tokenId));
            });

        });

        it("Verifies the token rightful owners, soon after transfers / ownership change", async () => {
        
            console.warn("     🟩 Transfer Tokens");

            await transferTokens();

            const nftItems: Array<any> = await ERC721FactorySmartContract.getNFTItems();

            nftItems.map(async (nft:any) => {
                await expect(Snippets.parseNFTItem(nft).ownerAddress).to.equal(await ERC721FactorySmartContract.ownerOf(Snippets.parseNFTItem(nft).tokenId));
            });

        });

    });

    describe("Token Minter, Creator & Owner", () => {
        
        beforeEach( async () => {
            
            await mintTokens();

            await transferTokens();

        });

        it("Retrieve all available tokens", async () => {
        
            console.warn("     🟩 Mint Tokens");

            const nftItems: Array<any> = await ERC721FactorySmartContract.getNFTItems();
            
            expect(nftItems.length).to.equal(6);
            
        });

        it("Get token minting fee : getTokenMintingFee", async () => {

            let _mintingFee:number = 5_000_00;
            
            const transaction:any = await deployerWalletAccount.setMintingFee(_mintingFee);

            await transaction.wait();

            const mintingFee:number = await deployerWalletAccount.getTokenMintingFee();

            expect(mintingFee).to.equal(_mintingFee);

        });

        it("Get tokens minted by address : getTokensMintedByAddress", async () => {

            console.warn("     🟩 Set n Get tokens minted");
        
            const nftItems: Array<any> = await ERC721FactorySmartContract.getTokensMintedByAddress(deployerWallet.address);

            expect(nftItems.length).to.equal(6);

            nftItems.map((nft:any) => {
                expect(Snippets.parseNFTItem(nft).minterAddress).to.equal(deployerWallet.address);
            });
            
        });

        it("Get tokens minted by me : getTokensMintedByMe", async () => {
            
            const nftItems: Array<any> = await deployerWalletAccount.getTokensMintedByMe();

            expect(nftItems.length).to.equal(6);

            nftItems.map((nft:any) => {
                expect(Snippets.parseNFTItem(nft).minterAddress).to.equal(deployerWallet.address);
            });

        });

        it("Get token minter : getTokenMinter", async () => {

            let _tokenId:number = 1;
        
            const tokenMinter:string = await ERC721FactorySmartContract.getTokenMinter(_tokenId);

            expect(tokenMinter).to.equal(deployerWallet.address);
            
        });

        it("Get the first token mintee : getTokenMintee", async () => {

            let _tokenId:number = 2;

            const tokenMintee:string = await ERC721FactorySmartContract.getTokenMintee(_tokenId);

            expect(tokenMintee).to.equal(aliceWallet.address);
            
        });

        it("Get tokens created by address : getTokensCreatedByAddress", async () => {

            console.warn("     🟩 Set n Get tokens created");
        
            const nftItems: Array<any> = await ERC721FactorySmartContract.getTokensCreatedByAddress(deployerWallet.address);

            let nftItem:any = Snippets.parseNFTItem(nftItems[0]);

            expect(nftItems.length).to.equal(6);
            expect(nftItem.creatorAddress[0]).to.equal(deployerWallet.address);
            
        });

        it("Get tokens created by me : getTokensCreatedByMe", async () => {

            const nftItems: Array<any> = await deployerWalletAccount.getTokensCreatedByMe();

            let nftItem:any = Snippets.parseNFTItem(nftItems[0]);

            expect(nftItems.length).to.equal(6);
            expect(nftItem.creatorAddress[0]).to.equal(deployerWallet.address);

        });

        it("Get token creator : getTokenCreator", async () => {

            let _tokenId:number = 1;
        
            const tokenCreator:string = await ERC721FactorySmartContract.getTokenCreator(_tokenId);

            expect(tokenCreator).to.equal(deployerWallet.address);
            
        });

        it("Get tokens owned by address : getTokensOwnedByAddress", async () => {

            console.warn("     🟩 Set n Get tokens owned");
        
            const deployerTokens: Array<any> = await ERC721FactorySmartContract.getTokensOwnedByAddress(deployerWallet.address);

            expect(deployerTokens.length).to.equal(2);

            const address1Tokens: Array<any> = await ERC721FactorySmartContract.getTokensOwnedByAddress(aliceWallet.address);

            expect(address1Tokens.length).to.equal(3);

            const address2Tokens: Array<any> = await ERC721FactorySmartContract.getTokensOwnedByAddress(bobWallet.address);

            expect(address2Tokens.length).to.equal(1);

        });

        it("Get tokens owned by me : getTokensOwnedByMe", async () => {
            
            const deployerTokens: Array<any> = await deployerWalletAccount.getTokensOwnedByMe();

            expect(deployerTokens.length).to.equal(2);

        });

        it("Get token owner : getTokenOwner", async () => {

            let _tokenId:number = 2;
        
            const tokenOwner:string = await ERC721FactorySmartContract.getTokenOwner(_tokenId);

            expect(tokenOwner).to.equal(bobWallet.address);
            
        });

    });

    describe("Interact with State Variables via Getters & Setters", () => {
        
        it("Get the base uri : getBaseURI", async () => {

            console.warn("     🟩 URIs");

            let _baseURI: string = "https://domain.tld/base/url";
            
            await deployerWalletAccount.setBaseURI(_baseURI);

            const baseURI: string = await deployerWalletAccount.getBaseURI();

            expect(baseURI).to.equal(_baseURI);

        });

        it("Get the contract uri : getContractURI", async () => {

            let _contractURI: string = "ipfs://uriKey";

            let _contractURIBytes32: string = Snippets.fromStringToBytes32(_contractURI);
            
            await deployerWalletAccount.setContractURI(_contractURIBytes32);

            const contractURI: string = await deployerWalletAccount.getContractURI();

            expect(contractURI).to.equal(_contractURIBytes32);

            expect(_contractURI).to.equal(Snippets.fromBytes32ToString(_contractURIBytes32));

        });

        it("Get the token uri : getTokenURI", async () => {

            await mintTokens();

            const tokenId:number = 1;

            const _tokenURI: string = `test-nft-metadata-${tokenId}.json`;

            const baseURI: string = await ERC721FactorySmartContract.getBaseURI();

            const tokenURI: string = await ERC721FactorySmartContract.getTokenURI(tokenId);

            expect(tokenURI).to.equal(`${baseURI}${_tokenURI}`);
            
        });

        
        it("Get the token current counter : getTokenCurrentId", async () => {

            console.warn("     🟩 Token Counter");

            let _tokenIdCounter: string = "1";
            
            let _tokenURI: string = "myUrl";
            
            let transaction:any;
                
            transaction = await deployerWalletAccount.mintNewToken(
                aliceWallet.address,
                _tokenURI,
                10, 
                {value: args.contractABI[7]}
            );

            await transaction.wait();

            const tokenIdCounter: string = await deployerWalletAccount.getTokenCurrentId();

            expect(tokenIdCounter).to.equal(_tokenIdCounter);

        });


        it("Get the owner of the smart contract : getOwner", async () => {

            console.warn("     🟩 Contract Owner");

            let _owner: string = deployerWallet.address;

            const owner: string = await deployerWalletAccount.getOwner();

            expect(owner).to.equal(_owner);

        });

        it("Get the approved address of the marketplace : getMarketplaceAddress", async () => {

            console.warn("     🟩 Approved Address");

            let _marketplaceAddress: string = bobWallet.address;
            
            let transaction:any;
                
            transaction = await deployerWalletAccount.setMarketplaceAddress(
                _marketplaceAddress
            );

            await transaction.wait();

            const marketplaceAddress: string = await deployerWalletAccount.getMarketplaceAddress();

            expect(marketplaceAddress).to.equal(_marketplaceAddress);

        });

        it("Get the royalty fraction : getRoyaltyFraction", async () => {

            console.warn("     🟩 Royalties");

            let _royaltyReceiver:string = Snippets.ADDRESS_ZERO;
            
            let _royaltyFraction:number = 200;
            
            let _tokenId:number = 0;
            
            let transaction:any;
                
            transaction = await deployerWalletAccount.setRoyalties(
                _royaltyReceiver,
                _royaltyFraction,
                _tokenId
            );

            await transaction.wait();

            const royaltyFraction: string = await deployerWalletAccount.getRoyaltyFraction();

            expect(royaltyFraction).to.equal(_royaltyFraction);

        });

        it("Get the receiver of the royalties : getRoyaltyReceiver", async () => {

            let _royaltyReceiver:string = bobWallet.address;
            
            let _royaltyFraction:number = 200;
            
            let _tokenId:number = 0;
            
            let transaction:any;
                
            transaction = await deployerWalletAccount.setRoyalties(
                _royaltyReceiver,
                _royaltyFraction,
                _tokenId
            );

            await transaction.wait();

            const royaltyReciever: string = await deployerWalletAccount.getRoyaltyReceiver();

            expect(_royaltyReceiver).to.equal(royaltyReciever);

        });

        it("Get the royalty info of a specified token id : getTokenRoyaltyInfo", async () => {

            await mintTokens();

            let _royaltyReceiver:string = bobWallet.address;
            
            let _royaltyFraction:number = 200;

            let _royaltyFractionDenominator:number = await ERC721FactorySmartContract.getRoyaltyFeeDenominator();
            
            let _tokenId:number = 1;

            let _tokenPrice:number = 15_000_000;
            
            let transaction:any;
                
            transaction = await deployerWalletAccount.setRoyalties(
                _royaltyReceiver,
                _royaltyFraction,
                _tokenId
            );

            await transaction.wait();

            const royaltyInfo: any = await deployerWalletAccount.getTokenRoyaltyInfo(
                _tokenId,
                _tokenPrice
            );

            expect(royaltyInfo.royaltyIsDefined).to.equal(_royaltyFraction>0);
            expect(royaltyInfo.royaltyReceiver).to.equal(_royaltyReceiver);
            expect(royaltyInfo.royaltyFraction).to.equal(_royaltyFraction);
            expect(royaltyInfo.royaltyAmount).to.equal((_tokenPrice * _royaltyFraction / _royaltyFractionDenominator));
            expect(royaltyInfo.tokenPrice).to.equal(_tokenPrice);
            expect(royaltyInfo.tokenId).to.equal(_tokenId);

        });

        it("Throws a {RoyaltiesDisabled} error if royalties are disabled : setRoyalties", async () => {

            let _royaltyReceiver:string = bobWallet.address;
            
            let _royaltyFraction:number = 200;
            
            let _tokenId:number = 0;
            
            let _disableRoyaltiesUntil:number = parseInt(`${new Date().getTime() / 1000}`) + 6000;
            
            let transaction:any;
                
            transaction = await deployerWalletAccount.disableRoyaltiesUntil( _disableRoyaltiesUntil );

            await transaction.wait();

            await expect(deployerWalletAccount.setRoyalties(
                _royaltyReceiver,
                _royaltyFraction,
                _tokenId
            ))
            .to.be.revertedWithCustomError(ERC721FactorySmartContract, "RoyaltiesDisabled")
            .withArgs(_disableRoyaltiesUntil, Snippets.ROYALTIES_DISABLED);

        });

        it("Get the token maximum supply : getBaseURI", async () => {

            console.warn("     🟩 Supply");

            const maximumSupply: string = await deployerWalletAccount.getTokenMaximumSupply();

            expect(maximumSupply).to.equal(MAXIMUM_SUPPLY);

        });

        it("Get the token current supply : getTokenCurrentSupply", async () => {

            let _tokens:any = await mintTokens();

            const currentSupply: string = await deployerWalletAccount.getTokenCurrentSupply();

            expect(currentSupply).to.equal(_tokens.length);

        });

    });

    describe("Collection Details", () => {
        
        it("Get the collection NAME : collectionName", async () => {

            console.warn("     🟩 Information about the collection");

            let _collectionName:string = args.contractName;

            let collectionName: string = await ERC721FactorySmartContract.collectionName();

            expect(collectionName).to.equal(_collectionName);

        });

        it("Get the collection SYMBOL : collectionSymbol", async () => {

            let _collectionSymbol:string = args.contractSymbol;

            let collectionSymbol: string = await ERC721FactorySmartContract.collectionSymbol();

            expect(collectionSymbol).to.equal(_collectionSymbol);

        });

        it("Get the collection CATEGORY : collectionCategory", async () => {

            let _collectionCategory:number = parseInt(args.contractABI[8]);

            let collectionCategory:number = await ERC721FactorySmartContract.collectionCategory();

            expect(collectionCategory).to.equal(_collectionCategory);

        });

        it("Set & Get the collection DESCRIPTION : collectionDescription", async () => {

            let _collectionDescription:string = "My Collection Description";

            await deployerWalletAccount.setCollectionDescription(_collectionDescription);

            let collectionDescription: string = await ERC721FactorySmartContract.collectionDescription();

            expect(collectionDescription).to.equal(_collectionDescription);

        });

        it("Set & Get the collection BANNER_MEDIA : collectionBannerMedia", async () => {

            let _collectionBannerMedia:string = "My Collection Banner Media";

            await deployerWalletAccount.setCollectionBannerMedia(_collectionBannerMedia);

            let collectionBannerMedia: string = await ERC721FactorySmartContract.collectionBannerMedia();

            expect(collectionBannerMedia).to.equal(_collectionBannerMedia);

        });

        it("Set & Get the collection DISPLAY_PICTURE : collectionDisplayPicture", async () => {

            let _collectionDisplayPicture:string = "My Collection Display Picture";

            await deployerWalletAccount.setCollectionDisplayPicture(_collectionDisplayPicture);

            let collectionDisplayPicture: string = await ERC721FactorySmartContract.collectionDisplayPicture();

            expect(collectionDisplayPicture).to.equal(_collectionDisplayPicture);

        });

    });

    
    describe("Event Emissions", () => {
        
        beforeEach( async () => {
            
            await mintTokens();

            await transferTokens();

        });

        it("Dispatched when the contract owner has been updated : OwnerChanged", async () => {
        
            console.warn("     🟩 Emit Events");

            await expect(ERC721FactorySmartContract.setNewOwner(deanWallet.address))
                .to.emit(ERC721FactorySmartContract, "OwnerChanged")
                .withArgs(deanWallet.address);

        });

        it("Dispatched when the contract uri has been updated : ContractURIChanged", async () => {
        
            let _contractURI:string = Snippets.fromStringToBytes32("ipfs://<ID>");

            await expect(ERC721FactorySmartContract.setContractURI(_contractURI))
                .to.emit(ERC721FactorySmartContract, "ContractURIChanged")
                .withArgs(_contractURI);

        });

        it("Dispatched when the collection description has been updated : CollectionDescriptionChanged", async () => {
        
            let _description:string = "Lorem ipsum dolor sit amet, consectet dolor sit amet.";
    
            await expect(ERC721FactorySmartContract.setCollectionDescription(_description))
                .to.emit(ERC721FactorySmartContract, "CollectionDescriptionChanged")
                .withArgs(_description);
    
        });
    
        it("Dispatched when the collection banner media url has been updated : CollectionBannerMediaChanged", async () => {
            
            let _bannerURL:string = "ipfs://<ID>";
    
            await expect(ERC721FactorySmartContract.setCollectionBannerMedia(_bannerURL))
                .to.emit(ERC721FactorySmartContract, "CollectionBannerMediaChanged")
                .withArgs(_bannerURL);
    
        });
    
        it("Dispatched when the collection display picture url has been updated : CollectionDisplayPictureChanged", async () => {
            
            let _photoURL:string = "ipfs://<ID>";
    
            await expect(ERC721FactorySmartContract.setCollectionDisplayPicture(_photoURL))
                .to.emit(ERC721FactorySmartContract, "CollectionDisplayPictureChanged")
                .withArgs(_photoURL);
    
        });
    
        it("Dispatched when the base uri has been updated : BaseURIChanged", async () => {
            
            let _baseURI:string = "http://<HOSTNAME>";
    
            await expect(ERC721FactorySmartContract.setBaseURI(_baseURI))
                .to.emit(ERC721FactorySmartContract, "BaseURIChanged")
                .withArgs(_baseURI);
    
        });
    
        it("Dispatched when the marketplace address has been updated : MarketplaceAddressChanged", async () => {
            
            let _marketplacecAddress:string = deanWallet.address;
    
            await expect(ERC721FactorySmartContract.setMarketplaceAddress(_marketplacecAddress))
                .to.emit(ERC721FactorySmartContract, "MarketplaceAddressChanged")
                .withArgs(_marketplacecAddress);
    
        });
    
        it("Dispatched when the token approved address has been updated. : ApprovedAddressForTokenChanged", async () => {
            
            let _account:any = deanWallet.address;
            let _tokenId:number = 1;
    
            await expect(ERC721FactorySmartContract.approveAddressForToken(deanWallet.address, _tokenId))
                .to.emit(ERC721FactorySmartContract, "ApprovedAddressForTokenChanged")
                .withArgs(_account, _tokenId);
    
        });
    
        it("Dispatched when the mining fee has been updated : MintingFeeChanged", async () => {
            
            let _newMintingFee:number = 100;
    
            await expect(ERC721FactorySmartContract.setMintingFee(_newMintingFee))
                .to.emit(ERC721FactorySmartContract, "MintingFeeChanged")
                .withArgs(_newMintingFee);
    
        });
    
        it("Dispatched when royalties are changed : RoyaltiesChanged", async () => {
    
            let _royaltyReceiver:string = deanWallet.address;
            let _royaltyFraction:number = 100;
            let _tokenId:number = 1;
    
            await expect(ERC721FactorySmartContract.setRoyalties(_royaltyReceiver, _royaltyFraction, _tokenId))
                .to.emit(ERC721FactorySmartContract, "RoyaltiesChanged")
                .withArgs(_royaltyReceiver, _royaltyFraction, _tokenId);
    
        });
        
        it("Dispatched when royalties are enabled : RoyaltiesEnabled", async () => {
            
            let _timestamp:number = 0;
            
            await expect(ERC721FactorySmartContract.disableRoyaltiesUntil(_timestamp))
                .to.emit(ERC721FactorySmartContract, "RoyaltiesEnabled")
                .withArgs();
    
        });
    
        it("Dispatched when royalties are disabled : RoyaltiesDisabled", async () => {
    
            let _timestamp:number = parseInt(`${new Date().getTime() / 1000}`) + 6000;
            
            await expect(ERC721FactorySmartContract.disableRoyaltiesUntil(_timestamp))
                .to.emit(ERC721FactorySmartContract, "RoyaltiesDisabled")
                .withArgs(_timestamp);
    
        });
    
        it("Dispatched when a token has been minted : TokenMinted", async () => {
            
            let _from:string = Snippets.ADDRESS_ZERO;
            let _to:string = bobWallet.address;
            let _tokenURI:string = "https://www.domain.tld";
            let _tokenId:number = 7;
            let _amount:number = 1;
            let _royaltyFraction:number = 100;
            let _mintingFee:number = 1_000;
            let _currentSupply:number = parseInt(await ERC721FactorySmartContract.getTokenCurrentSupply());

            await ERC721FactorySmartContract.setMintingFee(_mintingFee);
    
            await expect(ERC721FactorySmartContract.mintNewToken(bobWallet.address, _tokenURI, _royaltyFraction, {value: _mintingFee}))
                .to.emit(ERC721FactorySmartContract, "TokenMinted")
                .withArgs(_from, _to, _tokenId, _amount);

            expect(await ERC721FactorySmartContract.totalSupply()).to.equal(_currentSupply + 1);

            expect(await ERC721FactorySmartContract.getTokenCurrentSupply()).to.equal(_tokenId);
    
        });
    
        it("Dispatched when a token has been burnt : TokenBurned", async () => {
            
            let _from:string = deployerWallet.address;
            let _to:string = Snippets.ADDRESS_ZERO;
            let _tokenId:number = 1;
            let _amount:number = 1;
    
            await expect(ERC721FactorySmartContract.burnToken(_tokenId))
                .to.emit(ERC721FactorySmartContract, "TokenBurned")
                .withArgs(_from, _to, _tokenId, _amount);
    
        });
    
        it("Dispatched when a token has been transfered : TokenTransfered", async () => {
            
            let _from:string = deployerWallet.address;
            let _to:string = charlieWallet.address;
            let _tokenId:number = 1;
            let _amount:number = 1;
    
            await expect(ERC721FactorySmartContract.tokenTransfer(charlieWallet.address, _tokenId))
                .to.emit(ERC721FactorySmartContract, "TokenTransfered")
                .withArgs(_from, _to, _tokenId, _amount);
    
        });
    
        it("Dispatched when the contract has received funds. : Received", async () => {
            
            let _account:string = deployerWallet.address;
            let _amount:number = 100;
    
            await expect(ERC721FactorySmartContract.fallback({value: _amount}))
                .to.emit(ERC721FactorySmartContract, "Received")
                .withArgs(_account, _amount);
    
        });

    
    });

    */

    describe("Error Handling", () => {
        
        beforeEach( async () => {
            
            await mintTokens(1, 5);

            await transferTokens();

        });


        it("Insufficient permissions for caller : InsufficientPermissions", async () => {
        
            console.warn("     🟩 Throw Errors");

            let _mintingFee:number = args.contractABI[7];

            let _account:string = charlieWallet.address;

            let _tokenURI:string = "ipfs://<ID>";

            let _role:string = Snippets.MINTER_ROLE;

            const _message:string = Snippets.INSUFFICIENT_PERMISSIONS;

            await expect(charlieWalletAccount.mintNewToken(
                deanWallet.address,
                _tokenURI,
                10, 
                {value: _mintingFee}
            ))
            .to.be.revertedWithCustomError(ERC721FactorySmartContract, "InsufficientPermissions")
            .withArgs(_account, _role, _message);

        });

        it("Caller is not approved or owner of the token : NotApprovedOrOwner", async () => {
        
            let _account:string = deanWallet.address;

            let _tokenId:number = 1;

            await expect(await ERC721FactorySmartContract.tokenTransfer(
                _account,
                _tokenId
            ))
            .to.be.revertedWithCustomError(ERC721FactorySmartContract, "NotApprovedOrOwner")
            .withArgs();

        });

        it("This contract is trying to be initialized without admins : NoAdmins", async () => {
        
            let _admins: Array<any> = args.contractABI[5];

            let _hasAdminRole: boolean = await ERC721FactorySmartContract.hasRole(Snippets.ADMIN_ROLE, deployerWallet.address);

            expect(_hasAdminRole).to.be.true;

            _admins.map(async (_account: string) => {

                await expect(await ERC721FactorySmartContract.hasRole(Snippets.ADMIN_ROLE, _account)).to.be.true;

            });

        });

        it("This contract is trying to be initialized without minters : NoMinters ", async () => {
        
            let _minters: Array<any> = args.contractABI[6];

            let _hasMinterRole: boolean = await ERC721FactorySmartContract.hasRole(Snippets.MINTER_ROLE, deployerWallet.address);

            expect(_hasMinterRole).to.be.true;

            _minters.map(async (_account: string) => {

                await expect(await ERC721FactorySmartContract.hasRole(Snippets.ADMIN_ROLE, _account)).to.be.true;

            });

        });

        it("Specified id must be less than the max supply defined : MaximumTokenSupplyReached", async () => {
        
            let _maxValue:number = parseInt(MAXIMUM_SUPPLY);

            let _mintingFee:number = args.contractABI[7];

            let _tokenURI:string = "http[s]://<HOSTNAME>";

            const _message:string = Snippets.MAX_SUPPLY_REACHED;

            let nftItems:any = await mintTokens(7, 3);

            let _overflowTokenId:number = nftItems.length + 1;

            console.log(nftItems.length, _overflowTokenId, nftItems);

            await expect(await ERC721FactorySmartContract.mintNewToken(
                deanWallet.address,
                _tokenURI,
                10, 
                {value: _mintingFee}
            ))
            .to.be.revertedWithCustomError(ERC721FactorySmartContract, "MaximumTokenSupplyReached")
            .withArgs(_maxValue, _overflowTokenId, _message);

        });

        it("Specified id must be less than the max supply defined : ExceededMaxValue", async () => {

            let _maxValue:number = parseInt(MAXIMUM_SUPPLY);

            await mintTokens(7, 10);

            let nftItems: Array<any> = await ERC721FactorySmartContract.getNFTItems();
        
            let _overflowTokenId:number = nftItems.length+1;

            const _message:string = Snippets.INDEX_OUT_OF_BOUNDS;

            await expect(await charlieWalletAccount.getTokenOwner(
                _overflowTokenId
            ))
            .to.be.revertedWithCustomError(ERC721FactorySmartContract, "ExceededMaxValue")
            .withArgs(_maxValue, _overflowTokenId, _message);

        });

        it("Specified id must not be less than the minimum value specified : BelowMinValue", async () => {
        
            let _minValue:number = 1;

            let _underflowTokenId:number = 0;

            const _message:string = Snippets.INDEX_OUT_OF_BOUNDS;

            await expect(charlieWalletAccount.getTokenOwner(
                _underflowTokenId
            ))
            .to.be.revertedWithCustomError(ERC721FactorySmartContract, "BelowMinValue")
            .withArgs(_minValue, _underflowTokenId, _message);

        });

        it("Specified id must represent an already minted token. Also the token must not have been burned : TokenDoesNotExists", async () => {
        
            let nftItems: Array<any> = await ERC721FactorySmartContract.getNFTItems();

            let _invalidTokenId:number = nftItems.length + 1;

            const _message:string = Snippets.TOKEN_DOES_NOT_EXISTS;

            await expect(charlieWalletAccount.getTokenOwner(
                _invalidTokenId
            ))
            .to.be.revertedWithCustomError(ERC721FactorySmartContract, "TokenDoesNotExists")
            .withArgs(_invalidTokenId, _message);

        });

        it("Specified amount must be equal to the minting fee defined : PriceBelowMintingFee", async () => {
        
            let _mintingFee:number = args.contractABI[7];

            let _value:number = 1;

            let _tokenURI:string = "http[s]://<HOSTNAME>";

            const _message:string = Snippets.AMOUNT_BELOW_MINTING_FEE;

            await expect(aliceWalletAccount.mintNewToken(
                deanWallet.address,
                _tokenURI,
                10, 
                {value: _value}
            ))
            .to.be.revertedWithCustomError(ERC721FactorySmartContract, "PriceBelowMintingFee")
            .withArgs(_mintingFee, _value, _message);

        });

        it("The specified tokenURI must be unique. Non fungible token are unique unlike ERC20 : TokenURIAlreadyExists", async () => {
        
            let _mintingFee:number = args.contractABI[7];

            let _tokenURI:string = "ipfs://<ID>";

            let _tokenExists: boolean = true;

            const _message:string = Snippets.TOKEN_URI_EXISTS;

            await aliceWalletAccount.mintNewToken(
                deanWallet.address,
                _tokenURI,
                10, 
                {value: _mintingFee}
            )

            await expect(aliceWalletAccount.mintNewToken(
                deanWallet.address,
                _tokenURI,
                10, 
                {value: _mintingFee}
            ))
            .to.be.revertedWithCustomError(ERC721FactorySmartContract, "TokenURIAlreadyExists")
            .withArgs(_tokenURI, _tokenExists, _message);

        });

        it("Specified amount must be equal to the minting fee defined : InvalidAmount", async () => {
        
            let _mintingFee:number = 0;

            await expect(aliceWalletAccount.setMintingFee(
                _mintingFee
            ))
            .to.be.revertedWithCustomError(ERC721FactorySmartContract, "InvalidAmount")
            .withArgs(Snippets.INVALID_AMOUNT);

        });

        it("The caller must not be a contract address : UnAuthorizedCaller", async () => {
        
            

        });

        it("Specified account address must be a valid ethereum wallet address : ZeroAddress", async () => {
        
            let _account:string = Snippets.ADDRESS_ZERO;

            const _message:string = Snippets.ZERO_ADDRESS;

            await expect(aliceWalletAccount.setMarketplaceAddress(
                _account
            ))
            .to.be.revertedWithCustomError(ERC721FactorySmartContract, "ZeroAddress")
            .withArgs(_account, _message);

        });

        it("Royalties are disabled for the time being : RoyaltiesDisabled", async () => {

            let _royaltyReceiver:string = deanWallet.address;

            let _royaltyFraction:number = 200;

            let _timestamp:number = new Date().getTime() + 1000;
            
            await ERC721FactorySmartContract.disableRoyaltiesUntil(_timestamp);

            const _message:string = Snippets.ROYALTIES_DISABLED;

            await expect(ERC721FactorySmartContract.setRoyalties(
                _royaltyReceiver,
                _royaltyFraction, 
                0
            ))
            .to.be.revertedWithCustomError(ERC721FactorySmartContract, "RoyaltiesDisabled")
            .withArgs(_timestamp, _message);

        });

    });

    /*

    describe("Search Capabilities", () => {
        
        it("Search using a string : searchTokenURI", async () => {

            console.warn("     🟩 Search : Basic");
            
            await mintTokens();

            let _searchQuery:string = "metadata-1"; // `test-nft-metadata-${i}.json`,

            const searchResults: any = await ERC721FactorySmartContract.searchTokenURI(_searchQuery);

            expect(searchResults.length).to.equal(1);

        });
        
        it("Search using a uint256 : searchTokenId", async () => {

            await mintTokens();

            let _tokenId:number = 5;

            const searchResults: any = await ERC721FactorySmartContract.searchTokenId(_tokenId);

            let nftItem:any = Snippets.parseNFTItem(searchResults[0]);

            expect(searchResults.length).to.equal(1);
            expect(nftItem.tokenId).to.equal(_tokenId);

        });
        
        it("Search using a timestamp CREATED_BEFORE : searchTimestamp", async () => {

            console.warn("     🟩 Search : Created Timestamp");
            
            await mintTokens();

            let _timestamp:number = parseInt(`${new Date().getTime() / 1000}`) + 60;

            const searchResults: any = await ERC721FactorySmartContract.searchTimestamp(Snippets.CREATED_BEFORE, _timestamp);

            let nftItem:any = Snippets.parseNFTItem(searchResults[0]);

            expect(searchResults.length).to.equal(6);
            expect(nftItem.createdAt).to.lt(_timestamp);

        });
        
        it("Search using a timestamp CREATED_AT : searchTimestamp", async () => {

            let nftItems: Array<any> = await mintTokens();

            let _timestamp:number = Snippets.parseNFTItem(nftItems[0]).createdAt;

            const searchResults: any = await ERC721FactorySmartContract.searchTimestamp(Snippets.CREATED_AT, _timestamp);

            let nftItem:any = Snippets.parseNFTItem(searchResults[0]);

            expect(searchResults.length).to.gt(0);
            expect(nftItem.createdAt).to.equal(_timestamp);

        });
        
        it("Search using a timestamp CREATED_AFTER : searchTimestamp", async () => {

            await mintTokens();

            let _timestamp:number = parseInt(`${new Date().getTime() / 1000}`) - 600;

            const searchResults: any = await ERC721FactorySmartContract.searchTimestamp(Snippets.CREATED_AFTER, _timestamp);

            let nftItem:any = Snippets.parseNFTItem(searchResults[0]);

            expect(searchResults.length).to.equal(6);
            expect(nftItem.createdAt).to.gt(_timestamp);

        });
        
        it("Search using a timestamp UPDATED_BEFORE : searchTimestamp", async () => {

            console.warn("     🟩 Search : Updated Timestamp");
            
            await mintTokens();

            let _timestamp:number = parseInt(`${new Date().getTime() / 1000}`) + 60;

            const searchResults: any = await ERC721FactorySmartContract.searchTimestamp(Snippets.UPDATED_BEFORE, _timestamp);

            expect(searchResults.length).to.equal(6);
            expect(Snippets.parseNFTItem(searchResults[0]).updatedAt).to.lt(_timestamp);

        });
        
        it("Search using a timestamp UPDATED_AT : searchTimestamp", async () => {

            let nftItems: Array<any> = await mintTokens();

            let _timestamp:number = Snippets.parseNFTItem(nftItems[0]).updatedAt;

            const searchResults: any = await ERC721FactorySmartContract.searchTimestamp(Snippets.UPDATED_AT, _timestamp);

            expect(searchResults.length).to.gt(0);
            expect(Snippets.parseNFTItem(searchResults[0]).updatedAt).to.equal(_timestamp);

        });
        
        it("Search using a timestamp UPDATED_AFTER : searchTimestamp", async () => {

            await mintTokens();

            let _timestamp:number = parseInt(`${new Date().getTime() / 1000}`) - 600;

            const searchResults: any = await ERC721FactorySmartContract.searchTimestamp(Snippets.UPDATED_AFTER, _timestamp);

            expect(searchResults.length).to.equal(6);
            expect(Snippets.parseNFTItem(searchResults[0]).updatedAt).to.gt(_timestamp);

        });
        
        it("Search using an account address : searchAddress", async () => {

            console.warn("     🟩 Search : Accounts");
            
            await mintTokens();

            await transferTokens(); 

            const searchResults: any = await ERC721FactorySmartContract.searchAddress(Snippets.ADDRESS, deployerWallet.address);

            expect(searchResults.length).to.equal(6);

            expect(Snippets.parseNFTItem(searchResults[0]).minterAddress).to.equal(deployerWallet.address);


        });
        
        it("Search using an account address MINTER : searchAddress", async () => {
            
            await mintTokens();

            const searchResults: any = await ERC721FactorySmartContract.searchAddress(Snippets.MINTER, deployerWallet.address);

            expect(searchResults.length).to.equal(6);
            expect(Snippets.parseNFTItem(searchResults[0]).minterAddress).to.equal(deployerWallet.address);

        });
        
        it("Search using an account address CREATOR : searchAddress", async () => {
            
            await mintTokens();

            const searchResults: any = await ERC721FactorySmartContract.searchAddress(Snippets.CREATOR, aliceWallet.address);

            expect(searchResults.length).to.equal(5);
            expect([deployerWallet.address, aliceWallet.address].includes(Snippets.parseNFTItem(searchResults[0]).minterAddress)).to.be.true;

        });
        
        it("Search using an account address OWNER : searchAddress", async () => {
            
            await mintTokens();

            await transferTokens();

            // Deployer Account
            let searchResults: any = await ERC721FactorySmartContract.searchAddress(Snippets.OWNER, deployerWallet.address);

            let nftItem: any = Snippets.parseNFTItem(searchResults[0]);
            
            let tokenOwner: string = await ERC721FactorySmartContract.getTokenOwner(nftItem.tokenId);

            expect(searchResults.length).to.equal(2);
            expect(tokenOwner).to.equal(deployerWallet.address);
            expect(nftItem.ownerAddress).to.equal(deployerWallet.address);

            // Alice Wallet
            searchResults = await ERC721FactorySmartContract.searchAddress(Snippets.OWNER, aliceWallet.address);

            nftItem = Snippets.parseNFTItem(searchResults[0]);

            tokenOwner = await ERC721FactorySmartContract.getTokenOwner(nftItem.tokenId);

            expect(searchResults.length).to.equal(3);
            expect(tokenOwner).to.equal(aliceWallet.address);
            expect(nftItem.ownerAddress).to.equal(aliceWallet.address);

            // Bob Wallet
            searchResults = await ERC721FactorySmartContract.searchAddress(Snippets.OWNER, bobWallet.address);

            nftItem = Snippets.parseNFTItem(searchResults[0]);

            tokenOwner = await ERC721FactorySmartContract.getTokenOwner(nftItem.tokenId);

            expect(searchResults.length).to.equal(1);
            expect(tokenOwner).to.equal(bobWallet.address);
            expect(nftItem.ownerAddress).to.equal(bobWallet.address);

        });
        
    });

    */

    describe("Role Management", () => {
        
        beforeEach( async () => {
            
            await mintTokens();

        });

        it("Verifies the token rightful owners, soon after mint.", async () => {
        
            console.warn("     🟩 Has Admin");

            const nftItems: Array<any> = await ERC721FactorySmartContract.getNFTItems();

            nftItems.map(async (nft:any) => {
                await expect(Snippets.parseNFTItem(nft).ownerAddress).to.equal(await ERC721FactorySmartContract.ownerOf(Snippets.parseNFTItem(nft).tokenId));
            });

        });

    });

    await new Promise(res =>  setTimeout(() => res(null), 5000));

});
