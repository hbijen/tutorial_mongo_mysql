import mongoClient from "$lib/db/mongo";
import { getMySQlConnection } from "$lib/db/mysql";
import { isMongo } from "$lib/db/usedb";
import { json, type RequestEvent } from "@sveltejs/kit";



export async function POST(event: RequestEvent) {
	return isMongo? mongo_POST(event): mysql_POST(event)
}
	async function mongo_POST(event: RequestEvent) {	

	// this is the data that need to be updated
	let body = await event.request.json()
	console.log("search data ", body)

	let searchText = body.searchText

	const db = mongoClient.db("world")

	// FIXME 10: search for document using the country name $eq ( searchText contains input text)
	// FIXME 11: search for documents using the country name that startswith
	// use $regex. to match starting letters 'abc', regex will look like '^abc' 
	// Note: the log output and figure out which attributes to be used
	//Verify Fix:
	//1. On Left Navigation click on Country > List
	//2. Enter text in search input field and press Enter key
	let results = await db.collection("country_one")
		.find().limit(10).toArray()

	console.log("search result", results)
	return json(results)
}
async function mysql_POST(event: RequestEvent) {
	// this is the data that need to be updated
	let body = await event.request.json()
	console.log("search data ", body)

	let searchText = body.searchText

	const mysqlconn = await getMySQlConnection()

	// FIXME 10 mysql: search for records using the country name $eq ( searchText contains input text)
	// FIXME 11 mysql: search for records using the country name that startswith
	// use $regex. to match starting letters 'abc', regex will look like '^abc' 
	// Note: the log output and figure out which attributes to be used
	// and include the column 'Code' as well in selection
	//Verify Fix:
	//1. On Left Navigation click on Country > List
	//2. Enter text in search input field and press Enter key
	const query = `
	<SQL QUERY HERE>
		`
	const [rows, fields] = await mysqlconn.query(query)

	console.log("search result", rows)
	return json(rows)
	
}

