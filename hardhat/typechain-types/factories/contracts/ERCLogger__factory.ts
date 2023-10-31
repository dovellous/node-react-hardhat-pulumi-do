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
import type { NonPayableOverrides } from "../../common";
import type { ERCLogger, ERCLoggerInterface } from "../../contracts/ERCLogger";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "getERCMarketplaceLogging",
    outputs: [
      {
        components: [
          {
            internalType: "enum Enums.NFTMarketItemActivityType",
            name: "activityType",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "fromAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "toAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct Structs.NFTMarketItemActivity[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "getERCTokenLogging",
    outputs: [
      {
        components: [
          {
            internalType: "enum Enums.TokenActivityType",
            name: "activityType",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "fromAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "toAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct Structs.TokenActivityItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contract",
        type: "address",
      },
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "enum Enums.NFTMarketItemActivityType",
        name: "_type",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_timestamp",
        type: "uint256",
      },
    ],
    name: "logMarketplaceActivity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contract",
        type: "address",
      },
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "enum Enums.TokenActivityType",
        name: "_type",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_timestamp",
        type: "uint256",
      },
    ],
    name: "logTokenActivity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "enum Enums.NFTMarketItemActivityType",
            name: "activityType",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "fromAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "toAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct Structs.NFTMarketItemActivity",
        name: "_activity",
        type: "tuple",
      },
    ],
    name: "setERCMarketplaceLogging",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "enum Enums.TokenActivityType",
            name: "activityType",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "fromAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "toAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct Structs.TokenActivityItem",
        name: "_activity",
        type: "tuple",
      },
    ],
    name: "setERCTokenLogging",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "tokenIdToNFTMarketItemActivity",
    outputs: [
      {
        internalType: "enum Enums.NFTMarketItemActivityType",
        name: "activityType",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "fromAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "toAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "tokenIdToTokenActivityItem",
    outputs: [
      {
        internalType: "enum Enums.TokenActivityType",
        name: "activityType",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "fromAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "toAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610a62806100206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80636ba709581161005b5780636ba709581461010157806378d0fd78146101215780638d76e25114610144578063e54b39781461015757600080fd5b80632a76c2481461008d5780635408c14c146100b95780635d41a01a146100ce578063609ab04e146100ee575b600080fd5b6100a061009b36600461068d565b61016a565b6040516100b094939291906106ea565b60405180910390f35b6100cc6100c736600461072e565b6101ce565b005b6100e16100dc366004610794565b6102a5565b6040516100b091906107be565b6100cc6100fc36600461086c565b610381565b61011461010f366004610794565b61045e565b6040516100b09190610903565b61013461012f36600461068d565b61052b565b6040516100b0949392919061096d565b6100cc61015236600461098a565b610553565b6100cc6101653660046109d9565b6105a8565b6001602052826000526040600020602052816000526040600020818154811061019257600080fd5b600091825260209091206003909102018054600182015460029092015460ff821695506001600160a01b03610100909204821694509116915084565b336001600160a01b038716146102515760405162461bcd60e51b815260206004820152602e60248201527f4552434c6f6767696e67203a206c6f67546f6b656e4163746976697479203a2060448201527f496e76616c69642063616c6c657200000000000000000000000000000000000060648201526084015b60405180910390fd5b6000604051806080016040528084600c811115610270576102706106c0565b81526001600160a01b03808916602083015287166040820152606001839052905061029c878583610381565b50505050505050565b6001600160a01b03821660009081526001602090815260408083208484528252808320805482518185028101850190935280835260609493849084015b82821015610374576000848152602090206040805160808101909152600384029091018054829060ff16600581111561031d5761031d6106c0565b600581111561032e5761032e6106c0565b815281546001600160a01b0361010090910481166020808401919091526001808501549092166040840152600290930154606090920191909152918352920191016102e2565b5092979650505050505050565b6001600160a01b0383166000908152602081815260408083208584528252822080546001818101835591845291909220835160039092020180548493919291839160ff19169083600c8111156103d9576103d96106c0565b0217905550602082015181547fffffffffffffffffffffff0000000000000000000000000000000000000000ff166101006001600160a01b039283160217825560408301516001830180547fffffffffffffffffffffffff00000000000000000000000000000000000000001691909216179055606090910151600290910155505050565b6001600160a01b0382166000908152602081815260408083208484528252808320805482518185028101850190935280835260609493849084015b82821015610374576000848152602090206040805160808101909152600384029091018054829060ff16600c8111156104d4576104d46106c0565b600c8111156104e5576104e56106c0565b815281546001600160a01b036101009091048116602080840191909152600180850154909216604084015260029093015460609092019190915291835292019101610499565b6000602052826000526040600020602052816000526040600020818154811061019257600080fd5b6001600160a01b0383166000908152600160208181526040808420868552825283208054808401825590845292208351600390930201805484939192839160ff1916908360058111156103d9576103d96106c0565b336001600160a01b038716146106265760405162461bcd60e51b815260206004820152603460248201527f4552434c6f6767696e67203a206c6f674d61726b6574706c616365416374697660448201527f697479203a20496e76616c69642063616c6c65720000000000000000000000006064820152608401610248565b60006040518060800160405280846005811115610645576106456106c0565b81526001600160a01b03808916602083015287166040820152606001839052905061029c878583610553565b80356001600160a01b038116811461068857600080fd5b919050565b6000806000606084860312156106a257600080fd5b6106ab84610671565b95602085013595506040909401359392505050565b634e487b7160e01b600052602160045260246000fd5b600681106106e6576106e66106c0565b9052565b608081016106f882876106d6565b6001600160a01b039485166020830152929093166040840152606090920191909152919050565b8035600d811061068857600080fd5b60008060008060008060c0878903121561074757600080fd5b61075087610671565b955061075e60208801610671565b945061076c60408801610671565b9350606087013592506107816080880161071f565b915060a087013590509295509295509295565b600080604083850312156107a757600080fd5b6107b083610671565b946020939093013593505050565b602080825282518282018190526000919060409081850190868401855b828110156108285781516107f08582516106d6565b808701516001600160a01b039081168689015286820151168686015260609081015190850152608090930192908501906001016107db565b5091979650505050505050565b6040516080810167ffffffffffffffff8111828210171561086657634e487b7160e01b600052604160045260246000fd5b60405290565b600080600083850360c081121561088257600080fd5b61088b85610671565b9350602085013592506080603f19820112156108a657600080fd5b506108af610835565b6108bb6040860161071f565b81526108c960608601610671565b60208201526108da60808601610671565b604082015260a094909401356060850152509093909250565b600d81106106e6576106e66106c0565b602080825282518282018190526000919060409081850190868401855b828110156108285781516109358582516108f3565b808701516001600160a01b03908116868901528682015116868601526060908101519085015260809093019290850190600101610920565b608081016106f882876108f3565b80356006811061068857600080fd5b600080600083850360c08112156109a057600080fd5b6109a985610671565b9350602085013592506080603f19820112156109c457600080fd5b506109cd610835565b6108bb6040860161097b565b60008060008060008060c087890312156109f257600080fd5b6109fb87610671565b9550610a0960208801610671565b9450610a1760408801610671565b9350606087013592506107816080880161097b56fea264697066735822122079fa8e5daa1302d3ef5cc67380ddae3a7a3002654612b5384e8334d93d2e2baa64736f6c63430008140033";

type ERCLoggerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERCLoggerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERCLogger__factory extends ContractFactory {
  constructor(...args: ERCLoggerConstructorParams) {
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
      ERCLogger & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ERCLogger__factory {
    return super.connect(runner) as ERCLogger__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERCLoggerInterface {
    return new Interface(_abi) as ERCLoggerInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): ERCLogger {
    return new Contract(address, _abi, runner) as unknown as ERCLogger;
  }
}
