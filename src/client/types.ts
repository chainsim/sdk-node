export type CSimClientConfig = {
  providerId: string;
  apiKey: string;
};

export type CSimClientConstructor = CSimClientConfig & {
  apiUrl: string;
};

export type RequestTotpAuthorizationParams = {
  phoneNumber: string;
};

export type ValidateTotpAuthorizationParams = RequestTotpAuthorizationParams & {
  code: string;
};

export type Number = {
  number: string;
  contract_address: string;
};

export type User = {
  address: string;
};

export type ValidateTotpAuthorizationResult = {
  number: Number;
  user: User;
};

export type ValidateTotpAuthorizationResponse = {
  success: boolean;
  result: ValidateTotpAuthorizationResult;
};
