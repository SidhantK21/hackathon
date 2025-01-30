"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const completion_1 = require("../chatcompletion/completion");
const express_1 = __importDefault(require("express"));
const embd_1 = require("../embedding/embd");
const prompt_1 = require("../prompt/prompt");
const milvusServices_1 = require("../services/milvusServices");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const queryrouter = express_1.default.Router();
queryrouter.post("/query", async (req, res) => {
    try {
        const { userInp } = req.body;
        if (!userInp) {
            res.status(400).send("No inputs");
            return;
        }
        const embeddingQuery = await (0, embd_1.gen)(userInp);
        if (!embeddingQuery || !embeddingQuery.data) {
            throw new Error("Failed to generate the embeddings");
        }
        const vectorQuery = embeddingQuery.data[0].embedding;
        await milvusServices_1.client.loadCollection({
            collection_name: milvusServices_1.collectionName,
        });
        const searchMilvus = await milvusServices_1.client.search({
            collection_name: milvusServices_1.collectionName,
            vectors: [vectorQuery],
            topk: 10,
            params: { noprobe: 16 }
        });
        if (!searchMilvus.results || !searchMilvus.results[0]) {
            throw new Error("No results found");
        }
        const vectorIds = searchMilvus.results.map((result) => result.id.toString());
        const chunks = await prisma.fileMetaData.findMany({
            where: {
                vectorId: {
                    in: vectorIds
                }
            },
            include: {
                fileDta: true
            }
        });
        console.log("Query Executed:", {
            where: {
                vectorId: {
                    in: vectorIds
                }
            },
            include: {
                fileDta: true
            }
        });
        const prompt = await (0, prompt_1.createPrompt)(userInp, chunks);
        const summaryOutput = await (0, completion_1.chatCompl)(prompt);
        console.log(summaryOutput);
        if (!chunks || chunks.length === 0) {
            console.log("No chunks found for the given vector IDs");
        }
        res.json({
            results: chunks.map((chunk) => ({
                chunk: chunk.chunk,
                fileId: chunk.fileId,
                vectorId: chunk.vectorId,
                document: chunk.fileDta
            }))
        });
    }
    catch (e) {
        console.log("Error occured", e);
        res.status(500).send("Internal server error");
    }
});
exports.default = queryrouter;
