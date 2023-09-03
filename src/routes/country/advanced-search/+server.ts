import  mongoClient from "$lib/db/mongo";
import { getMySQlConnection } from "$lib/db/mysql";
import { isMongo } from "$lib/db/usedb";
import { json, type RequestEvent } from "@sveltejs/kit";

export async function POST(event: RequestEvent) {
	return isMongo? mongo_POST(event) : mysql_POST(event)
}

async function mongo_POST(event: RequestEvent) {
	// this is the data that need to be updated
	let body = await event.request.json()
	let { population, density, city, language } = body;

	console.log(`population: ${population}, density: ${density}, city: ${city}, language: ${language}`)

	const db = mongoClient.db("world")
	
	// FIXME 16: Advanced search with multiple parameters
	// 1. find countries will population greater than input
	// 2. find countries will population density greater than input
	// 3. find countries having city with name that starts with the input (use regex)
	// 4. find countries will spoken languages as input
	// if more than one input value then all the filters must be applied together
	// Note: the log output and figure out which attributes to be used

	let filter: {[key:string]: any} = {}
	// example for comparison of density a computed field is given below!
	if (density) {
		filter["$expr"] = {$gt: [{$divide: ["$Population", "$SurfaceArea"]}, density]}
	}
	
	console.log("applied filter ", filter)

	let results = await db.collection("country_one").find(filter, {
		projection: {
			Name: 1, Continent: 1, Population:1, SurfaceArea: 1
		} }).limit(10).toArray()

	console.log("search result", results)
	return json(results)
}

async function mysql_POST(event: RequestEvent) {
	let body = await event.request.json()
	let { population, density, city, language } = body;

	console.log(`population: ${population}, density: ${density}, city: ${city}, language: ${language}`)

	const mysqlconn = await getMySQlConnection()
	// FIXME 16 mysql: Advanced search with multiple parameters
	// 1. find countries will population greater than input
	// 2. find countries will population density greater than input
	// 3. find countries having city with name that starts with the input (use regex)
	// 4. find countries will spoken languages as input
	// if more than one input value then all the filters must be applied together
	// Note: the log output and figure out which attributes to be used

	let query = `
	<SQL QUERY HERE>
	`

	const filters = []
	if (density) {
		filters.push(`(c.Population/c.SurfaceArea) > ${density}`)
	}

	if (filters.length > 0) {
		query += ' WHERE ' + filters.join(' AND ')
	}

	console.log('query: ', query)
	
	const [rows, fields] = await mysqlconn.query(query)

	console.log('result : ', rows)

	return json(rows)
}