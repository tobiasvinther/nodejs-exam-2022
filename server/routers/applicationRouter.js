import { Router } from "express"
import db from "../database/connection_sqlite.js"

const router = Router()

//POST - add new application
router.post("/api/applications", async (req, res) => {
    const firstName = req.firstName
    const lastName = req.lastName
    const email = req.email
    const description = req.text
    await db.run(`INSERT INTO applications (first_name, last_name, email, description) VALUES (?, ?, ?, ?)`, [firstName, lastName, email, description])
    res.sendStatus(200)
})

export default router
