import type { Request, Response, NextFunction } from "express";
import { CustomError } from ".";

const errorHandler = (error: Error, request?: Request, response?: Response, next?: NextFunction) => {
    let statusCode = 500;

    if (error instanceof CustomError) {
        statusCode = error.statusCode;
    }

    if (request && response) {
        response.status(statusCode).json({ error: { ...error, statusCode } });
    }
};

export default errorHandler;
export { errorHandler };
