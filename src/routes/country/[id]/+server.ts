import mongoClient from "$lib/db/mongo";
import { getMySQlConnection } from "$lib/db/mysql";
import { isMongo } from "$lib/db/usedb";
import { json, type RequestEvent } from "@sveltejs/kit";
import { ObjectId } from "mongodb";

export async function GET(event: RequestEvent) {
	return isMongo ? mongo_GET(event) : mysql_GET(event)
}

export async function POST(event: RequestEvent) {
	return isMongo ? mongo_UPDATE(event) : mysql_UPDATE(event)
}

export async function DELETE(event: RequestEvent) {
	return isMongo ? mongo_DELETE(event) : mysql_DELETE(event)
}

async function mongo_GET(event: RequestEvent) {

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

async function mysql_GET(event: RequestEvent) {

	const mysqlconn = await getMySQlConnection()

	let countryCode = event.params.id
	console.log("got country code: ", countryCode)
	if (!countryCode) {
		return new Response(null, { status: 404 })
	}

	// FIXME 13 mysql: find a country record using the country code, 
	// fetch city and language using the country code
	// NOTE make sure to use a different alias for city.Name as 'cityName' since it will conflict with country.Name
	const query = `
	<SQL QUERY HERE>
	`
	const [rows] = await mysqlconn.query(query)

	//@ts-ignore
	const countryData = rows[0]
	console.log('sql result ', rows)

	// get all the cities for the country code
	const cityQuery = `SELECT c.id, c.CountryCode, c.Name, c.District
	FROM city c 
	where c.CountryCode = '${countryCode}'`
	const [cityrows] = await mysqlconn.query(cityQuery)

	console.log('cityrows: ', cityrows)
	countryData.cities = cityrows

	// get all the cities for the country code
	const languageQuery = `SELECT c.CountryCode, c.Language, c.IsOfficial
	FROM countrylanguage c
	where c.CountryCode = '${countryCode}'`
	const [languagerows] = await mysqlconn.query(languageQuery)

	console.log('languagerows: ', languagerows)
	countryData.languages = languagerows

	return json(countryData)
}

async function mongo_UPDATE(event: RequestEvent) {

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

async function mysql_UPDATE(event: RequestEvent) {

	const mysqlconn = await getMySQlConnection()

	// this is the country code, 
	let countryCode: string = event.params.id!
	// this is the data that need to be updated
	let body = await event.request.json()
	console.log("update data ", body)

	if (!countryCode) {
		return new Response(null, { status: 404 })
	}

	// FIXME 14 mysql: Update the document identified by countryCode

	try {
		// we start a transaction since there are multiple updates and if one of them fails
		mysqlconn.beginTransaction()

		// update country query
		const updateCountry = `
		<SQL QUERY HERE>
		`;
		console.log('update country: ', updateCountry)
		const [updateResult] = await mysqlconn.execute(updateCountry)
		console.log('result ', updateResult)

		// Update each city individually
		for (let city of body.cities) {
			let cityQuery = ""
			if (city.id) {
				// existing record update
				cityQuery =`
				<SQL QUERY HERE>
				`
			} else {
				// new record insert
				cityQuery = `
				<SQL QUERY HERE>
				`
			}
			console.log('add/update city: ', cityQuery)
			const [cityQueryResult] = await mysqlconn.execute(cityQuery)
			console.log('cityQueryResult result: ', cityQueryResult)
		}

		// only new languages can be added to the country! why?
		for (let lang of body.languages) {
			let langQuery = `
			<SQL QUERY HERE>
			    `
			console.log('add language: ', langQuery)
			try {
				const [langQueryResult] = await mysqlconn.execute(langQuery)
				console.log('langQuery result: ', langQueryResult)
			} catch (error: any) {
				if (error.code == 'ER_DUP_ENTRY') {
					//record exist so do nothing
					console.log(error.sqlMessage)
					continue
				} else {
					throw error
				}
			}
		}

		// finally commit the all the updates
		mysqlconn.commit()

		return json({ acknowledged: true, modifiedCount: 1 })
	} catch (error) {
		console.log('Error', error)
		mysqlconn.rollback()
	}
	json({})

}

async function mongo_DELETE(event: RequestEvent) {
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

async function mysql_DELETE(event: RequestEvent) {
	let countryCode = event.params.id
	console.log("delete country code: ", countryCode)
	if (!countryCode) {
		return new Response(null, { status: 404 })
	}
	const mysqlconn = await getMySQlConnection()

	try {
		// we start a transaction since there are multiple inserts and if one of them fails
		mysqlconn.beginTransaction()

		// FIXME 15 mysql: delete all records of the country have code = input countryCode
		// note we need to delete the child records first countrylanguage and city

		// delete all records in countrylanguage matching the country code
		const [result1] = await mysqlconn.execute('<SQL QUERY HERE>', [countryCode])
		console.log('delete language: ', result1)

		// delete all records in city matching the country code
		const [result2] = await mysqlconn.execute('<SQL QUERY HERE>', [countryCode])
		console.log('delete city: ', result2)

		// delete all records in country matching the country code
		const [result3] = await mysqlconn.execute('DELETE FROM country WHERE code = ?', [countryCode])
		console.log('delete country: ', result3)

		mysqlconn.commit()

		return json({ acknowledged: true, deletedCount: 1 })
	} catch (error) {
		console.log('Error', error)
		mysqlconn.rollback()
	}
	json({})

}