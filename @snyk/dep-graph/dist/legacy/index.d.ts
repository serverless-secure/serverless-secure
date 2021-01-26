import * as types from '../core/types';
export { depTreeToGraph, graphToDepTree, DepTree };
interface DepTreeDep {
    name?: string;
    version?: string;
    versionProvenance?: types.VersionProvenance;
    dependencies?: {
        [depName: string]: DepTreeDep;
    };
    labels?: {
        [key: string]: string | undefined;
        scope?: 'dev' | 'prod';
        pruned?: 'cyclic' | 'true';
    };
}
interface DepTree extends DepTreeDep {
    type?: string;
    packageFormatVersion?: string;
    targetOS?: {
        name: string;
        version: string;
    };
}
declare function depTreeToGraph(depTree: DepTree, pkgManagerName: string): Promise<types.DepGraph>;
export interface GraphToTreeOptions {
    deduplicateWithinTopLevelDeps: boolean;
}
declare function graphToDepTree(depGraphInterface: types.DepGraph, pkgType: string, opts?: GraphToTreeOptions): Promise<DepTree>;
