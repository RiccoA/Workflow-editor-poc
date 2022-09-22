var _a = require("path"), dirname = _a.dirname, resolve = _a.resolve;
var Project = require("ts-morph").Project;
var _b = require("typescript-json-schema"), getProgramFromFiles = _b.getProgramFromFiles, generateSchema = _b.generateSchema;
// get enum values
// get properties for each component
// save to a json file ComponentSchemas.
var generate = function () {
    if (!require)
        return;
    if (!require.main)
        return;
    var appDir = dirname(require.main.filename);
    console.log("App dir", appDir);
    var filePath = "C:\\Users\\RiccoAmezcua\\code\\sideprojects\\workflow-editor-poc\\src\\feature\\generateScript\\InputType.ts";
    // get current input type enum
    var project = new Project();
    var sourceFile = project.addSourceFileAtPath(filePath);
    var members = sourceFile.getEnum("InputType").getMembers();
    var structures = [];
    for (var index = 0; index < members.length; index++) {
        var member = members[index];
        var structure = member.getStructure();
        structures.push({
            name: structure.name,
            type: structure.initializer
        });
    }
    // for each value in the enum, get the props file based on the enum name
    var base = "C:\\Users\\RiccoAmezcua\\code\\sideprojects\\workflow-editor-poc\\src\\feature\\generateScript\\";
    var files = [];
    for (var index = 0; index < structures.length; index++) {
        var structure = structures[index];
        files.push(resolve(base, structure.name + "Props.ts"));
    }
    var program = getProgramFromFiles(files);
    // get the schemas for each of the prop types
    var schemas = [];
    for (var index = 0; index < structures.length; index++) {
        var structure = structures[index];
        var schema = generateSchema(program, structure.name + "Props");
        schemas.push({
            name: structure.name,
            type: structure.type,
            properties: Object.keys(schema.properties)
        });
    }
    console.dir(schemas);
    console.dir({ componentSchemas: schemas });
};
generate();
