import mongoClient from "$lib/db/mongo";
import { getMySQlConnection } from "$lib/db/mysql";
import { isMongo } from "$lib/db/usedb";
import { json, type RequestEvent } from "@sveltejs/kit";
import type mysql from 'mysql2/promise'

export async function PUT(event: RequestEvent) {
	return isMongo ? mongo_PUT(event) : mysql_PUT(event)
}

async function mongo_PUT(event: RequestEvent) {
	const db = mongoClient.db("world")

	// this is the data that need to be updated
	let body = await event.request.json()
	console.log("add data ", body)

	// FIXME 13: insert a new country document
	//Verify Fix:
	//1. On Left Navigation click on Country > List
	//2. Click on Add button
	//3. Click on Save Button
	let result = await db.collection("country_one").insertOne({})
	return json(result)
}

async function mysql_PUT(event: RequestEvent) {
	const mysqlconn = await getMySQlConnection()

	// this is the data that need to be updated
	let body = await event.request.json()
	console.log("add data ", body)
	try {
		// we start a transaction since there are multiple inserts and if one of them fails
		mysqlconn.beginTransaction()

		// FIXME 13 mysql: insert a new country record, alongwith its cities and languages
		//Verify Fix:
		//1. On Left Navigation click on Country > List
		//2. Click on Add button
		//3. Click on Save Button

		// insert country query
		const insertCountry = `
			<SQL QUERY HERE>
		`;
		console.log('insert country: ', insertCountry)
		const [countryInsertResult] = await mysqlconn.execute(insertCountry)
		console.log('result ', countryInsertResult)

		// Bulk Insert all the cities (Sample provided)
		// country code is available here
		const countryCode = body.Code
		let insertCities =
			`
		INSERT INTO city(Name, CountryCode, District)
		VALUES 
		`
		let cityList: any[] = []
		for (let city of body.cities) {
			cityList.push(`('${city.Name}', '${countryCode}', '${city.District}')`)
		}
		console.log("interim city values: ", cityList)

		// the query is a single string with comma separatd city row values
		insertCities += cityList.join(", ")

		console.log('final insert cities query: ', insertCities)
		if (cityList.length > 0) {
			const [cityInsertResult] = await mysqlconn.execute(insertCities)
			console.log('result ', cityInsertResult)
		}

		// Bulk Insert all the cities
		// country code is available here
		let insertLanguages = `
		<SQL QUERY HERE>
		`
		let languageList: any[] = []
		for (let lang of body.languages) {
			languageList.push(`<SQL QUERY HERE>`)
		}
		console.log("interim languages values: ", languageList)

		// the query is a single string with comma separatd city row values
		insertLanguages += languageList.join(", ")

		console.log('final insert cities query: ', insertLanguages)
		if (languageList.length > 0) {
			const [languageInsertResult] = await mysqlconn.execute(insertLanguages)
			console.log('result ', languageInsertResult)
		}

		// finally commit the all the inserts
		mysqlconn.commit()

		return json({ acknowledged: true, insertedId: 1 })
	} catch (error) {
		console.log('Error', error)
		mysqlconn.rollback()
	}
	json({})
}
