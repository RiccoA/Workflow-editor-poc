import { ActiveFormDisplay } from "./ActiveFormDisplay"
import { ComponentLibrary } from "./ComponentLibrary"
import { StateDisplay } from "./StateDisplay"
import { useWorkFlowEditorContext } from "./WorkflowEditorContext"
import { cloneFormComponent } from "./workflowEditorState"

export const WorkFlowEditor = () => {
  const [workflowEditorState, , , editComponent, swapTwoComponents] =
    useWorkFlowEditorContext()

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
      <ActiveFormDisplay />
      <StateDisplay />
      <button onClick={editComponentOnClick}>Edit Component</button>
      <button onClick={swapTwoComponentsOnClick}>Swap Components</button>
    </>
  )
}
