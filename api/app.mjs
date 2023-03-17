import express from "express";
import cors from "cors"
import morgan from "morgan";


const app = express()

// middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.disable('x-powerd-by') // less hackers know about our stack

const port = 8080


// HTTP GET Request
app.get("/", (req, res) => {
    res.status(201).json("Home GET Request")
})


// Start server
app.listen(port, () => {console.log(`Server Running on port: http://localhost:${port}`);})