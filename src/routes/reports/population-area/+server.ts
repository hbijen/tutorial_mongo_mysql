import { json, type RequestEvent } from "@sveltejs/kit";
import mongoClient from "$lib/db/mongo";

export async function GET(event: RequestEvent) {

  const db = mongoClient.db("world")
  
  //FIXME 25: For each country return following data include country name
  // 1. total population 
  // 2. total surface area
  //FIXME 26: return the GNP value as well
  let results = await db.collection("country_one").aggregate( [
     ]).toArray()

  results.forEach((object, i) => {
    object.id = i;
    object.group = 'country'
  });
  return json(results)
}
