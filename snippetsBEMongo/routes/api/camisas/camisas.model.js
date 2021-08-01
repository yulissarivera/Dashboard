const MongoDB = require('../../utilities/db');
const ObjectId = require('mongodb').ObjectID;
let db;
let camisaCollection;

//se ejecuta cuando se manda a require(este archivo)
(async function(){
    try{
      if (!camisaCollection) {
        db = await MongoDB.getDB();
        camisaCollection = db.collection("camisas");
        if(process.env.ENSURE_INDEX == 1){
          // Vamos a asegurarnos de que exista el indice
        }
      }
    }catch(ex){
      console.log(ex);
      process.exit(1);
    }
})();

module.exports.getAllCamisas = async ()=>{
  try {
    let docsCursor = camisaCollection.find({}); 
    let rows = await docsCursor.toArray()
    return rows;
  } catch(ex){
    console.log(ex);
    throw(ex);
  }
}

module.exports.getByTipo = async (tipo)=>{
    try{
      const filter = {tipo:tipo};
      let cursor = camisaCollection.find(filter);
      let rows = await cursor.toArray();
      return rows;
    }catch(ex){
      console.log(ex);
      throw (ex);
    }
}

module.exports.getBySalesWithOperator = async (ventas, a) => {
    try {
      let mongoOperator = {};
      switch(ventas){
        case "gt":
          mongoOperator["$gt"] > ventas;
         break;
        case "lt":
          mongoOperator["$lt"] < ventas;
          break;
        default:
          mongoOperator = ventas;
          break;
      }
      const filter = { ventas: mongoOperator };
      let cursor = camisaCollection.find(filter);
      let rows = await cursor.toArray();
      return rows;
    } catch (ex) {
      console.log(ex);
      throw (ex);
    }
}

module.exports.getBySalesRange = async (a, b, includeExtremes) => {
    try {
        const range = (includeExtremes) ? 
            {"$gt":a} :
            {"$lt":b}
        ;
        const filter = { ventas: range };
        let cursor = camisaCollection.find(filter);
        let rows = await cursor.toArray();
        return rows;
    } catch (ex) {
        console.log(ex);
        throw (ex);
    }
}