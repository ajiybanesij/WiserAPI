const ResponseMessage = require('../helpers/response');
const Data = require('../data/airPlane');

const FindAll = async () => {
    try {
        const result = await Data.ReadAll();
        return ResponseMessage(true, "Success", result);
    } catch (error) {
        return ResponseMessage(false, "Error", null);
    }
}

const FindById = async (id) => {
    try {
        if (id == null) {
            return ResponseMessage(false, "Id required. Example /airplane?id=ctx23145", null);
        }

        const condition = {
            id: id,
            entityStatus: true
        }
        const result = await Data.ReadByCondition(condition);
        return ResponseMessage(true, "Success", result);
    } catch (error) {
        return ResponseMessage(false, "Error", null);
    }
}

const Create = async (item) => {
    try {
        if (item.airCompanyId == null) {
            const result = await Data.Create(item);
            return ResponseMessage(true, 'Airplane created successfully', result);
        } else {
            const condition = {
                id: item.airCompanyId,
                entityStatus: true
            }
            const airCompany = await Data.ReadByCondition(condition);
            if (airCompany) {
                const result = await Data.Create(item);
                return ResponseMessage(true, 'Airplane created successfully', result);
            } else {
                return ResponseMessage(false, "Air Company not found", null);
            }
        }
    } catch (error) {
        return ResponseMessage(false, "Error", null);
    }
}

const Update = async (item) => {
    try {
        const id = item.id;
        delete item.id;
        const result = await Data.Update(id, item);
        return ResponseMessage(true, 'Airplane updated successfully', result);
    } catch (error) {
        return ResponseMessage(false, "Error", null);
    }
}

const Moving = async (item) => {
    try {
        const id = item.id;
        const condition = {
            airCompanyId: item.airCompanyId
        }
        const airCompany = await Data.ReadByCondition(condition);
        if (airCompany) {
            const result = await Data.Update(id, item);
            return ResponseMessage(true, 'Airplane moved successfully', result);
        } else {
            return ResponseMessage(false, "Air Company not found", null);
        }
    } catch (error) {
        return ResponseMessage(false, "Error", null);
    }
}


const Delete = async (item) => {
    try {
        const result = await Data.Delete(item.id);
        return ResponseMessage(true, 'Airplane deleted successfully', result);
    } catch (error) {
        return ResponseMessage(false, "Error", null);
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
