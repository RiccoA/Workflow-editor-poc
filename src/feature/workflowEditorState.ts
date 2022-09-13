export class WorkflowEditorState {
  activeForm: WorkflowForm = new WorkflowForm()
  componentLibrary: ComponentLibrary = new ComponentLibrary()
}

export class WorkflowForm {
  components: FormComponent[] = []

  addComponent = (type: ComponentType) => {
    this.components.push(new FormComponent(type))
  }
}

export class FormComponent {
  constructor(type: ComponentType) {
    this.schema = new ComponentSchema(type)
  }
  schema: ComponentSchema
  isRequired: boolean = false

  clone = () => {
    const clone = new FormComponent(this.schema.type)
    clone.isRequired = this.isRequired

    return clone
  }
}

export class ComponentLibrary {
  componentTypes: ComponentType[] = []
}
export enum ComponentType {
  Headline,
  InputBox,
}

export class ComponentSchema {
  constructor(type: ComponentType) {
    this.type = type
  }
  type: ComponentType
}

export type ComponentIndex = number
