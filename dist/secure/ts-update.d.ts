import { PropertyAssignment, ObjectLiteralExpression, ObjectLiteralElementLike } from 'ts-morph';
export declare class TSConfigUpdate {
    private sourceFile;
    private project;
    configElement: any;
    private addDataProp;
    constructor(source: string);
    setSourceFile(source: string): void;
    getSourceFile(): any;
    getConfigElement(): any;
    getDataProp(): ObjectLiteralExpression;
    getProperties(): ObjectLiteralElementLike[];
    getProperty(prop: string): PropertyAssignment;
    updateProperty(name: string, content: object): void;
    removeProperty(prop: string): void;
}
