import { useCallback } from "react"
import { useImmerReducer } from "use-immer"
import {
  FormComponent,
  ComponentIndex,
  ComponentType,
  createFormComponent,
  cloneFormComponent,
  createWorkflowEditorState,
} from "./workflowEditorState"

export const useWorkflowEditorState = () => {
  const [workflowEditorState, dispatch] = useImmerReducer((draft, action) => {
    switch (action.type) {
      case "add":
        draft.activeForm.components.push(
          createFormComponent(action.payload.type)
        )
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
      default:
        break
    }
  }, createWorkflowEditorState())

  const addComponent = useCallback(
    (type: ComponentType, index: ComponentIndex = 0) => {
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

  const swapTwoComponents = useCallback(
    (primaryIndex: ComponentIndex, secondaryIndex: ComponentIndex) => {
      dispatch({ type: "swapTwo", payload: { primaryIndex, secondaryIndex } })
    },
    [dispatch]
  )

  const editComponent = useCallback(
    (indexToEditAt: ComponentIndex, component: FormComponent) => {
      dispatch({ type: "edit", payload: { indexToEditAt, component } })
    },
    [dispatch]
  )

  return {
    workflowEditorState,
    addComponent,
    removeComponent,
    editComponent,
    swapTwoComponents,
  }
}
