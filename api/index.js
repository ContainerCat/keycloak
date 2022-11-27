const express = require("express")
const oauth = require("express-oauth2-jwt-bearer")
const {loadPolicy} = require("@open-policy-agent/opa-wasm")

const app = express()

const adminRouter = express.Router()

app.use(oauth2.auth({
    issuerBaseURL: "http://localhost:8089/realms/angelkey-realm",
    issuer: "http://localhost:8089/realms/angelkey-realm",
    jwksUri: "http://localhost:8089/realms/angelkey-realm/protocol/openid-connect/certs",
    audience: "account"
}))

app.use("/api/admin", adminRouter)

adminRouter.use(async(req,res, next)=>{
    //use opa
})

adminRouter.get("/secret", (req, res)=>{
    res.send({status: 200, message: "you're beautiful"})
})