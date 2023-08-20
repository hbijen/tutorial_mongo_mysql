import client from '$lib/db/mongo';

client.connect().then(():void => {
    console.log("MongoDB started");
}).catch((e) => {
    console.log("MongoDB failed to start");
    console.log(e);
});