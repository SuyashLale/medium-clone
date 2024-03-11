import z from "zod";

// For backend consumption

// SignUp Input
export const signupInput = z.object({
  username: z.string().email(),
  password: z.string().min(4),
  name: z.string().optional(),
});

// SignIn Input
export const signinInput = z.object({
  username: z.string().email(),
  password: z.string().min(4),
});

// CreateBlog Input
export const createBlogInput = z.object({
  title: z.string(),
  content: z.string(),
});

// UpdateBlog Input
export const updateBlogInput = z.object({
  id: z.string(),
  title: z.string().optional(),
  content: z.string().optional(),
});

// For Frontend Consumption

// SignUp Input
export type SignUpInput = z.infer<typeof signupInput>;
// SignIn Input
export type SignInInput = z.infer<typeof signupInput>;
// CreateBlog Input
export type CreateBlogInput = z.infer<typeof createBlogInput>;
// UpdateBlog Input
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
