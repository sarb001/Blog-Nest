
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
	return c.json({
		token  : token
	});

})

userRouter.get('/me' ,async(c) => {

	const jwtheader = c.req.header("Authorization");
	console.log('jwtheader =',jwtheader);

	if(!jwtheader){
		return c.json({ msg: "UnAuthorized"})
	}

	const user = await verify(jwtheader,c.env.PRIVATE_KEY);
	console.log('user is =',user);

	try {
		const prisma = new  PrismaClient({
			datasourceUrl : c.env.DATABASE_URL
		 }).$extends(withAccelerate());

		 const mainuser = await prisma.user.findUnique({
				where : {
					id : Number(user?.id)
				},
				select :{
					email :true,
					name : true
				}
		 })

		 console.log('user profile =',mainuser);
		 return c.json({
			mainuser
		 })

	} catch (error) {	
		console.log('error =',error);
	}
})