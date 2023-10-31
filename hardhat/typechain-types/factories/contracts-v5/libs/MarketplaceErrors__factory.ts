/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  MarketplaceErrors,
  MarketplaceErrorsInterface,
} from "../../../contracts-v5/libs/MarketplaceErrors";

const _abi = [
  {
    inputs: [],
    name: "CallerNotHighestBidder",
    type: "error",
  },
  {
    inputs: [],
    name: "CallerNotLister",
    type: "error",
  },
  {
    inputs: [],
    name: "CallerNotSeller",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "InvalidAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "InvalidAmount",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "InvalidInterfaceId",
    type: "error",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes4",
            name: "tokenInterfaceId",
            type: "bytes4",
          },
          {
            internalType: "bool",
            name: "sold",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isListed",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isAuction",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "supportsRoyalties",
            type: "bool",
          },
          {
            internalType: "address",
            name: "tokenContractAddress",
            type: "address",
          },
          {
            internalType: "address payable[3]",
            name: "creatorSellerOwner",
            type: "address[3]",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "updatedAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokenIndexedID",
            type: "uint256",
          },
        ],
        internalType: "struct Structs.NFTMarketItem",
        name: "marketplaceItem",
        type: "tuple",
      },
    ],
    name: "InvalidMarketItem",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenIndexedID",
        type: "uint256",
      },
    ],
    name: "ItemAlreadyOnAuction",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenIndexedID",
        type: "uint256",
      },
    ],
    name: "ItemAlreadyOnSale",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenIndexedID",
        type: "uint256",
      },
    ],
    name: "ItemAlreadySold",
    type: "error",
  },
  {
    inputs: [],
    name: "ItemListingPriceTooLow",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "mintingFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "ItemPriceTooLow",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "mintingFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "ListingPriceTooLow",
    type: "error",
  },
  {
    inputs: [],
    name: "NotTokenOwner",
    type: "error",
  },
] as const;

const _bytecode =
  "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220e325b26a58d34af1d9ed806ab85a0de94fc92668bbac37b2a758ecb373b87a9864736f6c63430008150033";

type MarketplaceErrorsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MarketplaceErrorsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MarketplaceErrors__factory extends ContractFactory {
  constructor(...args: MarketplaceErrorsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      MarketplaceErrors & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): MarketplaceErrors__factory {
    return super.connect(runner) as MarketplaceErrors__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MarketplaceErrorsInterface {
    return new Interface(_abi) as MarketplaceErrorsInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): MarketplaceErrors {
    return new Contract(address, _abi, runner) as unknown as MarketplaceErrors;
  }
}
