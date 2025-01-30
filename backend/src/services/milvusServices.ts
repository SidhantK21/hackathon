import { MilvusClient,DataType } from "@zilliz/milvus2-sdk-node";


const address="http://localhost:19530";
// export this client to tingle with the db in the other folders 
type Collection_name=string;
type Dbname=string;

export const client=new MilvusClient(address);
export const collectionName:Collection_name="my_new2";

// mlivus context check 
export const milvusCreds={
  dbcheck:false,
  collectionCheck:false
};

const dbName:Dbname = "my_db";

const schema = {
    collection_name: collectionName,
    fields: [
      {
        name: 'id', 
        data_type: DataType.Int64,
        is_primary_key: true,
        autoID: true,
      },
      {
        name: 'vector_field', 
        data_type: DataType.FloatVector,
        dim: 1536, 
      },
    ],
};


export const initailzeService=async ()=>{
    try{
      const databases = await client.listDatabases();
      const Objname=databases.db_names;
      const name=Objname.filter((item)=>item===dbName);
      if(!name)
      {
        await client.createDatabase({db_name:dbName});
        milvusCreds.dbcheck=true;
        console.log("Database created successfully");
      }
      console.log("Database already exists");
        
    }catch(e)
    {
      console.log("Error creating the database",e);
    }
  
    await client.use({ db_name: dbName });
  
    try { 
      if(!milvusCreds.collectionCheck)
      {
        const collections = await client.list_collections();
        if (!collections.data.some((col) => col.name === collectionName)) {
          await client.createCollection(schema);
          console.log("Collection created successfully.");
        }
      }
    } catch (e) {
      console.error("Error initializing Milvus:", e);
    }
}