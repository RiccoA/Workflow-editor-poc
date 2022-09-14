import { useCallback } from "react"
import { useWorkFlowEditorContext } from "./WorkflowEditorContext"
import { useDroppable } from "@dnd-kit/core"
import {
  ComponentIndex,
  FormComponent,
  WorkflowForm,
} from "./workflowEditorState"

export const ActiveFormDisplay = () => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  })
  const style = {
    color: isOver ? "green" : undefined,
  }
  const [workflowEditorState] = useWorkFlowEditorContext()
  const activeForm = workflowEditorState.activeForm
  return (
    <div ref={setNodeRef} style={style}>
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
      <ActiveFormComponent key={index} index={index} component={component} />
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
  const [, , removeComponent, , swapTwoComponents, setSelectedComponent] =
    useWorkFlowEditorContext()

  const removeHandler = useCallback(() => {
    removeComponent(index)
  }, [index, removeComponent])

  const moveUpHandler = useCallback(() => {
    swapTwoComponents(index, index - 1)
  }, [index, swapTwoComponents])

  const moveDownHandler = useCallback(() => {
    swapTwoComponents(index, index + 1)
  }, [index, swapTwoComponents])

  const setSelectedComponentHandler = useCallback(() => {
    setSelectedComponent(index)
  }, [index, setSelectedComponent])

  const type = component.schema.type.toString()
  const isRequired = component.isRequired ? "true" : "false"

  return (
    <div>
      <div>Index: {index} </div>
      <div>Type: {type}</div>
      <div>Is required: {isRequired}</div>

      <button onClick={setSelectedComponentHandler}>Select</button>
      <button onClick={moveUpHandler}>Move Up</button>
      <button onClick={moveDownHandler}>Move Down</button>
      <button onClick={removeHandler}>Remove</button>
    </div>
  )
}
