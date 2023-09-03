import mongoClient from "$lib/db/mongo";
import { getMySQlConnection } from "$lib/db/mysql";
import { isMongo } from "$lib/db/usedb";

export async function load() {

  return isMongo? mongoLoad() : mysqlLoad()

}

async function mongoLoad() {
  try {
    const db = mongoClient.db("world")

    // FIXME 17: find all the countries with following conditions
    // 1. return only the name and id
    // 2. sort it by name ascending
    let results = await db.collection("country_one")
      .find({}).limit(1).toArray()

    console.log("results ", results)

    return { data: JSON.parse(JSON.stringify(results)) }
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function mysqlLoad() {
  try {
    const mysqlconn = await getMySQlConnection()

    // FIXME 17 mysql: find all the countries with following conditions
    // 1. return only the name and Code
    // 2. sort it by name ascending
    const [rows, fields] = await mysqlconn.query(`
    <SQL QUERY HERE>
    `)

    return { data: rows }
  } catch (error) {
    console.log(error);
    return error;
  }
}