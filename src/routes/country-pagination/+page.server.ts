import  mongoClient from "$lib/db/mongo";
import { getMySQlConnection } from "$lib/db/mysql";
import { isMongo } from "$lib/db/usedb";


const projection = {
  Name: 1,
  Continent: 1,
  Population: 1,
  SurfaceArea: 1
}

export async function load() {

  return isMongo ? mongoLoad() : mysqlLoad();

}

async function mongoLoad() {
  try {
    const db = mongoClient.db("world")

    let results = await db.collection("country_one").find({}, {
      projection: projection,
      limit: 10
    }).toArray()

    //FIXME 3: return the total count of the country collection
    //Verify Fix: On Left Navigation click on Country > Paginated
    var total_count = 100; 
    let result = await db.collection("country_one").aggregate([
    ]).toArray()

    total_count = result[0].country_count
    console.log("aggregate result ", result)

    return {data: results, total_count: total_count}
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function mysqlLoad() {
  try {
    const mysqlconn = await getMySQlConnection()

    let [rows, fields] = await mysqlconn
      .query(`
      SELECT Name, Continent, Population, SurfaceArea 
      FROM country 
      LIMIT 10`)


    //FIXME 3 mysql: return the total count of the country collection
    // make sure to use the alias name of the count to 'total_count'
    //Verify Fix: On Left Navigation click on Country > Paginated
    var total_count = 100; 
    let result = await mysqlconn
      .query("<SQL QUERY HERE>")
      .then(function ([rows, fields]) {
        return rows;
      });
    console.log("count ", result)

    //@ts-ignore
    total_count = result[0].total_count
    

    return {data: rows, total_count: total_count}
  } catch (error) {
    console.log(error);
    return error;
  }
}
