import { ExportComponentType } from "./ExportComponentType"

export interface WorkflowEditorState {
  activeForm: WorkflowForm
  selectedComponent: MaybeComponentIndex
  //componentLibrary: ComponentLibrary
}

export type WorkflowForm = {
  components: FormComponent[]
}

export const createWorkflowEditorState = () => {
  const state: WorkflowEditorState = {
    activeForm: {
      components: [],
    },
    selectedComponent: undefined,
  }

  return state
}

export type FormComponent = {
  schema: ComponentSchema
  isRequired: boolean
}

export const cloneFormComponent = (component: FormComponent) => {
  const clone: FormComponent = {
    schema: {
      type: component.schema.type,
    },
    isRequired: component.isRequired,
  }
  return clone
}

export const createFormComponent = (type: ExportComponentType) => {
  const component: FormComponent = {
    schema: {
      type: type,
    },
    isRequired: false,
  }

  return component
}

export class ComponentLibrary {
  componentTypes: ExportComponentType[] = []
}

export type ComponentSchema = {
  type: ExportComponentType
}

export type ComponentIndex = number
export type MaybeComponentIndex = ComponentIndex | undefined
