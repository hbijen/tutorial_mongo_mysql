import { json, type RequestEvent } from "@sveltejs/kit";
import mongoClient from "$lib/db/mongo";
import { isMongo } from "$lib/db/usedb";
import { getMySQlConnection } from "$lib/db/mysql";

export async function GET(request: RequestEvent) {
  let type = request.params.type
  console.log("type: ", type)
  if (isMongo) {
    return type == "0" ? mongo_countriesByLanguages() : mongo_languagesByCountries()
  } else {
    return type == "0" ? mysql_countriesByLanguages() : mysql_languagesByCountries()
  }
}

async function mongo_countriesByLanguages() {
  const db = mongoClient.db("world")
  //FIXME 20: get the count of languages of each country, sort it ascending order
  // and return all the documents greater than 3
  let results = await db.collection("country_one").aggregate([
  ]).toArray()

  return json(results)
}

async function mongo_languagesByCountries() {
  const db = mongoClient.db("world")

  //FIXME 21: get all the language records where 
  // 1. a language spoken in atleast 10 countries 
  // 2. Sort the records by number of countries in ascending order

  let results = await db.collection("country_one").aggregate(
    [
    ]
  ).toArray()

  return json(results)
}



async function mysql_countriesByLanguages() {
  const mysqlconn = await getMySQlConnection()

  //FIXME 20 mysql: get the count of languages of each country, sort it ascending order
  // and return all the documents greater than 6
  // note: use 'value' as alias name of the count
  const [results] = await mysqlconn.query(`
  <SQL QUERY HERE>
  `)

  return json(results)
}

async function mysql_languagesByCountries() {
  const mysqlconn = await getMySQlConnection()

  //FIXME 21 mysql: get all the language records where 
  // 1. a language spoken in atleast 10 countries 
  // 2. Sort the records by number of countries in ascending order
  // note: use 'value' as alias name of the count
  const [results] = await mysqlconn.query(`
  <SQL QUERY HERE>
  `)

  return json(results)
}