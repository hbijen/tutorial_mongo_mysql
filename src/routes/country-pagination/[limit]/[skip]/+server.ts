import { json, type RequestEvent } from "@sveltejs/kit";
//import type { RequestEvent } from "./$types";
import  mongoClient from "$lib/db/mongo";
import type { Sort } from "mongodb";
import { isMongo } from "$lib/db/usedb";
import { getMySQlConnection } from "$lib/db/mysql";



export async function POST(event: RequestEvent) {
  return isMongo? mongo_POST(event): mysql_POST(event)
}
  
async function mongo_POST(event: RequestEvent) {

    let limit = parseInt(event.params.limit || '10')
    let skip  = parseInt(event.params.skip || '0')
    console.log("limit: ", limit, ", skip: ", skip)

    let body = await event.request.json()
    let sortKey: string = body.sortKey || "Name";
    let sortDirection: string = body.sortDirection || "ascending";

    // let order: 1 | -1 = sortDirection == "ascending"? 1 : -1
    // let sortBy:Sort  = {}
    // sortBy[sortKey] = order

    // console.log("sortBy: ", sortBy)

    const db = mongoClient.db("world")

    //FIXME 4 Fix the pagination for the country, use find() or aggregate
    //FIXME 5 Adding sorting based on the header click
    //Verify Fix: On Left Navigation click on Country > Paginated
    let results = await db.collection("country_one").find({}, 
      {
    }).toArray()

	return json(results)
}


async function mysql_POST(event: RequestEvent) {
  let limit = parseInt(event.params.limit || '10')
  let skip  = parseInt(event.params.skip || '0')
  console.log("limit: ", limit, ", skip: ", skip)

  let body = await event.request.json()
  let sortKey: string = body.sortKey || "Name";
  let sortDirection: string = body.sortDirection == 'descending' ? 'DESC' : "ASC";  

  const mysqlconn = await getMySQlConnection()

  //FIXME 4 mysql: Fix the pagination for the country, use find() or aggregate
  //FIXME 5 mysql: Adding sorting based on the header click
  //Verify Fix: On Left Navigation click on Country > Paginated
  let [rows, fields] = await mysqlconn.query(`
  <SQL QUERY HERE>
    `)

return json(rows)

}