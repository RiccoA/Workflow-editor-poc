import { useCallback } from "react"
import { useWorkFlowEditorContext } from "./WorkflowEditorContext"
import { useDraggable } from "@dnd-kit/core"
import { ComponentType } from "./ComponentType"

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
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: type.toString(),
  })
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  const [, addComponent] = useWorkFlowEditorContext()
  const addHandler = useCallback(() => {
    addComponent(type)
  }, [addComponent, type])

  return (
    <div>
      <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
        {name}
      </button>
    </div>
  )
}
