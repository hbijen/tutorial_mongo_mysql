import { json, type RequestEvent } from "@sveltejs/kit";
//import type { RequestEvent } from "./$types";
import  mongoClient from "$lib/db/mongo";
import type { Sort } from "mongodb";



const projection = {
    Name: 1,
    Continent: 1,
    Population: 1,
    SurfaceArea: 1
  }
  
export async function POST(event: RequestEvent) {

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
    let results = await db.collection("country_one").find({}, 
      {
    }).toArray()


    results.forEach((object) => {
      object.id = object._id.toJSON();
    });

	return json(results)
}