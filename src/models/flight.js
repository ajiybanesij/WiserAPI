const Joi = require('joi');



const Create = Joi.object().keys({
    departureCountry: Joi.string().required(),
    destinationCountry: Joi.string().required(),
    distance: Joi.number().required(),
    estimatedFlightTime: Joi.number().required(),
    airPlaneId: Joi.string().required(),
    airCompanyId: Joi.string().required()
});

const Update = Joi.object().keys({
    id: Joi.string().required(),
    flightStatus: Joi.string().required()
});


const Delete = Joi.object().keys({
    id: Joi.string().required()
});

module.exports = {
    Create,
    Update,
    Delete
};