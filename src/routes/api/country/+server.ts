import { mysqlconn } from "$lib/db/mysql";
import { error, json } from '@sveltejs/kit';
import type { RequestHandler, RequestEvent } from './$types';

export const GET: RequestHandler = async ({ url }) => {    

    let results = await mysqlconn.query('select * from country')
                        .then(function([rows, fields]) {
                            console.log(rows, fields)
                            return rows;
                        });
    return json(results)
}

export async function POST( { request } : RequestEvent ) {
    const { st } = await request.json();
    let results = await mysqlconn
      .query("SELECT * FROM states where state = '" + st + "'")
      .then(function ([rows, fields]) {
        console.log(rows, fields)
        return rows;
      });
  
    return json(results);
}