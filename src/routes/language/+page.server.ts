import  mongoClient from "$lib/db/mongo";
import { getMySQlConnection } from "$lib/db/mysql";
import { isMongo } from "$lib/db/usedb";
import { ObjectId } from "mongodb";

export async function load() {

  return isMongo? mongoLoad() : mysqlLoad()

}

async function mongoLoad() {
  try {
    const db = mongoClient.db("world")

    //FIXME 19: Official Language of each country sorted by Continent and Name
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

    //FIXME 19 mysql: Official Language of each country sorted by Continent and Name
    const [rows] = await mysqlconn.query(`
    <SQL QUERY HERE>
    `)

    return {data: rows}
  } catch (error) {
    console.log(error);
    return error;
  }
}

