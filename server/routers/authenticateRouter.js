import { Router } from "express"
import db from "../database/connection_sqlite.js"

const router = Router()

//check if user is logged in, then send applications
router.get("/api/authenticate", async (req, res) => {

    if(!req.session.isLoggedIn) {
        res.sendStatus(401)
    } else {
        const result = await db.all("SELECT * FROM applications;")
        res.send(result)
    }
})

//check if user is logged in
router.get("/api/authenticate1", async (req, res) => {

    if(!req.session.isLoggedIn) {
        res.sendStatus(401)
    } else {
        res.sendStatus(200)
    }
})

export default router