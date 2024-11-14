import express from 'express'
import "dotenv/config"
import cors from "cors"
import loginControllers from './controllers/loginControllers.js'
import registerControllers from './controllers/registerControllers.js'
import taskControllers from './controllers/taskControllers.js'

const app = express()
const port = process.env.PORT
app.use(cors())
app.use(express.json())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/login", loginControllers)
app.use("/register", registerControllers)
app.use("/tareas", taskControllers)
