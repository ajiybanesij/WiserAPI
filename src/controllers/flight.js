const Model = require('../models/flight');
const Business = require('../business/flight');
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

const FindByStatus = async (req, res) => {
    try {
        let statusCode = 200
        const result = await Business.FindByStatus(req.params.status);

        if (!result.status) {
            statusCode = 400
        }
        res.status(statusCode).send(ResponseMessage(result.status, result.message, result.data));
    } catch (error) {
        let statusCode = 500
        res.status(statusCode).send(ResponseMessage(false, "Error", nill));
    }
}

const FindActive = async (req, res) => {
    try {
        let statusCode = 200
        const result = await Business.FindBy24HourAgo();

        if (!result.status) {
            statusCode = 400
        }
        res.status(statusCode).send(ResponseMessage(result.status, result.message, result.data));
    } catch (error) {
        let statusCode = 500
        res.status(statusCode).send(ResponseMessage(false, "Error", nill));
    }
}

const FindByCompanyAndStatus = async (req, res) => {
    try {
        let statusCode = 200
        const result = await Business.FindByCompanyAndStatus(req.params.companyName, req.params.status);

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

        const { error, value } = Model.Create.validate(req.body);
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

        const { error, value } = Model.Update.validate(req.body);
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
        res.status(statusCode).send(ResponseMessage(false, error.message, null));
    }
}

const Delete = async (req, res) => {
    try {
        let statusCode = 200

        const { error, value } = Model.Delete.validate(req.body);
        if (error) {
            statusCode = 400
            res.status(statusCode).send(ResponseMessage(false, error.message, null));
        }
        const result = await Business.Delete(value);
        
        res.status(statusCode).send(ResponseMessage(result.status, result.message, result.data));
    } catch (error) {
        let statusCode = 500
        res.status(statusCode).send(ResponseMessage(false, error.message, null));
    }
}

module.exports = {
    FindAll,
    FindById,
    FindByStatus,
    FindActive, 
    FindByCompanyAndStatus,
    Create,
    Update,
    Delete
}
