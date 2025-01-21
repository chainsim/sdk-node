import { MAINNET_API_URL } from "../constants";
import { CSimClient } from "./csim.client";
import { CSimClientConfig } from "./types";

export * from "./csim.client";
export * from "./interfaces/csim-client.interface";
export * from "./types";

export function create({ apiKey, providerId }: CSimClientConfig): CSimClient {
  return new CSimClient({
    apiUrl: MAINNET_API_URL,
    apiKey,
    providerId,
  });
}

export default {
  create,
};
