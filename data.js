const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()



const AirCompany = require('./src/data/airCompany');
const AirPlane = require('./src/data/airPlane');
const Flights = require('./src/data/flight');


async function insertData() {
    const result = await prisma.flight.deleteMany({})
    const result1 = await prisma.airplane.deleteMany({})
    const result2 = await prisma.airCompany.deleteMany({})
    console.log(result, result1, result2)


    var lastData = [
        {
            "airCompany": {
                "name": "Turkish Airlines",
                "companyType": "Passenger",
                "foundedAt": "1933-05-19T22:00:00.000Z"
            },
            "airPlane": [],
            "flight": []
        },
        {
            "airCompany": {
                "name": "Pegasus Airlines",
                "companyType": "Passenger",
                "foundedAt": "1989-05-19T22:00:00.000Z"
            },
            "airPlane": [{
                "name": "Boeing 737-800",
                "factorySerialNumber": "1012",
                "numberOfFlights": 567,
                "flightDistance": 304,
                "fuelCapacity": 31,
                "type": "Passenger"
            }],
            "flight": [
                {
                    "flightStatus": "PENDING",
                    "departureCountry": "Ankara",
                    "destinationCountry": "Istanbul",
                    "distance": 650,
                    "estimatedFlightTime": 1,
                    "createdAt": "2022-11-29T19:44:58.479Z",
                }
            ]
        },
        {
            "airCompany": {
                "name": "THY Cargo",
                "companyType": "Cargo",
                "foundedAt": "1991-05-19T22:00:00.000Z"
            },
            "airPlane": [{

                "name": "Boeing 737-900",
                "factorySerialNumber": "93632",
                "numberOfFlights": 846,
                "flightDistance": 659,
                "fuelCapacity": 91,
                "type": "Passenger"
            }],
            "flight": [{
                "flightStatus": "PENDING",
                "departureCountry": "Istanbul",
                "destinationCountry": "Antalya",
                "distance": 800,
                "estimatedFlightTime": 2,
                "createdAt": "2022-11-29T19:44:58.479Z",
            }]
        },
        {
            "airCompany": {
                "name": "THY Cargo",
                "companyType": "Cargo",
                "foundedAt": "1991-05-19T22:00:00.000Z"
            },
            "airPlane": [{
                "name": "Boeing 737-900ER",
                "factorySerialNumber": "5166",
                "numberOfFlights": 687,
                "flightDistance": 84,
                "fuelCapacity": 78,
                "type": "Passenger"
            },
            {
                "name": "Boeing 737-900ER",
                "factorySerialNumber": "78474",
                "numberOfFlights": 559,
                "flightDistance": 450,
                "fuelCapacity": 97,
                "type": "Passenger"
            }],
            "flight": [{
                "flightStatus": "PENDING",
                "departureCountry": "Ankara",
                "destinationCountry": "Istanbul",
                "distance": 650,
                "estimatedFlightTime": 1,
                "createdAt": "2022-11-29T19:44:58.479Z",
            },
            {
                "flightStatus": "PENDING",
                "departureCountry": "Ankara",
                "destinationCountry": "Istanbul",
                "distance": 650,
                "estimatedFlightTime": 1,
                "createdAt": "2022-11-29T19:44:58.479Z",
            },]
        },
        {
            "airCompany": {
                "name": "DHL Express",
                "companyType": "Cargo",
                "foundedAt": "1969-05-19T22:00:00.000Z"
            },
            "airPlane": [{
                "name": "Boeing 737-900ER",
                "factorySerialNumber": "86278",
                "numberOfFlights": 568,
                "flightDistance": 359,
                "fuelCapacity": 41,
                "type": "Cargo"
            }],
            "flight": [{
                "flightStatus": "PENDING",
                "departureCountry": "Ankara",
                "destinationCountry": "Istanbul",
                "distance": 650,
                "estimatedFlightTime": 1,
                "createdAt": "2022-11-29T19:44:58.479Z",
                "airPlaneId": "clb2mbnxg0003ynnk13ojdspw",
                "airCompanyId": "clb2m3kh20004ynw6z879e7nb"
            }]
        }

    ]

    for (let i = 0; i < lastData.length; i++) {
        const compResult = await AirCompany.Create(lastData[i].airCompany);
        for (let j = 0; j < lastData[i].airPlane.length; j++) {
            lastData[i].airPlane[j].airCompanyId = compResult.id;
            const planeResult = await AirPlane.Create(lastData[i].airPlane[j]);
            for (let k = 0; k < lastData[i].flight.length; k++) {
                lastData[i].flight[k].airPlaneId = planeResult.id;
                lastData[i].flight[k].airCompanyId = compResult.id;
                await Flights.Create(lastData[i].flight[k]);
            }

        }
    }
}

module.exports = {
    insertData
}