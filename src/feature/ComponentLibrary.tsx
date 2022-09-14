import { useCallback } from "react"
import { useWorkFlowEditorContext } from "./WorkflowEditorContext"
import { ComponentType } from "./workflowEditorState"

export const ComponentLibrary = () => {
  return (
    <>
      <h2>Component Library</h2>
      <ComponentOption type={ComponentType.Headline} name={"Head line"} />
      <ComponentOption type={ComponentType.InputBox} name={"Input box"} />
    </>
  )
}

type ComponentOptionProps = {
  type: ComponentType
  name: string
}

const ComponentOption = ({ type, name }: ComponentOptionProps) => {
  const [, addComponent] = useWorkFlowEditorContext()

  const addHandler = useCallback(() => {
    addComponent(type)
  }, [addComponent, type])
  return (
    <div>
      <button onClick={addHandler}>{name}</button>
    </div>
  )
}
