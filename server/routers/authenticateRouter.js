import { Router } from "express"
import db from "../database/connection_sqlite.js"

const router = Router()

router.get("/api/authenticate", async (req, res) => {

    if(!req.session.isLoggedIn) {
        console.log("You are NOT allowed")
        res.sendStatus(401)
    } else {
        console.log("You are allowed")
        //res.sendStatus(200)
        /*
        res.send({text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`})
        */
        const result = await db.all("SELECT * FROM applications;")
        console.log(result)
        //res.send({text: result.creation_date + " " + result.first_name + " " + result.last_name})
        //res.send({applications: result})
        res.send(result)
    }
})

export default router