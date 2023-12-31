import mongoClient from "$lib/db/mongo";
import { getMySQlConnection } from "$lib/db/mysql";
import { isMongo } from "$lib/db/usedb";
import { serialize } from "$lib/utilities";

export async function load() {

  return isMongo ? mongoLoad() : mysqlLoad();

}

async function mongoLoad() {
  try {
    const db = mongoClient.db("world")

    //FIXME 1: get first 10 country records (limit)
    //FIXME 2: fetch only the fields that are displayed on the UI (projection)
    //Verify Fix: On Left Navigation click on Country > List
    let results = await db.collection("country_one").find({}).toArray()
    console.log(results)
    return { data: serialize(results) }
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function mysqlLoad() {

  const mysqlconn = await getMySQlConnection()

  //FIXME 1 mysql: get first 10 country records (limit)
  //FIXME 2 mysql: fetch only the fields that are displayed on the UI (projection)
  //Note: Also include the country Code (which is the primary key)
  //Verify Fix: On Left Navigation click on Country > List
  try {
    const [rows, fields] = await mysqlconn
      .query(`
      <SQL QUERY HERE>
      `)

    console.log('results, ', rows)
    return { data: rows }
  } catch (error) {
    console.log(error);
    return { data: [] };
  }

}

