import  mongoClient from "$lib/db/mongo";

export async function load() {

  return mongoLoad()

}

async function mongoLoad() {
  try {
    const db = mongoClient.db("world")

    //FIXME 9: get first 20 country records 
    // sorted by population in descending order
    // Fetch only required fields
    let results = await db.collection("country_one").aggregate([

    ]).toArray()

    console.log("results ", results)

    return {data: JSON.parse(JSON.stringify(results))}
  } catch (error) {
    console.log(error);
    return error;
  }
}

