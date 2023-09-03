import mongoClient from "$lib/db/mongo";
import { getMySQlConnection } from "$lib/db/mysql";
import { isMongo } from "$lib/db/usedb";
import { ObjectId } from "mongodb";

export async function load() {

  return isMongo ? mongoLoad() : mysqlLoad()

}

async function mongoLoad() {
  try {
    const db = mongoClient.db("world")

    //FIXME 6: get the first 10 cities
    let results = await db.collection("country_one").aggregate([

    ]).toArray()

    console.log("results ", results)

    //FIXME 7: return the total count of all the cities
    var total_count = 100;
    let count_result = await db.collection("country_one").aggregate([

    ]).toArray()

    total_count = count_result[0].city_count
    console.log("aggregate result ", count_result)

    return { data: results, total_count: total_count }
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function mysqlLoad() {

  const mysqlconn = await getMySQlConnection()


  try {
    //FIXME 6 mysql: get the first 10 cities
    // note make sure to use te alias name 'Country' for the country name    
    const [rows, fields] = await mysqlconn
      .query(`
      <SQL QUERY HERE>
      `)
    console.log('results, ', rows)

    //FIXME 7 mysql: return the total count of all the cities
    var total_count = 100;
    let result = await mysqlconn
      .query("<SQL QUERY HERE>")
      .then(function ([rows, fields]) {
        return rows;
      });
    console.log("count ", result)

    //@ts-ignore
    total_count = result[0].total_count

    return { data: rows, total_count: total_count }
  } catch (error) {
    console.log(error);
    return { data: [] };
  }

}