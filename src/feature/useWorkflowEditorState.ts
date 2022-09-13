import { useState, useCallback } from "react"
import {
  FormComponent,
  WorkflowEditorState,
  ComponentIndex,
  ComponentType,
} from "./WorkflowEditorState"

export const useWorkflowEditorState = () => {
  const [workflowEditorState, setWorkflowEditorState] =
    useState<WorkflowEditorState>(new WorkflowEditorState())

  const addComponent = useCallback(
    (type: ComponentType, index: ComponentIndex = 0) => {
      const newState = new WorkflowEditorState()
      workflowEditorState.activeForm.components.forEach((component) =>
        newState.activeForm.addComponent(component.schema.type)
      )

      newState.activeForm.components.push(new FormComponent(type))
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
    (
      primaryComponentIndex: ComponentIndex,
      secondaryComponentIndex: ComponentIndex
    ) => {
      const newState = new WorkflowEditorState()
      workflowEditorState.activeForm.components.forEach((component) =>
        newState.activeForm.addComponent(component.schema.type)
      )

      const primaryComponent =
        workflowEditorState.activeForm.components[primaryComponentIndex].clone()
      const secondaryComponent =
        workflowEditorState.activeForm.components[
          secondaryComponentIndex
        ].clone()

      newState.activeForm.components[primaryComponentIndex] = secondaryComponent
      newState.activeForm.components[secondaryComponentIndex] = primaryComponent

      setWorkflowEditorState(newState)
    },
    [workflowEditorState.activeForm.components]
  )

  const editComponent = useCallback(
    (indexToEditAt: ComponentIndex, component: FormComponent) => {
      const newState = new WorkflowEditorState()
      workflowEditorState.activeForm.components.forEach((component) =>
        newState.activeForm.addComponent(component.schema.type)
      )
      newState.activeForm.components[indexToEditAt] = component
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
