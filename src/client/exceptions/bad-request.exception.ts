import { CSimException } from "./csim.exception";

export class BadRequestException extends CSimException {
    constructor(message: string) {
        super(`Bad Request: ${message}`);
    }
}
