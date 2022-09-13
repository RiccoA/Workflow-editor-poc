import { KeyObject } from "crypto"

export interface WorkflowEditorState {
  activeForm: WorkflowForm
  //componentLibrary: ComponentLibrary
  // activeForm: WorkflowForm = new WorkflowForm()
  // componentLibrary: ComponentLibrary = new ComponentLibrary()
}

export interface WorkflowForm {
  //components: FormComponent[] = []
  components: FormComponent[]

  // addComponent = (type: ComponentType) => {
  //   this.components.push(new FormComponent(type))
  // }

  // getComponent = (index: ComponentIndex) => {
  //   return this.components[index].clone()
  // }

  // setComponent = (index: ComponentIndex, value: FormComponent) => {
  //   this.components[index] = value
  // }
}

export interface FormComponent {
  // constructor(type: ComponentType) {
  //   this.schema = new ComponentSchema(type)
  // }

  schema: ComponentSchema
  //isRequired: boolean = false
  isRequired: boolean

  // clone = () => {
  //   const clone = new FormComponent(this.schema.type)
  //   clone.isRequired = this.isRequired

  //   return clone
  // }
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

export class FormComponentFactory {}
export class ComponentLibrary {
  componentTypes: ComponentType[] = []
}
export enum ComponentType {
  Headline,
  InputBox,
}

export interface ComponentSchema {
  // constructor(type: ComponentType) {
  //   this.type = type
  // }

  type: ComponentType
}

export type ComponentIndex = number
