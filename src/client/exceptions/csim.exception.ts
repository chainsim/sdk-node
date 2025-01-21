export class CSimException extends Error {
    constructor(message: string) {
        super(message);
        this.name = CSimException.name;
    }
}
