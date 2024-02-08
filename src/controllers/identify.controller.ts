import { pgClient } from "../db";
import {Client} from "pg";

export const identify = async (req:any,res:any) => {
    const client: Client = await  pgClient();
    const result = await client.query("select * from contact")
    res.status(200).json({data:result.rows})
}