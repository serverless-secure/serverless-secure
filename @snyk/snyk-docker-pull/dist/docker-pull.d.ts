import { DockerPullOptions, DockerPullResult } from "./types";
export declare class DockerPull {
    private static findDockerBinary;
    pull(registryBase: string, repo: string, tag: string, opt?: DockerPullOptions): Promise<DockerPullResult>;
    private getLayers;
    private saveRequests;
    private buildImage;
    private loadImage;
    private createDownloadedImageDestination;
}
