const express = require("express")
const oauth = require("express-oauth2-jwt-bearer")
const extAuthz = require('@build-security/opa-express-middleware')
const app = express()
const bodyParser = require("body-parser")

const adminRouter = express.Router()

const extAuthzMiddleware = extAuthz.authorize((req)=>({
    port: 8181,
    hostname: "http://localhost",
    policyPath: "/admin",
    enable: req.method === "GET"
}))


app.use(oauth2.auth({
    issuerBaseURL: "http://localhost:8089/realms/angelkey-realm",
    issuer: "http://localhost:8089/realms/angelkey-realm",
    jwksUri: "http://localhost:8089/realms/angelkey-realm/protocol/openid-connect/certs",
    audience: "account"
}))

app.use("/api/admin", adminRouter)

adminRouter.use(bodyParser.json)

adminRouter.get("/secret", extAuthz.permissions('admin.read'), extAuthzMiddleware, (req, res)=>{
    res.send({status: 200, message: "you're beautiful"})
})