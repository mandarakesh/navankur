const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    console.log('MongoDB Connected...');
    return client.db();  // Return the database 
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
