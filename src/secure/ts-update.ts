
import {
    Project,
    QuoteKind,
    IndentationText,
    PropertyAssignment,
    ObjectLiteralExpression,
    ObjectLiteralElementLike
} from 'ts-morph';
import * as _ from 'lodash';
import stringifyObject from 'stringify-object';
import requireFromString from 'require-from-string';

export class TSConfigUpdate {
    private sourceFile!: any;
    private project: Project;
    public configElement!: any;
    private addDataProp!: ObjectLiteralExpression;
    constructor(source: string) {
        this.project = new Project({
            useInMemoryFileSystem: true, // this example doesn't use the real file system
            manipulationSettings: {
                quoteKind: QuoteKind.Single,
                indentationText: IndentationText.TwoSpaces,
            },
            compilerOptions: {
                lib: ['es2017'],
                allowSyntheticDefaultImports: true,
                esModuleInterop: true,
                sourceMap: false,
                allowJs: true,
                removeComments: false
            }
        });
        this.setSourceFile(source)
    }
    setSourceFile(source: string): void {
        try {
            // this.project.addSourceFilesAtPaths(path.join(process.cwd(), 'serverless.ts'));
            this.sourceFile = this.project.createSourceFile('/file.ts', source);
            this.addDataProp = this.sourceFile
                .getVariableDeclarationOrThrow('serverlessConfiguration')
                .getInitializerOrThrow() as ObjectLiteralExpression;
            this.configElement = this.sourceFile
                .getVariableDeclarationOrThrow('serverlessConfiguration')
                .getInitializerOrThrow() as ObjectLiteralElementLike;

        } catch (error) {
            console.log(error.message)
        }
    }
    getSourceFile() {
        return this.sourceFile.getSourceFile();
    }
    getConfigElement() {
        return requireFromString('const secure = ' +
            this.addDataProp.getText() +
            '\n module.exports = secure;')
    }
    getDataProp() {
        return this.addDataProp;
    }
    getProperties(): ObjectLiteralElementLike[] {
        return this.addDataProp.getProperties();
    }
    getProperty(prop: string): PropertyAssignment {
        try {
            return (this.addDataProp.getPropertyOrThrow(prop) as PropertyAssignment);
        } catch (error) {
            console.log(error.message);
            return ({} as PropertyAssignment);
        }
    }
    updateProperty(name: string, content: object) {
        this.removeProperty(name)
        try {
            this.getDataProp()
                .addPropertyAssignment({
                    name,
                    initializer: stringifyObject(content)
                })
        } catch (error) {
            console.log(error.message);
        }
    }
    removeProperty(prop: string): void {
        try {
            this.getProperty(prop).remove();
        } catch (error) {
            console.log(error.message);
        }
    }
}