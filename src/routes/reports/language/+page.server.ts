import mongoClient from "$lib/db/mongo";

export async function load() {

  return mongoLoad()

}

async function mongoLoad() {
  try {
    const db = mongoClient.db("world")

    // FIXME 17: find all the countries with following conditions
    // 1. return only the name and id
    // 2. sort it by name ascending
    let results = await db.collection("country_one")
      .find().toArray()

    console.log("results ", results)

    return { data: JSON.parse(JSON.stringify(results)) }
  } catch (error) {
    console.log(error);
    return error;
  }
}

