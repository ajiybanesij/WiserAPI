const express = require('express');
const morgan = require('morgan');

const Data = require('./data')
const AirPlaneRouter = require('./src/routes/airPlane');
const AirCompanyRouter = require('./src/routes/airCompany');
const FlightRouter = require('./src/routes/flight');


Data.insertData()

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// AirPlaneRouter
app.use('/airplane', AirPlaneRouter);

// AirCompanyRouter
app.use('/aircompany', AirCompanyRouter);

// FlightRouter
app.use('/flight', FlightRouter);

// Health Check
app.get("/status", async function (req, res) {
    return res.status(200).send({
        status: true,
        message: "running",
        data: null
    });
})

// Server
let PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Listening on: ${PORT}`));
