import { Project, PropertyAssignment, ObjectLiteralExpression, ObjectLiteralElementLike } from 'ts-morph';
export declare class ConfigUpdate {
    sourceFile: any;
    project: Project;
    configElement: Object;
    addDataProp: ObjectLiteralExpression;
    constructor(source: string);
    setSourceFile(source: string): void;
    getSourceFile(): any;
    getConfigElement(): Object;
    getDataProp(): ObjectLiteralExpression;
    getProperties(): ObjectLiteralElementLike[];
    getProperty(prop: string): PropertyAssignment;
    updateProperty(name: string, content: object): void;
    removeProperty(prop: string): void;
}
