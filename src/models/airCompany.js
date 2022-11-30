const Joi = require('joi');



const Create = Joi.object().keys({
    name: Joi.string().required(),
    companyType: Joi.string().required(),
    foundedAt: Joi.date().required()
});

const Update = Joi.object().keys({
    id: Joi.string().required(),
    name: Joi.string(),
    companyType: Joi.string(),
    foundedAt: Joi.date()
});

const Delete = Joi.object({
    id: Joi.string().required()
})

module.exports = {
    Create,
    Update,
    Delete
}
