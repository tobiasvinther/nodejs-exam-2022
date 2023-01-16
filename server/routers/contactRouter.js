import { Router } from "express"
import { sendMail } from "../services/emailSender.js"

const router = Router()

router.post("/api/contact", async (req, res) => {
    let sender = req.body.email
    let textBody = req.body.text
    let name = req.body.name
    sendMail(sender, textBody, name)
        .then(result => {
            console.log("RESULT", result)
            res.send({Link: result})
        })
        .catch(console.error) 
})

export default router