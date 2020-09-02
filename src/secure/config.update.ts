
import {
    Project,
    QuoteKind,
    IndentationText,
    PropertyAssignment,
    ObjectLiteralExpression,
    ObjectLiteralElementLike
} from 'ts-morph';
import * as _ from 'lodash';
import * as path from 'path';
import stringifyObject from 'stringify-object';

export class ConfigUpdate {
    sourceFile!: any;
    project: Project;
    configElement!: Object;
    addDataProp!: ObjectLiteralExpression;
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
            this.project.addSourceFilesAtPaths(path.join(process.cwd(), 'serverless.ts'));
            this.sourceFile = this.project.createSourceFile('/file.ts', source);
            this.addDataProp = this.sourceFile
                .getVariableDeclarationOrThrow('serverlessConfiguration')
                .getInitializerOrThrow() as ObjectLiteralExpression;
            this.configElement = this.sourceFile
                .getVariableDeclarationOrThrow('serverlessConfiguration')
                .getInitializerOrThrow() as Object;
                
        } catch (error) {
            console.log(error.message)
        }
    }
    getSourceFile() {
        return this.sourceFile.getSourceFile();
    }
    getConfigElement(){
        return this.configElement;
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