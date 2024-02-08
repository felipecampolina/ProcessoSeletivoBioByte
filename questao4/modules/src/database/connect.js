const mongoose = require('mongoose');


const connectToDatabase = async () => {
  try {
    const uri = `mongodb+srv://admin:123@cluster0.5kmxjwp.mongodb.net`;
    await mongoose.connect(uri, {
      dbName: 'Cluster0', 
    });
    console.log("Sucesso na conexão ao BD");
  } catch (error) {
    console.error("Erro na conexão ao BD:", error.message);
  }
};

module.exports = connectToDatabase;
