import { addLogEntry } from "./logEntries";

export let isWebGPUAvailable = "gpu" in navigator;
export let isF16Supported = false;

if (isWebGPUAvailable) {
  try {
    const adapter = await (
      navigator as unknown as {
        gpu: {
          requestAdapter: () => Promise<{
            features: Set<string>;
          }>;
        };
      }
    ).gpu.requestAdapter();
    if (!adapter) {
      throw Error("Couldn't request WebGPU adapter.");
    }
    isWebGPUAvailable = true;
    isF16Supported = adapter.features.has("shader-f16");
  } catch {
    isWebGPUAvailable = false;
  }
}

addLogEntry(
  `WebGPU availability: ${isWebGPUAvailable ? "available" : "unavailable"}`,
);
addLogEntry(`F16 support: ${isF16Supported ? "supported" : "not supported"}`);
