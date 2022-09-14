import { ComponentLibrary } from "./ComponentLibrary"
import { useWorkFlowEditorContext } from "./WorkflowEditorContext"
import { cloneFormComponent, ComponentType } from "./workflowEditorState"

export const WorkFlowEditor = () => {
  const [
    workflowEditorState,
    addComponent,
    removeComponent,
    editComponent,
    swapTwoComponents,
  ] = useWorkFlowEditorContext()

  const addOnClick = () => {
    addComponent(ComponentType.Headline)
  }

  const removeOnClick = () => {
    removeComponent(0)
  }

  const editComponentOnClick = () => {
    var component = cloneFormComponent(
      workflowEditorState.activeForm.components[0]
    )
    component.isRequired = true
    editComponent(0, component)
  }

  const swapTwoComponentsOnClick = () => {
    swapTwoComponents(0, 1)
  }

  return (
    <>
      <h1>Workflow Editor </h1>
      <ComponentLibrary />
      <pre>{JSON.stringify(workflowEditorState, null, 2)}</pre>
      <button onClick={removeOnClick}>Remove Component</button>
      <button onClick={editComponentOnClick}>Edit Component</button>
      <button onClick={swapTwoComponentsOnClick}>Swap Components</button>
    </>
  )
}
