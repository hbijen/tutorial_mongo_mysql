import  mongoClient from "$lib/db/mongo";
import { json, type RequestEvent } from "@sveltejs/kit";

export async function POST(event: RequestEvent) {

    const db = mongoClient.db("world")

    
    let body = await event.request.json()
    let countryName: string = body.countryName;

    //FIXME 18: For the input country name
    // return list language with its percentage in the following format
    // {group: "has language name", value: "language percentage"}
    let results = await db.collection("country_one").aggregate([

    ]).toArray()

	return json(results)
}