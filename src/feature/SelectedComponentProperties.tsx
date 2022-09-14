import { useCallback, useMemo } from "react"
import { useWorkFlowEditorContext } from "./WorkflowEditorContext"
import { cloneFormComponent } from "./workflowEditorState"

export const SelectedComponentProperties = () => {
  const [workflowEditorState, , , editComponent, , , getComponent] =
    useWorkFlowEditorContext()

  const selectedComponent = useMemo(
    () =>
      workflowEditorState.selectedComponent
        ? getComponent(workflowEditorState.selectedComponent)
        : undefined,
    [getComponent, workflowEditorState.selectedComponent]
  )
  const isRequired = selectedComponent?.isRequired ?? false
  const isRequiredString = isRequired ? "true" : "false"

  const isRequiredHandler = useCallback(
    (event: any) => {
      if (!selectedComponent && !workflowEditorState.selectedComponent) return
      const editedComponent = cloneFormComponent(selectedComponent!)
      editedComponent.isRequired = event.target.value === "true"
      editComponent(workflowEditorState.selectedComponent!, editedComponent)
    },
    [editComponent, selectedComponent, workflowEditorState.selectedComponent]
  )

  const hasSelectedComponent = selectedComponent !== undefined

  return (
    <>
      <h2>Component Properties</h2>
      {!hasSelectedComponent && <div>No component selected</div>}

      {hasSelectedComponent && (
        <div>
          <span></span>
          Is required?
          <select value={isRequiredString} onChange={isRequiredHandler}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      )}
    </>
  )
}
