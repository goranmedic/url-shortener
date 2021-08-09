import { CustomError } from ".";

class NotFoundError extends CustomError {
    constructor(item: string) {
        super(`${item} does not exist in our database!`, 404);
    }
}

export default NotFoundError;
export {NotFoundError}
