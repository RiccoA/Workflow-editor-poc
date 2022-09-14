import { createContext, ReactElement, useContext } from "react"
import {
  addComponentType,
  editComponentType,
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
      setSelectedComponentType
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
