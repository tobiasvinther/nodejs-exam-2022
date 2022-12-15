import { Router } from "express"
import db from "../database/connection_sqlite.js"

const router = Router()


//POST - add new application
router.post("/api/applications", async (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const description = req.body.text
    await db.run(`INSERT INTO applications (first_name, last_name, email, description) VALUES (?, ?, ?, ?)`, [firstName, lastName, email, description])
    res.sendStatus(200)
})

router.delete("/api/applications/delete/:id", async (req, res) => {
    const id = req.params.id
    if(!id) {
        res.sendStatus(404)
    }
    await db.run(`DELETE FROM applications WHERE id = (?)`, id)
    res.sendStatus(200)
})

router.patch("/api/applications/update/:id", async (req, res) => {
    const id = req.params.id
    const status = req.body.status
    if(!id) {
        res.sendStatus(404)
    }
    await db.run(`UPDATE applications SET status = (?) WHERE id = (?)`, [status, id])
    res.sendStatus(200)
})


export default router
