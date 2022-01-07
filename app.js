import express, { urlencoded } from "express"
import 'dotenv/config'
import authRouter from './routes/auth'
import authenticationMiddleWare from "./middleware/authenticationMiddleWare"
import jobsRouter from './routes/jobs'
import connect from "./db/connect"
import { HttpException } from "./exception"
import errorHandlerMiddleWare from "./middleware/errorHandlerMiddleWare"
import notFoundMiddleware from "./middleware/notFoundMiddleware"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import xssClean from "xss-clean"
import cors from "cors"


const app = express()
const PORT = process.env.PORT || 3000

// App Config
app.use(urlencoded({ extended: true }))
app.use(express.static('./public'))
app.use(express.json())

app.get("/", (req, res) => {
    req.send("Testing done")
})
// Security
app.set('trust proxy', 1)
app.use(rateLimit({
    windowMs: 15 * 60 * 100, // 15 miniute
    max: 100
}))

app.use(helmet())
app.use(cors())
app.use(xssClean())

// Routes
app.use(process.env.BASE_SLUG, authRouter)
app.use(`${process.env.BASE_SLUG}/job`, authenticationMiddleWare, jobsRouter)
app.use(errorHandlerMiddleWare)
app.use(notFoundMiddleware)



const start = async () => {
    try {
        await connect(process.env.MONGO_URI)
        app.listen(PORT, () => console.log(`Server is running in port no : ${PORT}`))
    } catch (error) {
        console.error(error);
    }
}
start()
