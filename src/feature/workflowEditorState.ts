export interface WorkflowEditorState {
  activeForm: WorkflowForm
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

export const createFormComponent = (type: ComponentType) => {
  const component: FormComponent = {
    schema: {
      type: type,
    },
    isRequired: false,
  }

  return component
}

export class ComponentLibrary {
  componentTypes: ComponentType[] = []
}
export enum ComponentType {
  Headline,
  InputBox,
}

export type ComponentSchema = {
  type: ComponentType
}

export type ComponentIndex = number
