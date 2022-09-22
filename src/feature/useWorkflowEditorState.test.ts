import { renderHook, act } from "@testing-library/react"
import { ComponentType } from "./ComponentType"
import { useWorkflowEditorState } from "./useWorkflowEditorState"
import { cloneFormComponent } from "./workflowEditorState"

const current = (result: any) => {
  const [
    workflowEditorState,
    addComponent,
    removeComponent,
    editComponent,
    swapTwoComponents,
  ] = result.current
  return {
    workflowEditorState,
    addComponent,
    removeComponent,
    editComponent,
    swapTwoComponents,
  }
}

test("should have one component after adding", () => {
  const { result } = renderHook(() => useWorkflowEditorState())
  expect(current(result).workflowEditorState.activeForm.components.length).toBe(
    0
  )
  act(() => {
    current(result).addComponent(ComponentType.Headline)
  })

  expect(current(result).workflowEditorState.activeForm.components.length).toBe(
    1
  )
})
test("should have two components after adding two", () => {
  const { result } = renderHook(() => useWorkflowEditorState())
  expect(current(result).workflowEditorState.activeForm.components.length).toBe(
    0
  )
  act(() => {
    current(result).addComponent(ComponentType.Headline)
  })

  act(() => {
    current(result).addComponent(ComponentType.InputBox)
  })

  expect(current(result).workflowEditorState.activeForm.components.length).toBe(
    2
  )
})

test("should remove component from state", () => {
  const { result } = renderHook(() => useWorkflowEditorState())

  act(() => {
    current(result).addComponent(ComponentType.Headline)
  })

  expect(current(result).workflowEditorState.activeForm.components.length).toBe(
    1
  )

  act(() => {
    current(result).removeComponent(0)
  })

  expect(current(result).workflowEditorState.activeForm.components.length).toBe(
    0
  )
})

test("should edit component at index", () => {
  const { result } = renderHook(() => useWorkflowEditorState())

  act(() => {
    current(result).addComponent(ComponentType.Headline)
  })

  expect(current(result).workflowEditorState.activeForm.components.length).toBe(
    1
  )
  expect(
    current(result).workflowEditorState.activeForm.components[0].isRequired
  ).toBe(false)

  const componentToEdit = cloneFormComponent(
    current(result).workflowEditorState.activeForm.components[0]
  )
  componentToEdit.isRequired = true

  act(() => {
    current(result).editComponent(0, componentToEdit)
  })

  expect(
    current(result).workflowEditorState.activeForm.components[0].isRequired
  ).toBe(true)
})

test("should swap two components", () => {
  const { result } = renderHook(() => useWorkflowEditorState())

  act(() => {
    current(result).addComponent(ComponentType.Headline)
  })

  act(() => {
    current(result).addComponent(ComponentType.InputBox)
  })

  expect(
    current(result).workflowEditorState.activeForm.components[0].schema.type
  ).toBe(ComponentType.Headline)

  act(() => {
    current(result).swapTwoComponents(0, 1)
  })
  expect(
    current(result).workflowEditorState.activeForm.components[1].schema.type
  ).toBe(ComponentType.Headline)
})
