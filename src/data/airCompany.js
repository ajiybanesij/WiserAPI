const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const ResponseMessage = require('../helpers/response');

const Create = async (item) => {
    try {
        const result = await prisma.airCompany.create({
            data: {
                name: item.name,
                companyType: item.companyType,
                foundedAt: item.foundedAt
            }
        })
        return result
    } catch (ex) {
        throw ex
    }
}

const ReadByCondition = async (conditions) => {
    try {
        const result = await prisma.airCompany.findFirst({
            where: conditions,
            include: {
                Flights: true,
                Airplanes: true
            }
        })
        return result
    } catch (ex) {
        throw ex
    }
}

const ReadAll = async () => {
    try {
        const result = await prisma.airCompany.findMany(
            {
                where: {
                    entityStatus: true
                },
                include: {
                    Flights: true,
                    Airplanes: true
                }
            }
        )
        return result
    } catch (ex) {
        throw ex
    }
}

const Update = async (id, item) => {
    try {
        const result = await prisma.airCompany.update({
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
        const result = await prisma.airCompany.update({
            where: {
                id: id
            },

            data: {
                entityStatus: false,
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