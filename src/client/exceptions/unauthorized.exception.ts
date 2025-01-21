import { CSimException } from "./csim.exception";

export class UnauthorizedException extends CSimException {
    constructor() {
        super('Unauthorized. Invalid Api Key or Provider Id');
    }
}
