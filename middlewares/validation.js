const Joi = require('@hapi/joi');

const schemes = {
    createBook: Joi.object().keys({
        uuid: Joi.string().uuid().required(),
        name: Joi.string().required(),
        releaseDate: Joi.date().timestamp("unix").required(),
        authorName: Joi.string().required()
    }),
    updateBook: Joi.object().keys({
        name: Joi.string().optional(),
        releaseDate: Joi.date().timestamp("unix").optional(),
        authorName: Joi.string().optional()
    }),
}

function makeValidator(schem) {
    return async (req, res, next) => {
        const { body } = req;
        const { error } = schem.validate(body);

        if (!error) {
            next();
            return
        }

        res.status(400).json({ error: error.details[0].message });
    }
}

Object
    .keys(schemes)
    .forEach(key => module.exports[key] = makeValidator(schemes[key]));