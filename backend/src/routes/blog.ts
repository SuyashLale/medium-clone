import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@suyashlale/medium-common";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    authorId: string;
  };
}>();

// All blog routes will be protected. Hence need to be wrapped with the Auth MW
blogRouter.use("/*", async (c, next) => {
  try {
    // Get and verify the header info
    const header = c.req.header("authorization") || undefined;

    if (!header) {
      c.status(403);
      return c.json({
        error: "No request header found for auth",
      });
    }

    // If header info correct, call next handler
    // If not, return a 403

    const response = await verify(header, c.env.JWT_SECRET);
    if (response) {
      // since we signed the token with "id"

      // Set the user ID
      c.set("authorId", response.id);

      await next();
    } else {
      c.status(403);
      return c.json({
        error: "unauthorized",
      });
    }
  } catch (e) {
    console.log("Error in the auth MW", e);
    c.status(500);
    return c.json({
      error: "Error in the Auth MW",
    });
  }
});

// Endpoint: Create Blog/Post
blogRouter.post("/", async (c) => {
  try {
    // Parse Body
    const body = await c.req.json();

    // Request Body Validation
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({
        message: "Invalid inputs for creating a blog post",
      });
    }

    // Create prisma client so that DB coomms can be done
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // Insert the new blog in the DB
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: c.get("authorId"),
      },
    });
    return c.json({
      id: blog.id,
    });
  } catch (e) {
    console.log("Error in create blog route", e);
    c.status(500);
    return c.json({
      error: "Error in create blog route",
    });
  }
});

// Endpoint: Update a blog/post
blogRouter.put("/", async (c) => {
  try {
    // Parse the body
    const body = await c.req.json();

    // Requat body validation
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({
        message: "Invalid inputs for updating blog post",
      });
    }

    // Create the Prisma client
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // Update the blog in the DB
    const blog = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    // Return
    return c.json({
      id: blog.id,
    });
  } catch (e) {
    console.log("Error in update blog route", e);
    c.status(500);
    return c.json({
      error: "Error in the update blog route",
    });
  }
});

// Todo: Add pagination
blogRouter.get("/bulk", async (c) => {
  try {
    // Create prisma client
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // Get all blogs from the DB
    const blogs = await prisma.post.findMany();

    // Return
    return c.json({
      blogs,
    });
  } catch (e) {
    console.log("Error in getting all blogs", e);
    c.status(500);
    return c.json({
      error: "Error in getting all blogs.",
    });
  }
});

blogRouter.get("/:id", async (c) => {
  try {
    // Parse the params
    const id = c.req.param("id");

    // Create the prisma client
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // Get the blog from the DB
    const blog = await prisma.post.findFirst({
      where: {
        id,
      },
    });

    // Return
    return c.json({
      blog,
    });
  } catch (e) {
    console.log("Error in get blog route", e);
    c.status(500);
    return c.json({
      error: "Error in get blog route",
    });
  }
});
