import { RequestTotpAuthorizationParams, ValidateTotpAuthorizationParams, ValidateTotpAuthorizationResult } from "../types";

export interface ICSimClient {
    requestTotpAuthorization(params: RequestTotpAuthorizationParams): Promise<void>;
    validateTotpAuthorization(params: ValidateTotpAuthorizationParams): Promise<ValidateTotpAuthorizationResult>;
}
