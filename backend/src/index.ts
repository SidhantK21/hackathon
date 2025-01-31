import router from "./routes/route";
import express,{Response} from "express";
import { initailzeService } from "./services/milvusServices";
import dotenv from "dotenv";
import authRouter from "./auth/authroute";
dotenv.config();

const cors = require('cors');
const app=express();
const port=process.env.PORT;
app.use(cors());

initailzeService();


app.use(express.json());

app.use("/services", router);
app.use("/auth",authRouter);

// app.get("/", (res:Response) => {
//     res.send("Working");
// });

app.listen(port,()=>{
    console.log(`Server running on http://localhost${port}`);
})