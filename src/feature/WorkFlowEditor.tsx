import { ActiveFormDisplay } from "./ActiveFormDisplay"
import { ComponentLibrary } from "./ComponentLibrary"
import { SelectedComponentProperties } from "./SelectedComponentProperties"
import { StateDisplay } from "./StateDisplay"
import { useWorkFlowEditorContext } from "./WorkflowEditorContext"
export const WorkFlowEditor = () => {
  return (
    <>
      <h1>Workflow Editor </h1>
      <ComponentLibrary />
      <ActiveFormDisplay />
      <SelectedComponentProperties />
      <StateDisplay />
    </>
  )
}
