import  mongoClient from "$lib/db/mongo";

export async function load() {

  return mongoLoad()

}

async function mongoLoad() {
  try {
    const db = mongoClient.db("world")

    //FIXME 1: get first 10 country records (limit)
    //FIXME 2: fetch only the fields that are displayed on the UI (projection)
    let results = await db.collection("country_one").find({}).toArray()

    results.forEach((object) => {
      object.id = object._id.toJSON();
    });    

    return {data: JSON.parse(JSON.stringify(results))}
  } catch (error) {
    console.log(error);
    return error;
  }
}

