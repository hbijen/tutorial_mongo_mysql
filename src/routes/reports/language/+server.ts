import  mongoClient from "$lib/db/mongo";
import { getMySQlConnection } from "$lib/db/mysql";
import { isMongo } from "$lib/db/usedb";
import { json, type RequestEvent } from "@sveltejs/kit";

export async function POST(event: RequestEvent) {
    return isMongo ? mongo_POST(event) : mysql_POST(event)
}

async function mongo_POST(event: RequestEvent) {

    const db = mongoClient.db("world")

    
    let body = await event.request.json()
    let countryName: string = body.countryName;

    //FIXME 18: For the input country name
    // return list language with its percentage in the following format
    // {group: "language name", value: "language percentage"}
    let results = await db.collection("country_one").aggregate([

    ]).toArray()

	return json(results)
}

async function mysql_POST(event: RequestEvent) {

    const mysqlconn = await getMySQlConnection()
    
    let body = await event.request.json()
    let countryName: string = body.countryName;

    //FIXME 18 mysql: For the input country name
    // return list language aliased "group" and percentage aliased 'value'
    // and make sure to enclose group in double qoute since its a sql keyword
    const [results] = await mysqlconn.query( `
    <SQL QUERY HERE>
    `
    )

	return json(results)
}