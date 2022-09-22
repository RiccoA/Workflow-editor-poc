const { dirname, resolve } = require("path")
const { Project } = require("ts-morph")
const {
  getProgramFromFiles,
  generateSchema,
} = require("typescript-json-schema")

// get enum values

// get properties for each component

// save to a json file ComponentSchemas.

const generate = () => {
  if (!require) return
  if (!require.main) return

  const appDir = dirname(require.main.filename)
  console.log("App dir", appDir)

  const filePath =
    "C:\\Users\\RiccoAmezcua\\code\\sideprojects\\workflow-editor-poc\\src\\feature\\generateScript\\InputType.ts"

  // get current input type enum
  const project = new Project()
  const sourceFile = project.addSourceFileAtPath(filePath)
  const members = sourceFile.getEnum("InputType").getMembers()

  const structures: any[] = []
  for (let index = 0; index < members.length; index++) {
    const member = members[index]
    const structure = member.getStructure()
    structures.push({
      name: structure.name,
      type: structure.initializer,
    })
  }

  // for each value in the enum, get the props file based on the enum name
  const base = `C:\\Users\\RiccoAmezcua\\code\\sideprojects\\workflow-editor-poc\\src\\feature\\generateScript\\`
  const files: string[] = []
  for (let index = 0; index < structures.length; index++) {
    const structure = structures[index]
    files.push(resolve(base, structure.name + "Props.ts"))
  }

  const program = getProgramFromFiles(files)

  // get the schemas for each of the prop types
  const schemas: any[] = []
  for (let index = 0; index < structures.length; index++) {
    const structure = structures[index]
    const schema = generateSchema(program, structure.name + "Props")

    schemas.push({
      name: structure.name,
      type: structure.type,
      properties: Object.keys(schema.properties),
    })
  }

  console.dir(schemas)
  console.dir({ componentSchemas: schemas })
}

generate()
