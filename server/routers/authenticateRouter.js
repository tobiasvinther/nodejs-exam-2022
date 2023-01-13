import { Router } from "express"
import db from "../database/connection_sqlite.js"

const router = Router()

router.get("/api/authenticate", async (req, res) => {

    if(!req.session.isLoggedIn) {
        //console.log("You are NOT allowed")
        res.sendStatus(401)
    } else {
    
        const result = await db.all("SELECT * FROM applications;")
        //console.log(result)
        //res.send({text: result.creation_date + " " + result.first_name + " " + result.last_name})
        //res.send({applications: result})
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