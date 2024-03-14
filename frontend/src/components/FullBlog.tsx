import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-10 w-full pt-10 max-w-screen-2xl">
                    <div className="col-span-8">
                        <div className="text-5xl font-extrabold pt-10">
                            {blog.title}
                        </div>
                        <div className="text-slate-500 pt-2">
                            Posted on March 14 2024
                        </div>
                        <div className="pt-4">{blog.content}</div>
                    </div>
                    <div className="col-span-4 text-slate-700 text-lg">
                        Author
                        <div className="flex w-full">
                            <div className="pr-4 flex flex-col justify-center">
                                <Avatar name={blog.author.name} size={10} />
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="text-2xl font-bold">
                                    {blog.author.name}
                                </div>
                                <div className="pt-2 text-slate-400">
                                    Random catch-phrase about the author to grab
                                    the user's attention
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
