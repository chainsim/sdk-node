import axios, { AxiosError, AxiosInstance } from "axios";

import {
  CSimClientConstructor,
  RequestTotpAuthorizationParams,
  ValidateTotpAuthorizationParams,
  ValidateTotpAuthorizationResponse,
  ValidateTotpAuthorizationResult,
} from "./types";
import { ICSimClient } from "./interfaces/csim-client.interface";
import { handleAxiosError } from "./utils";

export class CSimClient implements ICSimClient {
  protected readonly httpClient: AxiosInstance;

  constructor(params: CSimClientConstructor) {
    this.httpClient = axios.create({
      baseURL: params.apiUrl,
      headers: {
        "x-provider-id": params.providerId,
        authorization: `Bearer ${params.apiKey}`,
      },
    });
  }

  public async requestTotpAuthorization(
    params: RequestTotpAuthorizationParams,
  ): Promise<void> {
    try {
      await this.httpClient.post("/request", {
        csim_number: params.phoneNumber,
      });
    } catch (error: unknown) {
      handleAxiosError(error as AxiosError);
    }
  }

  public async validateTotpAuthorization(
    params: ValidateTotpAuthorizationParams,
  ): Promise<ValidateTotpAuthorizationResult> {
    try {
      const response =
        await this.httpClient.post<ValidateTotpAuthorizationResponse>(
          "/validate",
          {
            csim_number: params.phoneNumber,
            totp_code: params.code,
          },
        );

      return response.data.result;
    } catch (error: unknown) {
      handleAxiosError(error as AxiosError);
    }
  }
}
