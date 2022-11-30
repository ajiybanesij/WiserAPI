const ResponseMessage = require('../helpers/response');
const Data = require('../data/airCompany');

const FindAll = async () => {
    try {
        const result = await Data.ReadAll();
        return ResponseMessage(true, "success", result);
    } catch (ex) {
        return ResponseMessage(false, "Error", null);
    }
}

const FindById = async (id) => {
    try {
        const result = await Data.ReadByCondition({ id: id });
        return ResponseMessage(true, "success", result);
    } catch (ex) {
        return ResponseMessage(false, "Error", null);
    }
}

const Create = async (item) => {
    try {
        const result = await Data.Create(item);
        return ResponseMessage(true, "success", result);
    } catch (ex) {
        return ResponseMessage(false, "Error", null);

    }
}

const Update = async (item) => {
    try {
        const id = item.id;
        delete item.id;
        const result = await Data.Update(id, item);
        return ResponseMessage(true, "success", result);
    } catch (ex) {
        return ResponseMessage(false, "Error", null);
    }
}

const Delete = async (item) => {
    try {
        const result = await Data.Update(item.id, { entityStatus: false });
        return ResponseMessage(true, "success", result);
    } catch (ex) {
        return ResponseMessage(false, "Error", null);
    }
}

module.exports = {
    FindAll,
    FindById,
    Create,
    Update,
    Delete
}
