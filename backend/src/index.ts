
import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { env } from "hono/adapter";
import { sign ,verify } from 'hono/jwt' ;
import { UserSignup , UserValidation } from '../types';
import { userRouter } from "./routes/UserRoute";
import { BlogRouter } from "./routes/BlogRoutes";

type Bindingsts = {
	DATABASE_URL :string,
	PRIVATE_KEY : string
}

const app = new Hono<{Bindings : Bindingsts}>();

app.route('/api/v1/user',userRouter);

app.route('/api/v1/blog',BlogRouter);



export  default app;
