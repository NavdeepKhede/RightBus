const { createBusTable, deleteBusTable } = require("./busSchema");
const { createBusUserRelationTable, deleteBuseUserRelationTable } = require("./busUserSchema");
const { createReservationSchema, deleteReservationSchema } = require("./reservationSchema");
const { createRoutesTable, deleteRoutesTable } = require("./routeSchema");
const { createUserTable, deleteUserTable } = require("./userSchema")

const intialiseDB = async () => {
    await deleteReservationSchema();
    await deleteBuseUserRelationTable();
    await deleteBusTable();
    await deleteRoutesTable();
    await deleteUserTable();
    await createUserTable();
    await createRoutesTable();
    await createBusTable();
    await createBusUserRelationTable();
    await createReservationSchema();
    console.log("all table inititalised");
}

module.exports = intialiseDB;