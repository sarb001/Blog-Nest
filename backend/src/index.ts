
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { env } from "hono/adapter";
import { sign  } from 'hono/jwt' ;
import { UserSignup , UserValidation } from '../types';

type Bindingsts = {
	DATABASE_URL :string,
	PRIVATE_KEY : string
}


const app = new Hono<{Bindings : Bindingsts}>();

app.get('/' , async(c) => {

	console.log('Databse URL1 =', c.env.DATABASE_URL);

	return c.text('Fetchign Yess All')
})


app.post('/signup' , async(c) => {

	const prisma = new   PrismaClient({
		datasourceUrl : c.env.DATABASE_URL
	 }).$extends(withAccelerate());

	const Body = await c.req.json();
	const ParsedResponse = UserSignup.safeParse(Body);
	
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

	const privatekey = c.env.PRIVATE_KEY;
	console.log('key is=',privatekey);

	const token = await sign({ id : response?.id }, privatekey);
	console.log('token is ==',token);
	return c.json({msg:"User Signed Up",response});

})

app.post('/login' , async(c) => {

	const prisma = new   PrismaClient({
		datasourceUrl : c.env.DATABASE_URL
	 }).$extends(withAccelerate());

	const Body = await c.req.json();		// => email password
	const ParsedResponse = UserValidation.safeParse(Body);
		
	if(!ParsedResponse.success){
		return c.json({
		   msg : "You sent the wrong inputs",
		   errors: ParsedResponse.error.issues
	   })
    }

	const FindUser = await prisma.user.findUnique({
		where  : {
			email : ParsedResponse?.data.email
		}
	})

	if(!FindUser){ return c.json({ msg: "User Not Existed"})}

	console.log('findUser',FindUser);
	const privatekey = c.env.PRIVATE_KEY;
	
	const token = await sign({ id : FindUser?.id }, privatekey);
	console.log('token is ==',token);
	return c.json({msg:"User Logged In",FindUser});

})


// // signup route
// // login 
// // logout 
// // auth route

export  default app;
