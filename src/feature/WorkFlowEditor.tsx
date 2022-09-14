import { ActiveFormDisplay } from "./ActiveFormDisplay"
import { ComponentLibrary } from "./ComponentLibrary"
import { SelectedComponentProperties } from "./SelectedComponentProperties"
import { StateDisplay } from "./StateDisplay"
import { DndContext } from "@dnd-kit/core"
import { useCallback } from "react"
import { useWorkFlowEditorContext } from "./WorkflowEditorContext"

export const WorkFlowEditor = () => {
  const [, addComponent] = useWorkFlowEditorContext()

  // const addHandler = useCallback(() => {
  //   addComponent(type)
  // }, [addComponent, type])

  const dragEndHandler = useCallback(
    (event: any) => {
      if (event.over && event.over.id === "droppable") {
        const type = event.active.id
        addComponent(type)
        //console.log(event)
      }
    },
    [addComponent]
  )
  return (
    <>
      <DndContext onDragEnd={dragEndHandler}>
        <h1>Workflow Editor </h1>
        <ComponentLibrary />
        <ActiveFormDisplay />
        <SelectedComponentProperties />
        <StateDisplay />
      </DndContext>
    </>
  )
}
