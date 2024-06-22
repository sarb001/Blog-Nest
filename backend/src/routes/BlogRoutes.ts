import { PrismaClient } from '@prisma/client/edge';
import { Hono } from 'hono';
import { BlogValidation, UserSignup , UserValidation } from 'common-types-users';
import { verify } from 'hono/jwt';
import { withAccelerate } from '@prisma/extension-accelerate';
 
export const BlogRouter = new Hono<{
    Bindings : {
        DATABASE_URL :string,
        PRIVATE_KEY : string
    },
    Variables : {
        userid : string
    }
}>();

// Middleware 
BlogRouter.use('/*' , async(c,next) => {
    const jwt  = c.req.header('Authorization');
	console.log('token is==',jwt);

	if(!jwt){
		return c.json({ msg: "UnAuthorized"})
	}

	const Privatekey = c.env.PRIVATE_KEY;
	const user = await verify(jwt,Privatekey);
	console.log('user is =',user);
	
	if(!user){
		return c.json({
			msg : "User not Present"
		})
	}else{
        c.set("jwtPayload",user?.id)
		return next();
	}
})

BlogRouter.post('/createblog' , async(c) => {
	const prisma = new  PrismaClient({
		datasourceUrl : c.env.DATABASE_URL
	 }).$extends(withAccelerate());

	 const userid = c.get('jwtPayload');
	 console.log('getUserid =',userid);

	const Body = await c.req.json();
	const ParsedResponse = BlogValidation.safeParse(Body);
	
	if(!ParsedResponse.success){
	 	c.json({ msg : "You sent the wrong inputs", errors: ParsedResponse.error.issues})
		return;
	}

	const response = await prisma.blogs.create({
		data : {
			Blogid: userid,
			title : ParsedResponse?.data.title,
			description : ParsedResponse?.data.description,
		}
	});
	return c.json({response})

})

BlogRouter.get('/bulk' , async(c) => {
	const prisma = new  PrismaClient({
		datasourceUrl : c.env.DATABASE_URL
	 }).$extends(withAccelerate());

	 const AllBlogs = await prisma.blogs.findMany({
			select : {
				id : true,
				title : true,
				imageUrl : true,
				description : true,
				comment : true,
				Blogid : true,
				publishedDate : true,
				author :{
					select : {
						name :true
					}
				}
			}
	 });
	 console.log('all Blogs =',AllBlogs);

	 return c.json({
		msg: "All Blogs  Fetched",
		AllBlogs
	 })
})

// Edit the Blog 
BlogRouter.put('/' , async(c) => {

	const prisma = new  PrismaClient({
		datasourceUrl : c.env.DATABASE_URL
	 }).$extends(withAccelerate());

	const Body = await c.req.json();
	const ParsedResponse = BlogValidation.safeParse(Body);
	console.log('Parsed Bodyis =',ParsedResponse);
	
	if(!ParsedResponse.success){
	 	c.json({ msg : "You sent the wrong inputs", errors: ParsedResponse.error.issues})
		return;
	}

	const updateblog = await prisma.blogs.update({
		where : {
			id : Body?.id
		},
		data : {
			title : ParsedResponse?.data?.title,
			description : ParsedResponse?.data?.description,
		}
	});
	console.log('updated user= ',updateblog);

	return c.json({id : updateblog?.id})

});

// Fetch Single Blog 
BlogRouter.get('/:id' , async(c) => {
	const Userid =  c.req.param('id');
	console.log('userid =',Userid);
	const prisma = new  PrismaClient({
		datasourceUrl : c.env.DATABASE_URL
	 }).$extends(withAccelerate());

	const blog = await prisma.blogs.findUnique({
		where :{
			id : Number(Userid)
		},
		select: {
			id : true,
			title : true,
			imageUrl : true,
			description : true,
			Blogid : true,
			publishedDate : true,
			author: {
				select: {
					name :true
				}
			}
		}
	});

	return c.json({
		blog : blog
	})

});

// Delete the Blog Specific  Npw 
BlogRouter.delete('/:id' , async(c) => {
	const Userid =  c.req.param('id');
	console.log('userid =',Userid);

	const userid = c.get('jwtPayload');
	console.log('getUserid =',userid);

	const prisma = new  PrismaClient({
		datasourceUrl : c.env.DATABASE_URL
	 }).$extends(withAccelerate());

	 try {
	
		const blog = await prisma.blogs.delete({
			where :{
				id : Number(Userid)
			},
			select: {
				id : true,
				title : true,
				imageUrl : true,
				description : true,
				Blogid : true,
				publishedDate : true,
				author: {
					select: {
						name :true,
						id : true
					}
				}
			}
		});

	 console.log('blog is ==',blog);
	 if(blog?.author?.id === userid){
		return c.json({
			blog : blog,
			msg : "Authoried to  Delete Post"
		})
	 }else{
		 return c.json({
			msg : "Not Authoried to  Delete Post"
		 })
	 }
	 	
	} catch (error) {
			console.log('error while Deleting =',error);
	}

});


// Post Comment to  Specific Blog 
BlogRouter.post('/comment/:id' , async(c) => {
	try {
		// find  user's blog 
		const userid =  c.req.param('id');
		console.log('useriddddd =',userid);

		const Insertedcomment = await c.req.json();
		console.log('comment is =',Insertedcomment);

		const prisma = new  PrismaClient({
			datasourceUrl : c.env.DATABASE_URL
		 }).$extends(withAccelerate());	
	
		
		const maincomment = await prisma.comment.create({
				data : {
					content : Insertedcomment?.content,
					userid  : Number(userid)
				}
		})
		console.log('comment datas =',maincomment);

		//add comment by logged in ( with token)
	} catch (error) {
		console.log(' post error = ',error);
	}
})


// Get All Comment to  Specific Blog 

BlogRouter.get('/comment/:id' , async(c) => {
	try {

		const paramsid =  c.req.param('id');	// specific blog 
		console.log('userid =',paramsid);

		const prisma = new  PrismaClient({
			datasourceUrl : c.env.DATABASE_URL
		 }).$extends(withAccelerate());	
	
		const SpecificComment = await prisma.blogs.findMany({
			where :{
				id : Number(paramsid)		// blog id
			},
			select: {
				publishedDate : true,
				comment : true,
				author: {
					select: {
						name :true			// author name 
					}
				}
			}
		});

		console.log('Blogs Comment  =',SpecificComment);
		return c.json({
			msg : "Specific Comments ",
			SpecificComment
		})

	} catch (error) {
		console.log(' post error = ',error);
	}
})