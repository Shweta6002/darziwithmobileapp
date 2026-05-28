function validate(schema) {
    return (req, _res, next) => {
        const sources = ["body", "params", "query"];
        for (const source of sources) {
            const validator = schema[source];
            if (!validator)
                continue;
            const { value, error } = validator.validate(req[source], {
                abortEarly: false,
                stripUnknown: true,
            });
            if (error)
                return next(error);
            req[source] = value;
        }
        return next();
    };
}
module.exports = {
  validate
};
