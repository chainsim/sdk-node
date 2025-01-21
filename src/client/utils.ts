import { AxiosError } from "axios";
import { BadRequestException } from "./exceptions/bad-request.exception";
import { UnauthorizedException } from "./exceptions/unauthorized.exception";
import { CSimException } from "./exceptions/csim.exception";

export function handleAxiosError(error: AxiosError): never {
  if (error.response) {
    if (error.response.status === 403) {
      throw new UnauthorizedException();
    }

    if (error.response.status === 400) {
      throw new BadRequestException(
        typeof error.response.data === "object"
          ? JSON.stringify(error.response.data)
          : (error.response.data as string),
      );
    }
    throw new CSimException(
      typeof error.response.data === "object"
        ? JSON.stringify(error.response.data)
        : (error.response.data as string),
    );
  }

  throw new CSimException(error.message as string);
}
