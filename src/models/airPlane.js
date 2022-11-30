const Joi = require('joi');


const Create = Joi.object({
    name: Joi.string().required(),
    factorySerialNumber: Joi.string().required(),
    numberOfFlights: Joi.number().required(),
    flightDistance: Joi.number().required(),
    fuelCapacity: Joi.number().required(),
    type: Joi.string().required(),
    airCompanyId: Joi.string().required().allow(null)
})

const Update = Joi.object({
    id: Joi.string().required(),
    name: Joi.string(),
    factorySerialNumber: Joi.string(),
    numberOfFlights: Joi.number(),
    flightDistance: Joi.number(),
    fuelCapacity: Joi.number(),
    type: Joi.string(),
})

const Moving = Joi.object({
    id: Joi.string().required(),
    airCompanyId: Joi.string().required()
})

const Delete = Joi.object({
    id: Joi.string().required()
})

module.exports = {
    Create,
    Update,
    Moving,
    Delete
}
