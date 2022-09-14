import { createContext, ReactElement, useContext } from "react"
import {
  addComponentType,
  editComponentType,
  getComponentType,
  removeComponentType,
  setSelectedComponentType,
  swapTwoComponentsType,
  useWorkflowEditorState,
} from "./useWorkflowEditorState"
import { WorkflowEditorState } from "./workflowEditorState"

type MaybeContextType =
  | undefined
  | [
      WorkflowEditorState,
      addComponentType,
      removeComponentType,
      editComponentType,
      swapTwoComponentsType,
      setSelectedComponentType,
      getComponentType
    ]

const Context = createContext<MaybeContextType>(undefined)

export const WorkflowEditorContextProvider = ({
  children,
}: {
  children: ReactElement
}) => {
  const [
    workflowEditorState,
    addComponent,
    removeComponent,
    editComponent,
    swapTwoComponents,
    setSelectedComponent,
    getComponent,
  ] = useWorkflowEditorState()

  return (
    <Context.Provider
      value={[
        workflowEditorState,
        addComponent,
        removeComponent,
        editComponent,
        swapTwoComponents,
        setSelectedComponent,
        getComponent,
      ]}
    >
      {children}
    </Context.Provider>
  )
}

export const useWorkFlowEditorContext = () => {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error(
      "useWorkFlowEditorContext must be used within WorkflowEditorContextProvider"
    )
  }

  return context
}
