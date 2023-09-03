import { json, type RequestEvent } from "@sveltejs/kit";
import mongoClient from "$lib/db/mongo";
import { isMongo } from "$lib/db/usedb";
import { getMySQlConnection } from "$lib/db/mysql";

export async function POST(event: RequestEvent) {
  return isMongo? mongo_POST(event) : mysql_POST(event)
}
async function mongo_POST(event: RequestEvent) {
  let body = await event.request.json()
  let summary: string = body.summary;
  console.log('summary mongo: ', summary)
  if (summary == 'basic') {
    return mongo_summaryBasic()
  } else if (summary == 'advanced') {
    return mongo_summaryAdvanced()
  }
  return json([])
}

async function mysql_POST(event: RequestEvent) {
  let body = await event.request.json()
  let summary: string = body.summary;
  console.log('summary mysql: ', summary)
  if (summary == 'basic') {
    return mysql_summaryBasic()
  } else if (summary == 'advanced') {
    return mysql_summaryAdvanced()
  }
  return json([])
}

async function mongo_summaryBasic() {
  const db = mongoClient.db("world")

  //FIXME 23: Find following summary of each Continent
  // 1. Country count (out field name 'country_count')
  // 2. City count (out field name 'city_count')
  // 3. Total population (out field name 'Population')
  // 4. Total surface area (out field name 'SurfaceArea')

  let results = await db.collection("country_one").aggregate([
     ]).toArray()

  return json(results)
}

async function mongo_summaryAdvanced() {
  const db = mongoClient.db("world")

  //FIXME 24: Find total unique languages spoke in each Continent
  // set the out field name to 'language_count'
  let results = await db.collection("country_one").aggregate([
    
  ]).toArray()

  return json(results)
}

async function mysql_summaryBasic() {
  const mysqlconn = await getMySQlConnection()
  //FIXME 23 mysql: Find following summary of each Continent
  // 1. Country count (aliased as 'country_count')
  // 2. City count (aliased as 'city_count')
  // 3. Total population (aliased as 'Population')
  // 4. Total surface area (aliased as 'SurfaceArea')

  let [results] = await mysqlconn.query(`
  <SQL QUERY HERE>
  `)
  console.log('results ', results)

return json(results)
}

async function mysql_summaryAdvanced() {
  const mysqlconn = await getMySQlConnection()
  //FIXME 24 mysql: Find total unique languages spoke in each Continent
  // set the alias as 'language_count'
  let [results] = await mysqlconn.query(`
  <SQL QUERY HERE>
  `)

  console.log('results ', results)

return json(results)  
}
