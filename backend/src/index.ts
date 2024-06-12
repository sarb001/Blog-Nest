import { Hono } from "hono";
import { env } from "hono/adapter";

const app = new Hono();


app.get('/' , async(c) => {

	const { DATABASE_URL }  = env<{  DATABASE_URL : string}>(c);
	console.log('Databse URL1 =', DATABASE_URL);

	return c.text('Fetchign Yess All')
})


// signup route
// login 
// logout 
// auth route




export  default app;