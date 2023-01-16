import { Router } from "express"
import db from "../database/connection_sqlite.js"

const router = Router()

//GET - get a single application
router.get("/api/applications/:id", async (req, res) => {
    const id = req.params.id
    if(!id) {
        res.sendStatus(404)
    }
    const user = await db.get(`SELECT * FROM applications WHERE id = (?)`, id)
    res.send(user)
})

//GET - get all approved applications
router.get("/api/approved", async (req, res) => {

    if(!req.session.isLoggedIn) {
        res.sendStatus(401)
    } else {
        const result = await db.all(`SELECT * FROM applications WHERE status = (?)`, "approved")
        res.send(result)
    }
})

//POST - add new application
router.post("/api/applications", async (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const description = req.body.text
    const amount = req.body.amount
    await db.run(`INSERT INTO applications (first_name, last_name, email, description, amount) VALUES (?, ?, ?, ?, ?)`, [firstName, lastName, email, description, amount])
    res.sendStatus(200)
})

//PATCH - update status of application
router.patch("/api/applications/:id", async (req, res) => {
    const id = req.params.id
    const status = req.body.status
    if(!id) {
        res.sendStatus(404)
    }

    await db.run(`UPDATE applications SET status = (?) WHERE id = (?)`, [status, id])
    res.sendStatus(200)
})

//DELETE - delete application
router.delete("/api/applications/:id", async (req, res) => {
    const id = req.params.id
    if(!id) {
        res.sendStatus(404)
    }
    await db.run(`DELETE FROM applications WHERE id = (?)`, id)
    res.sendStatus(200)
})


export default router
