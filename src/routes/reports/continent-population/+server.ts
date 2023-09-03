import { json, type RequestEvent } from "@sveltejs/kit";
import mongoClient from "$lib/db/mongo";
import { isMongo } from "$lib/db/usedb";
import { getMySQlConnection } from "$lib/db/mysql";

export async function GET(request: RequestEvent) {
  return isMongo ? mongo_GET(request) : mysql_GET(request)
}

async function mongo_GET(request: RequestEvent) {
  const db = mongoClient.db("world")
  //FIXME 22: For each Continent find
  // 1. Average population ( use output field as AveragePopulation )
  // 2. Total SurfaceArea ( use output field as TotalSurfaceArea )
  let results = await db.collection("country_one").aggregate([
  ]).toArray()

  return json(results)
}

async function mysql_GET(request: RequestEvent) {
  const mysqlconn = await getMySQlConnection()
  //FIXME 22 mysql: For each Continent find
  // 1. Average population ( use output field as AveragePopulation )
  // 2. Total SurfaceArea ( use output field as TotalSurfaceArea )
  const [results] = await mysqlconn.query(`
  <SQL QUERY HERE>
    `)
  console.log('results: ', results)

  return json(results)
}