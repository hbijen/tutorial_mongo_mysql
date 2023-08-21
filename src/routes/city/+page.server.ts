import  mongoClient from "$lib/db/mongo";
import { ObjectId } from "mongodb";

export async function load() {

  return mongoLoad()

}

async function mongoLoad() {
  try {
    const db = mongoClient.db("world")

    //FIXME 6: get the first 10 cities
    let results = await db.collection("country_one").aggregate([

    ]).toArray()

    results.forEach((object) => {
      object.id = new ObjectId();
    });

    console.log("results ", results)

    //FIXME 7: return the total count of all the cities
    var total_count = 100; 
    let count_result = await db.collection("country_one").aggregate([

    ]).toArray()

    total_count = count_result[0].city_count
    console.log("aggregate result ", count_result)

    return {data: JSON.parse(JSON.stringify(results)), total_count: total_count}
  } catch (error) {
    console.log(error);
    return error;
  }
}

