const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://prathiksen:prathiksen123@ims-backend.gkplcjy.mongodb.net/?appName=IMS-backend";
const client = new MongoClient(uri);

async function run() {
  try {
    console.log("Attempting to connect...");
    await client.connect();
    console.log("✅ SUCCESS: Connected to MongoDB!");
  } catch (err) {
    console.error("❌ FAILED:", err.message);
  } finally {
    await client.close();
  }
}
run();