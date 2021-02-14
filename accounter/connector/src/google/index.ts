import { getById, list } from "./handlers/accounts";
import { oauthCallback, oauth, refresh } from "./handlers/oauth";
import express from "express"

const app = express()

app.get("/oauth", oauth);
app.get("/oauth/handleCallback", oauthCallback);
app.get("/accounts/getById", getById);
app.get("/accounts/list", list);
app.get("/oauth/refresh", refresh)

export default app;
