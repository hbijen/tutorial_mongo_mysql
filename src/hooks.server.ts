import client from '$lib/db/mongo';
import { isMongo } from '$lib/db/usedb';

if (isMongo) {
    client.connect().then((): void => {
        console.log("MongoDB started");
    }).catch((e) => {
        console.log("MongoDB failed to start");
        console.log(e);
    });
} else {
    console.log("Using MySQL!");
}