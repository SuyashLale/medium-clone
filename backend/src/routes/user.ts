import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signupInput } from "@suyashlale/medium-common";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    };
}>();

userRouter.post("/signup", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // Get the body from the context.
    const body = await c.req.json();

    // Safe Parse the request body
    const { success } = signupInput.safeParse(body);

    // Check if the input validation passed, else return error
    if (!success) {
        c.status(411);
        return c.json({
            message: "Input validation failed",
        });
    }

    try {
        // Create the user record
        const user = await prisma.user.create({
            data: {
                email: body.username,
                password: body.password,
            },
        });

        // Create the JWT token to be sent back to the user
        const token = await sign({ id: user.id }, c.env.JWT_SECRET);

        c.status(200);
        return c.json({
            jwt: token,
        });
    } catch (e) {
        console.log("Error while signing up", e);
        c.status(403);
        return c.json({
            error: "Error while signing up",
        });
    }
});

userRouter.post("/signin", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // Get the request body
    const body = await c.req.json();

    // Safe Parse the request body
    const { success } = signupInput.safeParse(body);

    // Check if the input validation passed, else return error
    if (!success) {
        c.status(411);
        return c.json({
            message: "Input validation failed",
        });
    }

    try {
        // Get the email, pwd from the user in the body and check in DB
        const user = await prisma.user.findUnique({
            where: {
                email: body.username,
                password: body.password,
            },
        });

        if (!user) {
            c.status(403);
            return c.json({
                error: "Unauthorized",
            });
        }

        // Generate the JWT token
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        c.status(200);
        return c.json({
            jwt,
        });
    } catch (e) {
        console.log("Error in sign in route", e);
        c.status(403);
        return c.json({
            error: "Error in sign in route",
        });
    }
});
