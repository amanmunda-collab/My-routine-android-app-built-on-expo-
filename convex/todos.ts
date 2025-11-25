import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

// get all rows
export const getTodos = query({
    args: {},
    handler: async (ctx) => {
        const todos = await ctx.db.query("todos").order("desc").collect();
        return todos;
    },
});// first patameter is args but it can be empty 





// add a task row  and return the id of the row 
export const addTodo = mutation({
    args: { text: v.string() },
    handler: async (ctx, args) => {
        const toDoId = await ctx.db.insert("todos", {
            text: args.text,
            isCompleted: false,
        });

        return toDoId;

    }
});



// toggle todo --> to toggle that a task is completed
export const toggleToDo = mutation({
    args: { id: v.id("todos") },
    handler: async (ctx, args) => {
        const todo = await ctx.db.get(args.id)

        await ctx.db.patch(args.id, { isCompleted: !todo?.isCompleted })
    }
});

// delete a todo

export const deleteToDo = mutation({
    args: { id: v.id("todos") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id)
    }
});


/// update a todo 

export const updateToDo = mutation({
    args: {
        id: v.id("todos"),
        text: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {
            text: args.text,
        })
    }
});

// clear all todos 
export const clearAllToDo = mutation({
    handler: async (ctx) => {
        const todos = await ctx.db.query("todos").collect();
        for (const todo of todos) {
            await ctx.db.delete(todo._id);
        }
        return { deleteCount: todos.length }

    }
});