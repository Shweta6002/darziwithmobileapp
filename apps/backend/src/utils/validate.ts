import type { NextFunction, Request, Response } from "express";
import type Joi from "joi";

export function validate(schema: {
  body?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
}) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const sources = ["body", "params", "query"] as const;
    for (const source of sources) {
      const validator = schema[source];
      if (!validator) continue;
      const { value, error } = validator.validate(req[source], {
        abortEarly: false,
        stripUnknown: true,
      });
      if (error) return next(error);
      req[source] = value;
    }
    return next();
  };
}
