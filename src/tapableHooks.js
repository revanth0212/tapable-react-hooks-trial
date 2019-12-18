import { SyncHook, SyncWaterfallHook } from "tapable";

export const logCount = new SyncHook(["count"]);

export const manipulateCount = new SyncWaterfallHook(["count"]);
