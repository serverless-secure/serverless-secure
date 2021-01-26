import { DockerOptions } from "../docker";
import { ArchiveResult, DockerInspectOutput, ImageDetails } from "./types";
export { detect, getImageArchive, extractImageDetails, pullIfNotLocal };
declare function detect(targetImage: string, options?: DockerOptions): Promise<DockerInspectOutput>;
/**
 * In the case that an `ImageType.Identifier` is detected we need to produce
 * an image archive, either by saving the image if it's already loaded into
 * the local docker daemon, or by pulling the image from a remote registry and
 * saving it to the filesystem directly.
 *
 * Users may also provide us with a URL to an image in a Docker compatible
 * remote registry.
 *
 * @param {string} targetImage - The image to test, this could be in one of
 *    the following forms:
 *      * [registry/]<repo>/<image>[:tag]
 *      * <repo>/<image>[:tag]
 *      * <image>[:tag]
 *    In the case that a registry is not provided, the plugin will default
 *    this to Docker Hub. If a tag is not provided this will default to
 *    `latest`.
 * @param {string} [username] - Optional username for private repo auth.
 * @param {string} [password] - Optional password for private repo auth.
 * @param {string} [platform] - Optional platform parameter to pull specific image arch.
 */
declare function getImageArchive(targetImage: string, imageSavePath: string, username?: string, password?: string, platform?: string): Promise<ArchiveResult>;
declare function extractImageDetails(targetImage: string): Promise<ImageDetails>;
declare function pullIfNotLocal(targetImage: string, options?: DockerOptions): Promise<void>;
