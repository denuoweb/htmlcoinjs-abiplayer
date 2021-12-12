import { inject, observer } from "mobx-react"
import { IABIMethod, IDeployedContractInfo } from "htmlcoinjs"
import * as React from "react"

import { Store } from "../Store"
import { MethodForm } from "./MethodForm"
import { ContractMethodHeader } from "./partials/ContractMethodHeader"

const css = require("./ContractItem.css")

export const ContractItem = observer((props: {
  contract: IDeployedContractInfo,
  store: Store,
}) => {
  const {
    store,
  } = props

  const {
    name,
    deployName,
    address,
    abi,
  } = props.contract

  const methods = abi.filter((method) => method.name !== "" && method.type !== "event")

  const noMethod = methods.length === 0

  const MethodForm_: any = MethodForm

  return (
    <div className="box content">
      <ContractMethodHeader contract={props.contract}/>

      <p>
        {noMethod && "Contract has no method"}

        {
          methods.map((method) => {
            const {
              name: methodName,
              constant,
            } = method

            const buttonType = constant ? "is-light" : "is-link"

            return (
              <button key={methodName} className={`button ${buttonType} ${css.methodButton}`}
                onClick={() => {
                  store.showModal(() => {
                    return (
                      <MethodForm_ contract={props.contract} method={method} />
                    )
                  })
                }}>
                {methodName}
              </button>
            )
          })
        }
      </p>
    </div>
  )
})
