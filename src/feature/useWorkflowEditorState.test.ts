import { renderHook, act } from "@testing-library/react"
import { useWorkflowEditorState } from "./useWorkflowEditorState"
import { ComponentType } from "./workflowEditorState"

test("should have one component after adding", () => {
  const { result } = renderHook(() => useWorkflowEditorState())
  expect(result.current.workflowEditorState.activeForm.components.length).toBe(0)
  act(() => {
    result.current.addComponent(ComponentType.Headline)
  })

  expect(result.current.workflowEditorState.activeForm.components.length).toBe(1)
})
test("should have two components after adding two", () => {
  const { result } = renderHook(() => useWorkflowEditorState())
  expect(result.current.workflowEditorState.activeForm.components.length).toBe(
    0
  )
  act(() => {
    result.current.addComponent(ComponentType.Headline)
  })

  act(() => {
    result.current.addComponent(ComponentType.InputBox)
  })

  expect(result.current.workflowEditorState.activeForm.components.length).toBe(
    2
  )
})

test("should remove component from state", () => {
  const { result } = renderHook(() => useWorkflowEditorState())

  act(() => {
    result.current.addComponent(ComponentType.Headline)
  })

  expect(result.current.workflowEditorState.activeForm.components.length).toBe(
    1
  )

  act(() => {
    result.current.removeComponent(0)
  })

  expect(result.current.workflowEditorState.activeForm.components.length).toBe(
    0
  )
})

// test("should edit component at index", () => {
//   const { result } = renderHook(() => useWorkflowEditorState())

//   act(() => {
//     result.current.addComponent(ComponentType.Headline)
//   })

//   expect(result.current.workflowEditorState.activeForm.components.length).toBe(
//     1
//   )

//   const componentToEdit =
//     result.current.workflowEditorState.activeForm.components[0]
//   componentToEdit.isRequired = true

//   act(() => {
//     result.current.editComponent(1, componentToEdit)
//   })

//   expect(
//     result.current.workflowEditorState.activeForm.components[1].isRequired
//   ).toBe(true)
// })

// test("should swap two components", () => {
//   const { result } = renderHook(() => useWorkflowEditorState())

//   act(() => {
//     result.current.addComponent(ComponentType.Headline)
//   })

//   act(() => {
//     result.current.addComponent(ComponentType.InputBox)
//   })

//   expect(
//     result.current.workflowEditorState.activeForm.components[0].schema.type
//   ).toBe(ComponentType.Headline)

//   act(() => {
//     result.current.swapTwoComponents(0, 1)
//   })
//   expect(
//     result.current.workflowEditorState.activeForm.components[1].schema.type
//   ).toBe(ComponentType.Headline)
// })
