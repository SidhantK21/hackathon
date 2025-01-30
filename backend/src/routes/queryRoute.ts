import { chatCompl } from "../chatcompletion/completion";
import express ,{Request,Response} from "express";
import { gen } from "../embedding/embd";
import { createPrompt } from "../prompt/prompt";
import { client, collectionName } from "../services/milvusServices";
import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient();
const queryrouter=express.Router();

queryrouter.post("/query",async(req:Request,res:Response)=>{
  try{
    const {userInp}=req.body;
    if(!userInp)
    {
       res.status(400).send("No inputs");
       return;
    }
    
    const embeddingQuery=await gen(userInp);
    if(!embeddingQuery||!embeddingQuery.data)
    {
      throw new Error("Failed to generate the embeddings");
    }
    const vectorQuery=embeddingQuery.data[0].embedding;

    await client.loadCollection({
      collection_name: collectionName,
    });

    const searchMilvus=await client.search({
      collection_name:collectionName,
      vectors:[vectorQuery],
      topk:10,
      params:{noprobe:16}
    });

    if (!searchMilvus.results||!searchMilvus.results[0]) {
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
    
    const prompt=await createPrompt(userInp,chunks);

    const summaryOutput = await chatCompl(prompt);
    console.log(summaryOutput);

    if (!chunks || chunks.length === 0) {
      console.log("No chunks found for the given vector IDs");
    }

    res.json({
      results: chunks.map((chunk: { chunk: any; fileId: any; vectorId: any; fileDta: any; }) => ({
          chunk: chunk.chunk,
          fileId: chunk.fileId,
          vectorId: chunk.vectorId,
          document: chunk.fileDta 
      }))
    });

  }catch(e)
  {
    console.log("Error occured",e);
    res.status(500).send("Internal server error");
  }
  
});

export default queryrouter;