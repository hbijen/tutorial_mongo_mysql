import { json, type RequestEvent } from "@sveltejs/kit";
import  mongoClient from "$lib/db/mongo";
import { ObjectId } from "mongodb";
import { isMongo } from "$lib/db/usedb";
import { getMySQlConnection } from "$lib/db/mysql";

const projection = {
    Name: 1,
    Continent: 1,
    Population: 1,
    SurfaceArea: 1
  }

  export async function GET(request: RequestEvent) {
    return isMongo? mongo_GET(request): mysql_GET(request)
  }

  async function mongo_GET(request: RequestEvent) {
    
    let limit = parseInt(request.params.limit || '10')
    let skip  = parseInt(request.params.skip || '0')
    console.log("limit: ", limit, ", skip: ", skip)

    const db = mongoClient.db("world")

    //FIXME 8: Fix the pagination for the city
    //Verify Fix: On Left Navigation click on City > Paginated
    let results = await db.collection("country_one").aggregate([

    ]).toArray()

	return json(results)
}

async function mysql_GET(request: RequestEvent) {

  let limit = parseInt(request.params.limit || '10')
  let skip  = parseInt(request.params.skip || '0')
  console.log("limit: ", limit, ", skip: ", skip)

  const mysqlconn = await getMySQlConnection()

  //FIXME 8 mysql: Fix the pagination for the city
  //Verify Fix: On Left Navigation click on City > Paginated
  const [rows, fields] = await mysqlconn
  .query(`
  <SQL QUERY HERE>
  `)

return json(rows)  
}