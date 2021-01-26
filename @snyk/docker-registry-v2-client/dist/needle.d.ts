import { NeedleOptions, NeedleResponse } from "needle";
interface RequestOptions extends NeedleOptions {
    uri: string;
    qs?: {
        [key: string]: string;
    };
}
/**
 * A wrapper function that uses `needle` for making HTTP requests,
 * and returns a response that matches what the response it used to get from `request` library
 * @param options request options
 */
export declare function needleWrapper(options: RequestOptions): Promise<NeedleResponse>;
export declare function parseResponseBody(response: NeedleResponse): any;
export {};
