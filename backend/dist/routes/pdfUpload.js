"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const embd_1 = require("../embedding/embd");
const milvusServices_1 = require("../services/milvusServices");
const client_1 = require("@prisma/client");
const milvus2_sdk_node_1 = require("@zilliz/milvus2-sdk-node");
const chunk_1 = require("../chunking/chunk");
const whisper_1 = require("../whisperservice/whisper");
// const upload = multer({ 
//   dest: 'uploads/',
//   fileFilter: (req, file, cb) => {
//       if (file.mimetype.startsWith('audio/')) {
//           cb(null, true);
//       } else {
//           cb(new Error('Only audio files are allowed'));
//       }
//   }
// });
const prisma = new client_1.PrismaClient();
const pdfrouter = express_1.default.Router();
pdfrouter.post("/pdfUp", async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ message: "No file uploaded" });
        }
        const inputaudio = req.body;
        console.log(inputaudio);
        const path = req.file ? req.file.path : req.body.path;
        console.log(path);
        if (!path) {
            throw new Error("Path of the file is not there");
        }
        console.log("Genrating script");
        const transcript = await (0, whisper_1.transcriptGen)(path);
        console.log("done with the script");
        console.log(transcript);
        if (!transcript) {
            res.json({
                message: "Transcript not generated"
            });
            return;
        }
        const spiltArr = transcript.split("\n");
        const textArray = spiltArr.filter(line => typeof line === 'string' && line.trim().length > 0);
        console.log(textArray);
        const maxChunkSize = 400;
        const overlap = 100;
        const textChunks = (0, chunk_1.chunk)({ textArray, maxChunkSize, overlap });
        let checkGen = false;
        // const del= await client.deleteEntities({
        //   collection_name: collectionName,
        //   expr: "id > 0" // Matches all entities since ID is always positive
        // });
        // console.log(del);
        // // 3. Flush changes to persist deletion
        // // await client.flush({ collection_names:collectionName });
        // // 4. Release collection from memory
        // await client.releaseCollection({
        //   collection_name: collectionName
        // });
        const embeddingResponse = await (0, embd_1.gen)(textChunks);
        if (!embeddingResponse || !embeddingResponse.data) {
            throw new Error("Failed to generate the embeddings");
        }
        checkGen = true;
        if (embeddingResponse && embeddingResponse.data) {
            const fieldsData = embeddingResponse.data.map((item) => ({
                vector_field: item.embedding,
            }));
            const milvusResponse = await milvusServices_1.client.insert({
                collection_name: milvusServices_1.collectionName,
                fields_data: fieldsData
            });
            const vectorId = milvusResponse.IDs;
            await milvusServices_1.client.loadCollection({
                collection_name: milvusServices_1.collectionName,
            });
            if ('int_id' in vectorId && vectorId.int_id) {
                const idArray = vectorId.int_id.data;
                const docId = `doc_${Date.now()}`;
                const pgInsertres = await prisma.fileDta.create({
                    data: {
                        docId: docId,
                        embeddingGenerated: checkGen,
                    }
                });
                const indexInfo = await milvusServices_1.client.describeIndex({
                    collection_name: milvusServices_1.collectionName,
                    field_name: "vector_field",
                });
                if (!indexInfo.status || indexInfo.status.error_code !== 'Success') {
                    console.error(`No index exists for the collection. Reason: ${indexInfo.status.reason}`);
                }
                else {
                    console.log("Index details:", indexInfo);
                }
                const chunksData = textChunks.map((chunk, index) => ({
                    fileId: pgInsertres.id,
                    chunk: chunk,
                    vectorId: idArray[index].toString(),
                }));
                await prisma.fileMetaData.createMany({
                    data: chunksData
                });
                await milvusServices_1.client.createIndex({
                    collection_name: milvusServices_1.collectionName,
                    field_name: "vector_field",
                    index_type: milvus2_sdk_node_1.IndexType.IVF_FLAT,
                    metric_type: "L2",
                    params: { nlist: 1024 },
                });
                console.log("File all the operations are being done !");
            }
            else {
                console.error("error in id");
            }
        }
    }
    catch (e) {
        console.error("Error generating embeddings ", e);
    }
});
exports.default = pdfrouter;
