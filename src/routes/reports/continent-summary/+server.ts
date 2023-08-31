import { json, type RequestEvent } from "@sveltejs/kit";
import mongoClient from "$lib/db/mongo";

export async function POST(event: RequestEvent) {
  let body = await event.request.json()
  let summary: string = body.summary;

  if (summary == 'basic') {
    return summaryBasic()
  } else if (summary == 'advanced') {
    return summaryAdvanced()
  }
  return json([])
}

async function summaryBasic() {
  const db = mongoClient.db("world")

  //FIXME 23: Find following summary of each Continent
  // 1. Country count (out field name 'country_count')
  // 2. City count (out field name 'city_count')
  // 3. Total population (out field name 'Population')
  // 4. Total surface area (out field name 'SurfaceArea')

  let results = await db.collection("country_one").aggregate([
     ]).toArray()

  return json(results)
}

async function summaryAdvanced() {
  const db = mongoClient.db("world")

  //FIXME 24: Find total unique languages spoke in each Continent
  // set the out field name to 'language_count'
  let results = await db.collection("country_one").aggregate([
    
  ]).toArray()

  return json(results)
}