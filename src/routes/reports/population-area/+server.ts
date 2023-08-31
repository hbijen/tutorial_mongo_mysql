import { json, type RequestEvent } from "@sveltejs/kit";
import mongoClient from "$lib/db/mongo";

export async function POST(event: RequestEvent) {

  const db = mongoClient.db("world")
  
  let body = await event.request.json()
  let {maxPop, maxArea} = body;  
  
  //FIXME 25: For each country return following data include country name
  // 1. link max population and max area parameter to filter out countries 
  //FIXME 26: return the GNP value as well in the projection
  let results = await db.collection("country_one").aggregate( [
    {
      $project: {
        Name: 1,
        Population: 1,
        SurfaceArea: 1
      }
    }
     ]).toArray()

  results.forEach((object, i) => {
    object.id = i;
    object.group = 'country'
  });
  return json(results)
}
