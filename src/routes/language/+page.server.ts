import  mongoClient from "$lib/db/mongo";
import { ObjectId } from "mongodb";

export async function load() {

  return mongoLoad()

}

async function mongoLoad() {
  try {
    const db = mongoClient.db("world")

    //FIXME 19: Official Language of each country sorted by Continent and Name
    let results = await db.collection("country_one").aggregate([

    ]).toArray()

    results.forEach((object, i) => {
      object.id = i;
    });    

    return {data: JSON.parse(JSON.stringify(results))}
  } catch (error) {
    console.log(error);
    return error;
  }
}

