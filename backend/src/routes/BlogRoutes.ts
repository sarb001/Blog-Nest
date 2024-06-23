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

	const response = await prisma.post.create({
		data : {
			userId: userid,
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

	 const AllBlogs = await prisma.post.findMany({
			select : {
				id : true,
				title : true,
				imageUrl : true,
				description : true,
				userId : true,
				publishedDate : true,
				user :{
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

	const updateblog = await prisma.post.update({
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

	const blog = await prisma.post.findUnique({
		where :{
			id : Number(Userid)
		},
		select: {
			id : true,
			title : true,
			imageUrl : true,
			description : true,
			userId : true,
			publishedDate : true,
			user: {
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
	const Blogid =  c.req.param('id');
	console.log('Blogid here =',Blogid);

	const userid = c.get('jwtPayload');
	console.log('getUserid =',userid);

	const prisma = new  PrismaClient({
		datasourceUrl : c.env.DATABASE_URL
	 }).$extends(withAccelerate());

		try {
				const blog = await prisma.post.findUnique({
						where :{
							id : Number(Blogid)
						},
						select: {
							user: {
								select: {
									id : true
								}
							}
						}
				});

  	    if(!blog)return c.json({msg : " Blog not Found "})


		if(blog?.user.id === userid){			 // logged user == same uploader
			
		const blog = await prisma.post.delete({
				where :{
					id : Number(Blogid)
				},
		});

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
		const postid =  c.req.param('id');				// 16  jasveer id 
		console.log('postid iss =',postid);

		const Insertedcomment = await c.req.json();			// dferv
		console.log('comment is =',Insertedcomment);

		const userid = c.get('jwtPayload');
		console.log('user id=',userid);

		const prisma = new  PrismaClient({
			datasourceUrl : c.env.DATABASE_URL
		 }).$extends(withAccelerate());	
		
		const maincomment = await prisma.comment.create({
				data : {
					content : Insertedcomment?.content,
					postId : Number(postid),
					userId : Number(userid)
				}
		})
		console.log('comment datas =',maincomment);
		return c.json({
			msg : "Comment On Post",
			maincomment
		})

	} catch (error) {
		console.log(' post error = ',error);
	}
})


// Get All Comment to  Specific Blog 

BlogRouter.get('/comment/:id' , async(c) => {
	try {

		const postid =  c.req.param('id');	// specific blog 
		console.log('Params id =',postid);

		const userid = c.get('jwtPayload');		// login id guest 
		console.log('user id=',userid);

		const prisma = new  PrismaClient({
			datasourceUrl : c.env.DATABASE_URL
		 }).$extends(withAccelerate());	

		const comment = await prisma.comment.findMany({
			where :{
				postId : Number(postid)		
			},
			select: {
				content : true,
				user: {
					select: {
						name :true			// author name 
					}
				}
			}
		});

		console.log('Blogs Comment  =',comment);
		return c.json({
			comment
		})

	} catch (error) {
		console.log(' post error = ',error);
	}
})