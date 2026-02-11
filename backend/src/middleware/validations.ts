import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validation =
  <T>(schema: ZodSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map((issue) => ({
          field: issue.path.join("."), // field name
          message: issue.message, // readable message
        }));

        return res.status(400).json({
          success: false,
          errors: formattedErrors,
        });
      }

      next(error);
    }
  };
