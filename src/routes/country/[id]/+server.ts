import mongoClient from "$lib/db/mongo";
import { json, type RequestEvent } from "@sveltejs/kit";
import { ObjectId } from "mongodb";


export async function POST(event: RequestEvent, response: Response) {

	const db = mongoClient.db("world")

	// this is the object id, 
	let countryId = event.params.id
	// this is the data that need to be updated
	let body = await event.request.json()
	console.log("update data ", body)

	if (!countryId) {
		return new Response(null, { status: 404 })
	}

	// FIXME 14: Update the document identified by countryId
	// NOTE do not forget to use new ObjectId(id) while matching the document
	let result = await db.collection("country_one")
		.updateOne({}, {})
	return json(result)
}

export async function GET(event: RequestEvent) {

	const db = mongoClient.db("world")

	let countryId = event.params.id
	console.log("got country id ", countryId)
	if (!countryId) {
		return new Response(null, { status: 404 })
	}

	// FIXME 13: find a document using the id
	// NOTE do not forget to use new ObjectId(id) while matching the document
	let result = await db.collection("country_one")
		.findOne({})

	return json(result)
}


export async function DELETE(event: RequestEvent) {
	const db = mongoClient.db("world")

	let countryId = event.params.id
	console.log("delete country id ", countryId)
	if (!countryId) {
		return new Response(null, { status: 404 })
	}

	// FIXME 15: delete a document using the id
	// NOTE do not forget to use new ObjectId(id) while matching the document
	let result = await db.collection("country_one")
		.deleteOne({})

	return json(result)

}