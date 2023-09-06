import { json, type RequestEvent } from "@sveltejs/kit";
import mongoClient from "$lib/db/mongo";
import { isMongo } from "$lib/db/usedb";
import { getMySQlConnection } from "$lib/db/mysql";

export async function POST(event: RequestEvent) {
  return isMongo? mongo_POST(event) : mysql_POST(event)
}

async function mongo_POST(event: RequestEvent) {

  const db = mongoClient.db("world")
  
  let body = await event.request.json()
  let {maxPop, maxArea} = body;  
  
  //FIXME 25: For each country return following data (include country name)
  // 1. link max population and max area parameter to filter out countries 
  //FIXME 26: return the GNP value as well in the projection
  //Verify Fix:
  //1. On Left Navigation click on Reports > 'Population by Area'
  //2. Click on the '3 Dimension Data' Tab for the second fix
  let results = await db.collection("country_one").aggregate( [
    {
      $project: {
        Name: 1,
        Population: 1,
        SurfaceArea: 1
      }
    }
     ]).toArray()

  return json(results)
}

async function mysql_POST(event: RequestEvent) {

  const mysqlconn = await getMySQlConnection()

  let body = await event.request.json()
  let {maxPop, maxArea} = body;  
  
  //FIXME 25 mysql: For each country return following data (include country name)
  // 1. link max population and max area parameter to filter out countries 
  //FIXME 26 mysql: return the GNP value as well in the projection
  //Verify Fix:
  //1. On Left Navigation click on Reports > 'Population by Area'
  //2. Click on the '3 Dimension Data' Tab for the second fix
  let [results] = await mysqlconn.query(`
    <SQL QUERY HERE>
  `)

  return json(results)
}