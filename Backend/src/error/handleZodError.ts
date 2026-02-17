import { ZodError, type ZodIssue } from "zod";
import type { TErrorSources, TGenericErrorResponse } from "../lib/types/interface/error";

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    const lastPath = issue.path[issue.path.length - 1];
    return {
      path:
        typeof lastPath === "string" || typeof lastPath === "number"
          ? lastPath
          : "",
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};

export default handleZodError;