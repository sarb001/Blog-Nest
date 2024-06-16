
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { env } from "hono/adapter";
import { sign  } from 'hono/jwt' ;
import { UserValidation } from '../types';

const app = new Hono();

app.get('/' , async(c) => {
	const { DATABASE_URL }  = env<{  DATABASE_URL : string}>(c);
	console.log('Databse URL1 =', DATABASE_URL);

	return c.text('Fetchign Yess All')
})


app.post('/signup' , async(c) => {

	const { DATABASE_URL , PRIVATE_KEY }  = env<{  DATABASE_URL : string ,PRIVATE_KEY : string }>(c);
	
	const prisma = new   PrismaClient({
		datasourceUrl : DATABASE_URL
	 }).$extends(withAccelerate());

	const Body = await c.req.json();
	console.log('Body =',Body);

	const ParsedResponse = UserValidation.safeParse(Body);
	
	if(!ParsedResponse.success){
	 	c.json({
			msg : "You sent the wrong inputs",
			errors: ParsedResponse.error.issues
		})
		return;
	}


	const response = await prisma.user.create({
		 data : {
			name :ParsedResponse?.data?.name , 
			email : ParsedResponse?.data?.email,
			password: ParsedResponse?.data?.password
		 }
	})

	// create token 
	const privatekey = PRIVATE_KEY;
	console.log('key is=',privatekey);

	const token = await sign({
		sub : Body?.name,
		exp : Date.now() + 60 * 5
	}, privatekey);
	console.log('token is ==',token);

	return c.json({
		msg:"User Signed Up",
		response
	});

})


// // signup route
// // login 
// // logout 
// // auth route

export  default app;
