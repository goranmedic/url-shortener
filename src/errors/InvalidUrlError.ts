import { CustomError } from ".";

class InvalidUrlError extends CustomError {
    constructor(url: string) {
        super(`${url} is not a valid URL!`, 400);
    }
}

export default InvalidUrlError;
export {InvalidUrlError}
