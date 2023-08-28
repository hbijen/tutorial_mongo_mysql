import  mongoClient from "$lib/db/mongo";
import { json, type RequestEvent } from "@sveltejs/kit";



export async function PUT(event: RequestEvent) {
	const db = mongoClient.db("world")
	
	// this is the data that need to be updated
	let body = await event.request.json()
	console.log("add data ", body)

	// FIXME 12: insert a new country document
	let result = await db.collection("country_one").insertOne({})
	return json(result)
}
