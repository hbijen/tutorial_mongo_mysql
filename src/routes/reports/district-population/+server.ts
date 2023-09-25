import  mongoClient from "$lib/db/mongo";
import { getMySQlConnection } from "$lib/db/mysql";
import { isMongo } from "$lib/db/usedb";
import { json, type RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent) {
    return isMongo? mongo_GET(event) : mysql_GET(event)
}

async function mongo_GET(event: RequestEvent) {

    const db = mongoClient.db("world")

    //FIXME 27: Calculate the total population of all the cities in a district 
    // in ‘India’ and return the district and its population
    // 1. use the field 'total_population' to store the total population
    //Verify Fix:
    //1. On Left Navigation click on Reports > 'State Population'
    let results = await db.collection("country_one").aggregate([
     ]).toArray()

	return json(results)
}

async function mysql_GET(event: RequestEvent) {

    const mysqlconn = await getMySQlConnection()

    //FIXME 27 mysql: Calculate the total population of all the cities in a district 
    // in ‘India’ and return the district and its population
    // 1. use the field 'total_population' to store the total population
    //Verify Fix:
    //1. On Left Navigation click on Reports > 'State Population'
    const [results] = await mysqlconn.query(`
    SELECT 1 FROM DUAL
    `)
    console.log('results: ', results)
	return json(results)
}