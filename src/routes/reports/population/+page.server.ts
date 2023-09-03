import  mongoClient from "$lib/db/mongo";
import { getMySQlConnection } from "$lib/db/mysql";
import { isMongo } from "$lib/db/usedb";

export async function load() {

  return isMongo? mongoLoad() : mysqlLoad()

}

async function mongoLoad() {
  try {
    const db = mongoClient.db("world")

    //FIXME 9: get first 20 country records 
    // sorted by population in descending order
    // Fetch only required fields

    let results = await db.collection("country_one").aggregate([

    ]).toArray()

    return {data: JSON.parse(JSON.stringify(results))}
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function mysqlLoad() {
  try {
    const mysqlconn = await getMySQlConnection()

    //FIXME 9 mysql: get first 20 country records 
    // sorted by population in descending order
    // Fetch only required fields
    const [rows, fields] = await mysqlconn.query(`
    <SQL QUERY HERE>
    `)

    return {data: rows}
  } catch (error) {
    console.log(error);
    return error;
  }
}
