import  mongoClient from "$lib/db/mongo";
import { json, type RequestEvent } from "@sveltejs/kit";



export async function POST(event: RequestEvent) {
	
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

    results.forEach((object) => {
		object.id = object._id.toJSON();
	  });	

	console.log("search result", results)
	return json(results)
}
