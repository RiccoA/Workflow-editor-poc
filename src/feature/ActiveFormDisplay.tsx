import { useCallback } from "react"
import { useWorkFlowEditorContext } from "./WorkflowEditorContext"
import {
  ComponentIndex,
  FormComponent,
  WorkflowForm,
} from "./workflowEditorState"

export const ActiveFormDisplay = () => {
  const [workflowEditorState] = useWorkFlowEditorContext()
  const activeForm = workflowEditorState.activeForm
  return (
    <div>
      <h2>Active Form</h2>
      <ActiveFormComponentList activeForm={activeForm} />
    </div>
  )
}

type ActiveFormComponentListProps = {
  activeForm: WorkflowForm
}
export const ActiveFormComponentList = ({
  activeForm,
}: ActiveFormComponentListProps) => (
  <>
    {activeForm.components.map((component, index) => (
      <ActiveFormComponent index={index} component={component} />
    ))}
  </>
)

type ActiveFormComponentProps = {
  index: ComponentIndex
  component: FormComponent
}
const ActiveFormComponent = ({
  index,
  component,
}: ActiveFormComponentProps) => {
  const [, , removeComponent, , swapTwoComponents] = useWorkFlowEditorContext()

  const removeHandler = useCallback(() => {
    removeComponent(index)
  }, [index, removeComponent])

  const moveUpHandler = useCallback(() => {
    swapTwoComponents(index, index - 1)
  }, [index, swapTwoComponents])

  const moveDownHandler = useCallback(() => {
    swapTwoComponents(index, index + 1)
  }, [index, swapTwoComponents])

  const name = component.schema.type
  const isRequired = component.isRequired ? "true" : "false"

  return (
    <div>
      <div>{name}</div>
      <div>Is required: {isRequired}</div>

      <button onClick={moveUpHandler}>Move Up</button>
      <button onClick={moveDownHandler}>Move Down</button>
      <button onClick={removeHandler}>Remove</button>
    </div>
  )
}
