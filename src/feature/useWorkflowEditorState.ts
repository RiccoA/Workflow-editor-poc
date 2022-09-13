import { useState, useCallback } from "react"
import {
  FormComponent,
  WorkflowEditorState,
  ComponentIndex,
  ComponentType,
} from "./workflowEditorState"

export const useWorkflowEditorState = () => {
  const [workflowEditorState, setWorkflowEditorState] =
    useState<WorkflowEditorState>(new WorkflowEditorState())

  const addComponent = useCallback(
    (type: ComponentType, index: ComponentIndex = 0) => {
      const newState = new WorkflowEditorState()
      workflowEditorState.activeForm.components.forEach((component) =>
        newState.activeForm.addComponent(component.schema.type)
      )

      newState.activeForm.addComponent(type)

      setWorkflowEditorState(newState)
    },
    [workflowEditorState.activeForm.components]
  )

  const removeComponent = useCallback(
    (indexToRemoveAt: ComponentIndex) => {
      const newState = new WorkflowEditorState()
      workflowEditorState.activeForm.components.forEach(
        (component, index) =>
          indexToRemoveAt !== index ??
          newState.activeForm.addComponent(component.schema.type)
      )
      setWorkflowEditorState(newState)
    },
    [workflowEditorState.activeForm.components]
  )

  const swapTwoComponents = useCallback(
    (primaryIndex: ComponentIndex, secondaryIndex: ComponentIndex) => {
      const newState = new WorkflowEditorState()
      workflowEditorState.activeForm.components.forEach((component) =>
        newState.activeForm.addComponent(component.schema.type)
      )

      const primaryComponent =
        workflowEditorState.activeForm.getComponent(primaryIndex)
      const secondaryComponent =
        workflowEditorState.activeForm.getComponent(secondaryIndex)

      newState.activeForm.setComponent(primaryIndex, secondaryComponent)
      newState.activeForm.setComponent(secondaryIndex, primaryComponent)

      setWorkflowEditorState(newState)
    },
    [workflowEditorState.activeForm]
  )

  const editComponent = useCallback(
    (indexToEditAt: ComponentIndex, component: FormComponent) => {
      const newState = new WorkflowEditorState()
      workflowEditorState.activeForm.components.forEach((component) =>
        newState.activeForm.addComponent(component.schema.type)
      )
      newState.activeForm.setComponent(indexToEditAt, component)
      setWorkflowEditorState(newState)
    },
    [workflowEditorState.activeForm.components]
  )

  return {
    workflowEditorState,
    addComponent,
    editComponent,
    removeComponent,
    swapTwoComponents,
  }
}
