"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = __importDefault(require("./routes/route"));
const express_1 = __importDefault(require("express"));
const milvusServices_1 = require("./services/milvusServices");
const dotenv_1 = __importDefault(require("dotenv"));
const authroute_1 = __importDefault(require("./auth/authroute"));
dotenv_1.default.config();
const cors = require('cors');
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(cors());
(0, milvusServices_1.initailzeService)();
app.use(express_1.default.json());
app.use("/services", route_1.default);
app.use("/auth", authroute_1.default);
// app.get("/", (res:Response) => {
//     res.send("Working");
// });
app.listen(port, () => {
    console.log(`Server running on http://localhost${port}`);
});
