import { Response } from "express";

// Define the shape of the data object
interface ResponseData<T = any> {
    statusCode: number;
    success: boolean;
    message: string;
    data?: T;
}

// Generic function to send a response
const sendResponse = <T = any>(res: Response, data: ResponseData<T>): void => {
    res.status(data?.statusCode).json({
        success: data.success,
        message: data.message,
        data: data.data,
    });
};

export default sendResponse;
