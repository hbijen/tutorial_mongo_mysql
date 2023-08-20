import { json, type RequestEvent } from "@sveltejs/kit";
import  mongoClient from "$lib/db/mongo";
import { ObjectId } from "mongodb";

const projection = {
    Name: 1,
    Continent: 1,
    Population: 1,
    SurfaceArea: 1
  }
  

export async function GET(request: RequestEvent) {
    
    let limit = parseInt(request.params.limit || '10')
    let skip  = parseInt(request.params.skip || '0')
    console.log("limit: ", limit, ", skip: ", skip)

    const db = mongoClient.db("world")

    //FIXME 7: Fix the pagination for the city
    let results = await db.collection("country_one").aggregate([

    ]).toArray()

    results.forEach((object) => {
      object.id = new ObjectId();
    });

	return json(results)
}