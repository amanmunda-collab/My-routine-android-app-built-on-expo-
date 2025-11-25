// for creating schema for the table 
import {defineSchema,defineTable} from "convex/server";
import {v} from "convex/values";

export default defineSchema(
    {
        todos:defineTable({
            text:v.string(),
            isCompleted:v.boolean() 
        })
    }
);