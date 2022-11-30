const Data = require('../data/flight');
const DataAirPlane = require('../data/airPlane');
const DataAirCompany = require('../data/airCompany');
const ResponseMessage = require('../helpers/response');

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
            return ResponseMessage(false, "Id required. Example /flight/id/ctx23145", null);
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

const FindByStatus = async (status) => {
    try {
        if (status == null) {
            return ResponseMessage(false, "Status required. Example /flight/status/active", null);
        }

        const condition = {
            flightStatus: status,
            entityStatus: true
        }
        const result = await Data.ReadByCondition(condition);
        return ResponseMessage(true, "Success", result);
    } catch (error) {
        return ResponseMessage(false, "Error", null);
    }
}

const FindBy24HourAgo = async () => {
    try {
        const condition = {
            flightStatus: "ACTIVE",
            startedAt: {
                lte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
            },
            entityStatus: true
        }
        const result = await Data.ReadByCondition(condition);
        return ResponseMessage(true, "Success", result);
    } catch (error) {
        return ResponseMessage(false, "Error", null);
    }
}

const FindByCompanyAndStatus = async (companyName, status) => {
    try {
        if (companyName == null || status == null) {
            return ResponseMessage(false, "Company name and status required. Example /flight/detail/ctx23145/active", null);
        }

        const result = await DataAirCompany.ReadByCondition({ name: companyName });
        if (result) {

            const condition = {
                airCompanyId: result.id,
                flightStatus: status,
                entityStatus: true
            }
            const resultFlight = await Data.ReadByCondition(condition);
            return ResponseMessage(true, "Success", resultFlight);
        } else {
            return ResponseMessage(false, "Company not found", null);
        }
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
            const airCompany = await DataAirCompany.ReadByCondition(condition);
            if (airCompany) {

                let airPlaneFind = await DataAirPlane.ReadByCondition({ id: item.airPlaneId });
                if (airPlaneFind) {
                    const result = await Data.Create(item);
                    if (result) {


                        airPlaneFind[0].numberOfFlights = airPlaneFind[0].numberOfFlights + 1;
                        airPlaneFind[0].flightDistance = airPlaneFind[0].flightDistance + item.distance;
                        var conditions = {
                            numberOfFlights: airPlaneFind[0].numberOfFlights,
                            flightDistance: airPlaneFind[0].flightDistance
                        }
                        const updateResult = await DataAirPlane.Update(item.airPlaneId, conditions);
                        if (updateResult) {
                            return ResponseMessage(true, 'Flight created successfully', result);
                        }
                    }
                    else {
                        return ResponseMessage(false, 'Flight not created', null);
                    }
                }
                else {
                    return ResponseMessage(false, 'Flight not created', null);
                }
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

        const findResult = await Data.ReadByCondition({ id: id });
        if (findResult) {
            if (item.flightStatus.toUpperCase() == "DELAYED") {
                item.delayStartedAt = new Date();

            } else if (item.flightStatus.toUpperCase() == "ACTIVE") {
                item.startedAt = new Date();

            } else if (item.flightStatus.toUpperCase() == "COMPLETED") {
                item.endedAt = new Date();
            }
            else {
                return ResponseMessage(false, "Fligh status is invalid", null);

            }
            const result = await Data.Update(id, item);

            if (result) {
                return ResponseMessage(true, 'Flight updated successfully', result);
            }
            else {
                return ResponseMessage(false, 'Flight not updated', null);
            }
        } else {
            return ResponseMessage(false, 'Flight not found', null);
        }
    } catch (error) {
        return ResponseMessage(false, "Error", null);
    }
}

const Delete = async (item) => {
    try {
     
  
        const result = await Data.Delete(item.id)
        if (result) {
            return ResponseMessage(true, 'Flight deleted successfully', result);
        }
        else {
            return ResponseMessage(false, 'Flight not deleted', null);
        }
    } catch (error) {
        return ResponseMessage(false, "Error", null);
    }
}

module.exports = {
    FindAll,
    FindById,
    FindByStatus,
    FindByCompanyAndStatus,
    FindBy24HourAgo,
    Create,
    Update,
    Delete
}