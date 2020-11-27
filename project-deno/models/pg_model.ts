import { Client } from 'https://deno.land/x/postgres/mod.ts';
import { QueryResult, QueryConfig } from 'https://deno.land/x/postgres/query.ts';

const client = new Client({
    user : "postgres",
    hostname : "localhost",
    port : 5432,
    password : "1234",
    database : "BB_Blog"
});

export async function select(qry : QueryConfig):Promise<any[]>{
    let tables : any = [];
    try {
        await client.connect();
        let hasil : QueryResult = await client.query(qry);
        tables = hasil.rowsOfObjects();
        await client.end();
    } catch(error) {
        console.log(error);
    }
    return tables; 
}

export async function multiSelect(qry: any){
    let tables : any = [];
    try {
        await client.connect();
        let hasil : QueryResult[] = await client.multiQuery(qry);
        await client.end();

        hasil.forEach((obj) => {
            tables.push(obj.rowsOfObjects() );
        });
    } catch(error){
        console.log(error);
    }
    return tables;
}