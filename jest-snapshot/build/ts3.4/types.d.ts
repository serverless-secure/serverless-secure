/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MatcherState } from 'expect';
import SnapshotState from './State';
export declare type Context = MatcherState & {
    snapshotState: SnapshotState;
};
export declare type MatchSnapshotConfig = {
    context: Context;
    hint?: string;
    inlineSnapshot?: string;
    isInline: boolean;
    matcherName: string;
    properties?: object;
    received: any;
};
export declare type SnapshotData = Record<string, string>;
