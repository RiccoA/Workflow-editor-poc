import { ActiveFormDisplay } from "./ActiveFormDisplay"
import { ComponentLibrary } from "./ComponentLibrary"
import { StateDisplay } from "./StateDisplay"
import { useWorkFlowEditorContext } from "./WorkflowEditorContext"
import { cloneFormComponent } from "./workflowEditorState"

export const WorkFlowEditor = () => {
  const [workflowEditorState, , , editComponent] = useWorkFlowEditorContext()

  const editComponentOnClick = () => {
    var component = cloneFormComponent(
      workflowEditorState.activeForm.components[0]
    )
    component.isRequired = true
    editComponent(0, component)
  }

  return (
    <>
      <h1>Workflow Editor </h1>
      <ComponentLibrary />
      <ActiveFormDisplay />
      <StateDisplay />
      <button onClick={editComponentOnClick}>Edit Component</button>
    </>
  )
}
