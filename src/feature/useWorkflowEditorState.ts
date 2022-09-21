import { useCallback } from "react"
import { useImmerReducer } from "use-immer"
import { ExportComponentType } from "./ExportComponentType"
import {
  FormComponent,
  ComponentIndex,
  createFormComponent,
  cloneFormComponent,
  createWorkflowEditorState,
  WorkflowEditorState,
} from "./workflowEditorState"

export type addComponentType = (
  type: ExportComponentType,
  index?: number
) => void
export type removeComponentType = (indexToRemoveAt: ComponentIndex) => void
export type editComponentType = (
  indexToEditAt: ComponentIndex,
  component: FormComponent
) => void
export type swapTwoComponentsType = (
  primaryIndex: ComponentIndex,
  secondaryIndex: ComponentIndex
) => void

export type setSelectedComponentType = (
  selectedComponent: ComponentIndex
) => void

export type getComponentType = (index: ComponentIndex) => FormComponent

export type useWorkflowEditorStateType = () => [
  WorkflowEditorState,
  addComponentType,
  removeComponentType,
  editComponentType,
  swapTwoComponentsType,
  setSelectedComponentType,
  getComponentType
]

export const useWorkflowEditorState: useWorkflowEditorStateType = () => {
  const [workflowEditorState, dispatch] = useImmerReducer(
    reducer,
    createWorkflowEditorState()
  )

  const addComponent = useCallback(
    (type: ExportComponentType, index: ComponentIndex = 0) => {
      dispatch({ type: "add", payload: { type } })
    },
    [dispatch]
  )

  const removeComponent = useCallback(
    (indexToRemoveAt: ComponentIndex) => {
      dispatch({ type: "remove", payload: { indexToRemoveAt } })
    },

    [dispatch]
  )
  const editComponent = useCallback(
    (indexToEditAt: ComponentIndex, component: FormComponent) => {
      dispatch({ type: "edit", payload: { indexToEditAt, component } })
    },
    [dispatch]
  )

  const swapTwoComponents = useCallback(
    (primaryIndex: ComponentIndex, secondaryIndex: ComponentIndex) => {
      dispatch({ type: "swapTwo", payload: { primaryIndex, secondaryIndex } })
    },
    [dispatch]
  )

  const setSelectedComponent = useCallback(
    (selectedComponent: ComponentIndex) => {
      dispatch({ type: "setSelectedComponent", payload: { selectedComponent } })
    },
    [dispatch]
  )

  const getComponent = useCallback(
    (index: ComponentIndex) => {
      return workflowEditorState.activeForm.components[index]
    },
    [workflowEditorState]
  )

  return [
    workflowEditorState,
    addComponent,
    removeComponent,
    editComponent,
    swapTwoComponents,
    setSelectedComponent,
    getComponent,
  ]
}
const reducer = (draft: WorkflowEditorState, action: any) => {
  switch (action.type) {
    case "add":
      draft.activeForm.components.push(createFormComponent(action.payload.type))
      break
    case "remove":
      draft.activeForm.components.splice(action.payload.indexToRemoveAt, 1)
      break
    case "swapTwo":
      const primaryComponent = cloneFormComponent(
        draft.activeForm.components[action.payload.primaryIndex]
      )
      const secondaryComponent = cloneFormComponent(
        draft.activeForm.components[action.payload.secondaryIndex]
      )

      draft.activeForm.components[action.payload.primaryIndex] =
        secondaryComponent
      draft.activeForm.components[action.payload.secondaryIndex] =
        primaryComponent

      break
    case "edit":
      draft.activeForm.components[action.payload.indexToEditAt] =
        action.payload.component
      break
    case "setSelectedComponent":
      draft.selectedComponent = action.payload.selectedComponent
      break
    default:
      break
  }
}