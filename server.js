import express from "express";
import usersControl from "./routes/orders.js";
import msssgControl from "./routes/products.js";

import { initSqlDb, getMysqlConnection } from "./utils/mysql.js";
import { initMongoDb, getMongoDbConnection } from "./utils/mongodb.js";

await initMongoDb();
await initSqlDb();

const app = express();
const PORT = 8000;

app.use(express.json());

app.use('/api/auth/', async (req, res, next) => {
  console.log(`${req.method}`);
  req.mongoDbConn = await getMongoDbConnection();
  req.mysqlDbConn = await getMysqlConnection();
  next();
});

app.use("/api/users", usersControl);
app.use("/api/messages", msssgControl);

app.listen(PORT, async () => {
  console.log(`server run on ${PORT}...`);
});
