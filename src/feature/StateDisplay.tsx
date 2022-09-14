import { useWorkFlowEditorContext } from "./WorkflowEditorContext"

export const StateDisplay = () => {
  const [workflowEditorState] = useWorkFlowEditorContext()
  return (
    <>
      <h2>State Display</h2>
      <pre>{JSON.stringify(workflowEditorState, null, 2)}</pre>
    </>
  )
}
