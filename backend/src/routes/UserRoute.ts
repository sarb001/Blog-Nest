import { Hono } from 'hono';
import { UserSignup , UserValidation } from 'common-types-users';
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { env } from "hono/adapter";
import { sign ,verify } from 'hono/jwt' ; 

type Bindingsts = {
    	DATABASE_URL :string,
    	PRIVATE_KEY : string
}
    
export const userRouter = new Hono<{
        Bindings : Bindingsts
}>();


userRouter.post('/signup' , async(c) => {
	const prisma = new  PrismaClient({
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

userRouter.post('/login' , async(c) => {

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
	return c.json({token});

})