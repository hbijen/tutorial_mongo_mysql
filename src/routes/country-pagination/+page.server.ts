import  mongoClient from "$lib/db/mongo";


const projection = {
  Name: 1,
  Continent: 1,
  Population: 1,
  SurfaceArea: 1
}

export async function load() {

  return mongoLoad()

}

async function mongoLoad() {
  try {
    const db = mongoClient.db("world")

    let results = await db.collection("country_one").find({}, {
      projection: projection,
      limit: 10
    }).toArray()

    results.forEach((object) => {
      object.id = object._id.toJSON();
    });

    //FIXME 3: return the total count of the country collection
    var total_count = 100; 
    let result = await db.collection("country_one").aggregate([
    ]).toArray()

    total_count = result[0].country_count
    console.log("aggregate result ", result)

    return {data: JSON.parse(JSON.stringify(results)), total_count: total_count}
  } catch (error) {
    console.log(error);
    return error;
  }
}

