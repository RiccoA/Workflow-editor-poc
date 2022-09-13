import "./App.css"
import { WorkFlowEditor } from "./feature/WorkFlowEditor"
import { WorkflowEditorContextProvider } from "./feature/WorkflowEditorContext"

const App = () => (
  <>
    <WorkflowEditorContextProvider>
      <WorkFlowEditor />
    </WorkflowEditorContextProvider>
  </>
)

export default App
