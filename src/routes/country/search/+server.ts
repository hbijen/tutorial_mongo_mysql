import mongoClient from "$lib/db/mongo";
import { json, type RequestEvent } from "@sveltejs/kit";



export async function POST(event: RequestEvent) {

	// this is the data that need to be updated
	let body = await event.request.json()
	console.log("search data ", body)

	let searchText = body.searchText

	const db = mongoClient.db("world")

	// FIXME 10: search for document using the country name $eq ( searchText contains input text)
	// FIXME 11: search for documents using the country name that startswith
	// use $regex. to match starting letters 'abc', regex will look like '^abc' 
	// Note: the log output and figure out which attributes to be used
	let results = await db.collection("country_one")
		.find().limit(10).toArray()

	results.forEach((object) => {
		object.id = object._id.toJSON();
	});

	console.log("search result", results)
	return json(results)
}
