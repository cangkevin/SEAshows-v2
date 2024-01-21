// NOTE - https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#a-minimal-compiler
// NOTE - https://learning-notes.mistermicheels.com/javascript/typescript/compiler-api/
// NOTE - https://stackoverflow.com/questions/68989401/typescript-compiler-api-problem-with-ts-transformerfactory-replacing-nodes
// NOTE - https://writer.sh/posts/gentle-introduction-to-typescript-compiler-api/
import ts, { JsxEmit } from 'typescript'

const transformerFactory: ts.TransformerFactory<ts.SourceFile> = (context) => {
  const visitor: ts.Visitor = (node: ts.Node): ts.Node => {
    if (ts.isCallExpression(node)) {
      if (
        node.expression &&
        node.expression.getText().startsWith('test') &&
        node.expression.getText() !== 'test.step'
      ) {
        return ts.factory.createVoidZero() // remove occurrences of @playwright/test's 'test' object
      }
    }

    return ts.visitEachChild(node, visitor, context)
  }

  return (sourceFile) => ts.visitEachChild(sourceFile, visitor, context)
}

function compile(fileNames: string[], options: ts.CompilerOptions): void {
  const program = ts.createProgram(fileNames, options)
  const emitResult = program.emit(undefined, undefined, undefined, undefined, {
    before: [transformerFactory],
  })

  const allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics)

  allDiagnostics.forEach((diagnostic) => {
    if (diagnostic.file) {
      const { line, character } = ts.getLineAndCharacterOfPosition(
        diagnostic.file,
        diagnostic.start!,
      )
      const message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        '\n',
      )
      console.log(
        `${diagnostic.file.fileName} (${line + 1},${
          character + 1
        }): ${message}`,
      )
    } else {
      console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'))
    }
  })

  const exitCode = emitResult.emitSkipped ? 1 : 0
  console.log(`Process exiting with code '${exitCode}'.`)
  process.exit(exitCode)
}

compile(process.argv.slice(2), {
  noEmitOnError: true,
  noImplicitAny: false,
  noEmit: true,
  target: ts.ScriptTarget.ESNext,
  module: ts.ModuleKind.CommonJS,
  allowSyntheticDefaultImports: true,
  sourceMap: true,
  outDir: 'build',
  skipLibCheck: true,
  strict: false,
  checkJs: true,
  paths: {
    ['~/*']: ['./src/*'],
  },
  jsx: JsxEmit.Preserve,
})
