import express from "express";
import cors from "cors"
import morgan from "morgan";
import connect from "./DB/Connect.mjs";
import router from "./router/route.mjs";

const app = express()

//* middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.disable('x-powerd-by')  //? less hackers know about our stack

const port = 8080


//* HTTP GET Request
app.get("/", (req, res) => {
    res.status(201).json("Home GET Request")
})


//* api routes
app.use("/api", router)



//* Start server only when we have valid connection
connect().then(() => {
    try {
        //* Start server
        app.listen(port, () => { console.log(`Server Running on port: http://localhost:${port}`); })
    } catch (error) {
        console.log('Connot connect to the server');
    }
}).catch(err => {
    console.log(err + "Invalid database connection...");
})

