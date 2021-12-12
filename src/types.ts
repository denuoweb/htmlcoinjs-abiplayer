import { IDeployedContractInfo } from "htmlcoinjs"

export interface IContractsInventory {
  contracts: { [key: string]: IDeployedContractInfo }
}
