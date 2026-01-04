import express from "express";
import usersControl from "./routes/users.js";
import msssgControl from "./routes/messages.js";

import { initSqlDb, getMysqlConnection } from "./utils/mysql.js";
import { initMongoDb, getMongoDbConnection } from "./utils/mongodb.js";

await initMongoDb();
await initSqlDb();

const app = express();
const PORT = 8000;

app.use(express.json());

app.use(async (req, res, next) => {
  req.mongoDbConn = await getMongoDbConnection();
  req.mysqlDbConn = await getMysqlConnection();
  next();
});
const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: "no headers provided" });
        }
        const encryptedData = authHeader.split(' ')[1];
        if (!encryptedData) {
            return res.status(401).json({ error: "no encrypted data found" });
        }
        // convert to english
        const userAndPass = Buffer.from(encryptedData, 'base64').toString('utf-8');
        // destruction
        const [username, password] = userAndPass.split(':');
        const user = await req.mongoDbConn.collection('users').findOne({ 
            username: username,
            password: password 
        });
        if (!user) {
            return res.status(401).json({ error: "wrong details" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "error in auth" });
    }
};


app.use('/api/auth', usersControl)                   // register
app.use("/api/users", requireAuth, usersControl);    //
app.use("/api/messages", requireAuth, msssgControl);

app.listen(PORT, async () => {
  console.log(`server run on ${PORT}...`);
});