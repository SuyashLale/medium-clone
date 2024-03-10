import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify, decode } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // Get the body from the context.
  const body = await c.req.json();

  try {
    const dbLookup = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (dbLookup) {
      c.status(411);
      return c.json({
        error: "Email already taken",
      });
    }

    // Create the user record
    const user = await prisma.user.create({
      data: {
        email: body.email,
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

app.post("/api/v1/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // Get the request body
  const body = await c.req.json();

  try {
    // Get the email, pwd from the user in the body and check in DB
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({
        error: "Incorrect credentials. No user found",
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

app.post("api/v1/blog)", (c) => {
  return c.text("Create blog route");
});

app.put("/api/v1/blog", (c) => {
  return c.text("Update blog route");
});

app.get("/api/v1/blog/:id", (c) => {
  return c.text("Get a particular blog");
});

export default app;
