import * as types from './types';
export { DepGraphBuilder };
declare class DepGraphBuilder {
    get rootNodeId(): string;
    private static _getPkgId;
    private _pkgs;
    private _pkgNodes;
    private _graph;
    private _pkgManager;
    private _rootNodeId;
    private _rootPkgId;
    constructor(pkgManager: types.PkgManager, rootPkg?: types.PkgInfo);
    addPkgNode(pkgInfo: types.PkgInfo, nodeId: string, nodeInfo?: types.NodeInfo): void;
    connectDep(parentNodeId: string, depNodeId: string): void;
    build(): types.DepGraph;
}
