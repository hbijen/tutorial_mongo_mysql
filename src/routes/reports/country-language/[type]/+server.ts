import { json, type RequestEvent } from "@sveltejs/kit";
import mongoClient from "$lib/db/mongo";
import { ObjectId } from "mongodb";

const projection = {
  Name: 1,
  Continent: 1,
  Population: 1,
  SurfaceArea: 1
}


export async function GET(request: RequestEvent) {
  let type = request.params.type
  console.log("type: ", type)
  return type == "0" ? countriesByLanguages() : languagesByCountries()
}

async function countriesByLanguages() {
  const db = mongoClient.db("world")
  //FIXME 20: get the count of languages of each country, sort it ascending order
  // and return all the documents greater than 3
  let results = await db.collection("country_one").aggregate([
  ]).toArray()

  results.forEach((object, i) => {
    object.id = i;
    object.value = object["language_count"]
  });
  return json(results)
}

async function languagesByCountries() {
  const db = mongoClient.db("world")

  //FIXME 21: Fix the pagination for the city
  let results = await db.collection("country_one").aggregate(
    [
    ]
  ).toArray()

  results.forEach((object, i) => {
    object.id = i;
    object.value = object["country_count"]
  });
  return json(results)
}