const Models = require('../models/airPlane');
const Business = require('../business/airPlane');
const ResponseMessage = require('../helpers/response');


const FindAll = async (req, res) => {
    try {
        let statusCode = 200
        const result = await Business.FindAll();
        res.status(statusCode).send(ResponseMessage(result.status, result.message, result.data));
    } catch (error) {
        let statusCode = 500
        res.status(statusCode).send(ResponseMessage(false, "Error", nill));
    }
}

const FindById = async (req, res) => {
    try {
        let statusCode = 200
        const result = await Business.FindById(req.params.id);

        if (!result.status) {
            statusCode = 400
        }
        res.status(statusCode).send(ResponseMessage(result.status, result.message, result.data));
    } catch (error) {
        let statusCode = 500
        res.status(statusCode).send(ResponseMessage(false, "Error", nill));
    }
}

const Create = async (req, res) => {
    try {
        let statusCode = 201

        const { error, value } = Models.Create.validate(req.body);
        if (error) {
            statusCode = 400
            res.status(statusCode).send(ResponseMessage(false, error.message, null));
        }
        const result = await Business.Create(value);

        if (!result.status) {
            statusCode = 400
        }

        res.status(statusCode).send(ResponseMessage(result.status, result.message, result.data));

    } catch (error) {
        let statusCode = 500
        res.status(statusCode).send(ResponseMessage(false, error.message, null));
    }
}

const Update = async (req, res) => {
    try {
        let statusCode = 200

        const { error, value } = Models.Update.validate(req.body);
        if (error) {
            statusCode = 400
            res.status(statusCode).send(ResponseMessage(false, error.message, null));
        }
        const result = await Business.Update(value);
        if (!result.status) {
            statusCode = 400
        }
        res.status(statusCode).send(ResponseMessage(result.status, result.message, result.data));
    } catch (error) {
        let statusCode = 500
        res.status(statusCode).send(ResponseMessage(false, "Error", nill));
    }
}

const Moving = async (req, res) => {
    try {
        let statusCode = 200
        const { error, value } = Models.Moving.validate(req.body);
        if (error) {
            statusCode = 400
            res.status(statusCode).send(ResponseMessage(false, error.message, null));
        }

        const result = await Business.Moving(value);
        if (!result.status) {
            statusCode = 400
        }
        res.status(statusCode).send(ResponseMessage(result.status, result.message, result.data));
    } catch (error) {
        let statusCode = 500
        res.status(statusCode).send(ResponseMessage(false, "Error", nill));
    }
}

const Delete = async (req, res) => {
    try {
        let statusCode = 200

        const { error, value } = Models.Delete.validate(req.body);
        if (error) {
            res.status(400).send(ResponseMessage(false, error.message, null));
        }
        const result = await Business.Delete(value);
        if (!result.status) {
            statusCode = 400
        }
        res.status(statusCode).send(ResponseMessage(result.status, result.message, result.data));
    } catch (error) {
        let statusCode = 500
        res.status(statusCode).send(ResponseMessage(false, error.message, null));
    }
}

module.exports = {
    FindAll,
    FindById,
    Create,
    Update,
    Moving,
    Delete
}
