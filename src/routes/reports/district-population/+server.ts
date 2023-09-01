import  mongoClient from "$lib/db/mongo";
import { json, type RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent) {

    const db = mongoClient.db("world")

    //FIXME 27: Calculate the total population of all the cities in a district 
    // in ‘India’ and return the district and its population
    // 1. use the field 'total_population' to store the total population
    let results = await db.collection("country_one").aggregate([
     ]).toArray()

	return json(results)
}