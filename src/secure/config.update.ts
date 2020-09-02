
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
    project: Project;
    sourceFile!: any;
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
        } catch (error) {
            console.log(error.message)
        }
    }
    getSourceFile() {
        return this.sourceFile.getSourceFile();
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
    updateProperty(prop: string, content: object) {
        this.removeProperty(prop)
        try {
            this.getDataProp()
            .addPropertyAssignment({
                name: 'layers',
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