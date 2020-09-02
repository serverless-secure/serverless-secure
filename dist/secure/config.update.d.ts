import { Project, PropertyAssignment, ObjectLiteralExpression, ObjectLiteralElementLike } from 'ts-morph';
export declare class ConfigUpdate {
    project: Project;
    sourceFile: any;
    addDataProp: ObjectLiteralExpression;
    constructor(source: string);
    setSourceFile(source: string): void;
    getSourceFile(): any;
    getDataProp(): ObjectLiteralExpression;
    getProperties(): ObjectLiteralElementLike[];
    getProperty(prop: string): PropertyAssignment;
    updateProperty(name: string, content: object): void;
    removeProperty(prop: string): void;
}
