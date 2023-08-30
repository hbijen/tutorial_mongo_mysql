import { json, type RequestEvent } from "@sveltejs/kit";
import mongoClient from "$lib/db/mongo";

export async function GET(request: RequestEvent) {
  const db = mongoClient.db("world")
  //FIXME 22: For each Continent find
  // 1. Average population ( use output field as AveragePopulation )
  // 2. Total SurfaceArea ( use output field as TotalSurfaceArea )
  let results = await db.collection("country_one").aggregate([
  ]).toArray()

  return json(results)
}

