import { useWorkFlowEditorContext } from "./WorkflowEditorContext"

export const StateDisplay = () => {
  const [workflowEditorState] = useWorkFlowEditorContext()
  return <pre>{JSON.stringify(workflowEditorState, null, 2)}</pre>
}
