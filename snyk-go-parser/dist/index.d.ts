import { parseGoPkgConfig, parseGoVendorConfig } from './parser';
import { parseGoMod, toSnykVersion, parseVersion } from './gomod-parser';
import { DepTree, GoPackageManagerType, GoProjectConfig, ModuleVersion, GoMod } from './types';
export { GoPackageManagerType };
export { parseGoPkgConfig, parseGoVendorConfig, GoProjectConfig, ModuleVersion, toSnykVersion, parseVersion, GoMod, parseGoMod, };
export declare function buildGoPkgDepTree(manifestFileContents: string, lockFileContents: string, options?: unknown): Promise<DepTree>;
export declare function buildGoVendorDepTree(manifestFileContents: string, options?: unknown): Promise<DepTree>;
