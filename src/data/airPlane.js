const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const ResponseMessage = require('../helpers/response');

const Create = async (item) => {
    try {
        const result = await prisma.airplane.create({
            data: {
                name: item.name,
                factorySerialNumber: item.factorySerialNumber,
                numberOfFlights: item.numberOfFlights,
                flightDistance: item.flightDistance,
                fuelCapacity: item.fuelCapacity,
                type: item.type,
                createdAt: item.createdAt,

                airCompanyId: item.airCompanyId
            }
        })
        return result;
    } catch (ex) {
        throw ex
    }
}
const ReadByCondition = async (condition) => {
    try {
        const result = await prisma.airplane.findMany({
            where: condition,
            include: {
                airCompany: true
            }
        })
        return result;
    } catch (ex) {
        throw ex
    }
}

const ReadAll = async () => {
    try {
        const result = await prisma.airplane.findMany({
            where: {
                entityStatus: true
            },
        })
        return result;
    } catch (ex) {
        throw ex
    }
}

const Update = async (id, item) => {
    try {
        const result = await prisma.airplane.update({
            where: {
                id: id
            },
            data: item
        })
        return result;
    } catch (ex) {
        throw ex
    }
}

const Delete = async (id) => {
    try {
        const result = await prisma.airplane.update({
            where: {
                id: id
            },
            data: {
                entityStatus: false
            }
        })
        return result;
    } catch (ex) {
        throw ex
    }
}


module.exports = {
    Create,
    ReadByCondition,
    ReadAll,
    Update,
    Delete
}