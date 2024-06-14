const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database")


//Handling Uncaught Exception.
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`)
    console.log(`Shutting Down Server due to Uncaught Exception`)
    process.exit(1);
})


// always call the database connectivity function after the config part because if you do it will not be able to access dotenv process.
// config
dotenv.config({ path: "backend/config/config.env" });


//connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {

    console.log(`server is working on http://localhost:${process.env.PORT}`)
})

//Unhandeled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down Server due to Unhandeled Promise Rejection`);
    server.close(() => {
        process.exit(1);
    })
})