import router from "./routes/route";
import express,{Response} from "express";
import cors from "cors";
import { initailzeService } from "./services/milvusServices";
import dotenv from "dotenv";
dotenv.config();

const app=express();
const port=process.env.PORT;

initailzeService();

app.use(
    cors({
      origin: "http://localhost:5173",
    })
);

app.use(express.json());

app.use("/services", router);
app.use("/auth",)

app.get("/", (res:Response) => {
    res.send("Working");
});

app.listen(port,()=>{
    console.log(`Server running on http://localhost${port}`);
})