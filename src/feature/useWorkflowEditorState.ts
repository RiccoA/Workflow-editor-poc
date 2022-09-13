import { useState, useCallback } from "react"
import { useImmerReducer } from "use-immer"
import {
  FormComponent,
  WorkflowEditorState,
  ComponentIndex,
  ComponentType,
  createFormComponent,
} from "./workflowEditorState"

export const useWorkflowEditorState = () => {
  const init: WorkflowEditorState = {
    activeForm: {
      components: [],
    },
  }
  const [OLDworkflowEditorState, setWorkflowEditorState] =
    useState<WorkflowEditorState>(init)

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
        break
      case "edit":
        break
      default:
        break
    }
  }, init)

  const addComponent = useCallback(
    (type: ComponentType, index: ComponentIndex = 0) => {
      dispatch({ type: "add", payload: { type } })
    },
    [dispatch]
  )

  const removeComponent = useCallback(
    (indexToRemoveAt: ComponentIndex) => {
      dispatch({ type: "remove", payload: { indexToRemoveAt } })
      // const newState = new WorkflowEditorState()
      // OLDworkflowEditorState.activeForm.components.forEach(
      //   (component, index) =>
      //     indexToRemoveAt !== index ??
      //     newState.activeForm.addComponent(component.schema.type)
      // )
      // setWorkflowEditorState(newState)
    },
    [dispatch]
  )

  // const swapTwoComponents = useCallback(
  //   (primaryIndex: ComponentIndex, secondaryIndex: ComponentIndex) => {
  //     const newState = new WorkflowEditorState()
  //     OLDworkflowEditorState.activeForm.components.forEach((component) =>
  //       newState.activeForm.addComponent(component.schema.type)
  //     )

  //     const primaryComponent =
  //       OLDworkflowEditorState.activeForm.getComponent(primaryIndex)
  //     const secondaryComponent =
  //       OLDworkflowEditorState.activeForm.getComponent(secondaryIndex)

  //     newState.activeForm.setComponent(primaryIndex, secondaryComponent)
  //     newState.activeForm.setComponent(secondaryIndex, primaryComponent)

  //     setWorkflowEditorState(newState)
  //   },
  //   [OLDworkflowEditorState.activeForm]
  // )

  // const editComponent = useCallback(
  //   (indexToEditAt: ComponentIndex, component: FormComponent) => {
  //     const newState = new WorkflowEditorState()
  //     OLDworkflowEditorState.activeForm.components.forEach((component) =>
  //       newState.activeForm.addComponent(component.schema.type)
  //     )
  //     newState.activeForm.setComponent(indexToEditAt, component)
  //     setWorkflowEditorState(newState)
  //   },
  //   [OLDworkflowEditorState.activeForm.components]
  // )

  return {
    workflowEditorState,
    addComponent,
    removeComponent,
  }
}
