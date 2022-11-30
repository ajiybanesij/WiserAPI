const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const ResponseMessage = require('../helpers/response');

const Create = async (item) => {
    try {
        const result = await prisma.flight.create({
            data: {
                departureCountry: item.departureCountry,
                destinationCountry: item.destinationCountry,
                distance: item.distance,
                estimatedFlightTime: item.estimatedFlightTime,
                startedAt: item.startedAt,
                endedAt: item.endedAt,
                createdAt: item.createdAt,
                delayStartedAt: item.delayStartedAt,
                airCompanyId: item.airCompanyId,
                airPlaneId: item.airPlaneId
            }
        })
        return result
    } catch (ex) {
        throw ex
    }
}

const ReadByCondition = async (conditions) => {
    try {
        const result = await prisma.flight.findMany({
            where: conditions,
            include: {
                airCompany: true,
                airPlane: true
            }
        })
        return result
    } catch (ex) {
        throw ex
    }
}

const ReadAll = async () => {
    try {
        const result = await prisma.flight.findMany({
            where: {
                entityStatus: true
            },
        })
        return result
    } catch (ex) {
        throw ex
    }
}

const Update = async (id, item) => {
    try {
        const result = await prisma.flight.update({
            where: {
                id: id
            },
            data: item
        })
        return result
    } catch (ex) {
        throw ex
    }
}

const Delete = async (id) => {
    try {
        const result = await prisma.flight.update({
            where: {
                id: id
            },
            data: {
                entityStatus: false
            }
        })
        return result
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
