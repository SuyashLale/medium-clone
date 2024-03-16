import { Link } from "react-router-dom";

interface BlogCardProps {
    id: string;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate,
}: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`}>
            <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
                <div className="flex">
                    <Avatar name={authorName} size={6} />
                    <div className="flex flex-col justify-center font-extralight pl-2 text-sm">
                        {authorName}
                    </div>
                    <div className="flex flex-col justify-center px-2">
                        <Circle />
                    </div>
                    <div className="flex flex-col justify-center text-slate-400 text-sm">
                        {publishedDate}
                    </div>
                </div>
                <div className="text-xl font-semibold pt-2">{title}</div>
                <div className="text-md font-thin pt-4">
                    {content.slice(0, 500) + "..."}
                </div>
                <div className="text-slate-400 text-sm font-500">{`${Math.ceil(
                    content.length / 100
                )} min read`}</div>
            </div>
        </Link>
    );
};

export function Avatar({ name, size }: { name: string; size: number }) {
    return (
        <div
            className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 w-${size} h-${size}`}
        >
            <span className="font-medium text-gray-600 dark:text-gray-300 text-sm">
                {name[0]}
            </span>
        </div>
    );
}

export function Circle() {
    return <div className="w-1 h-1 bg-slate-500 rounded-full"></div>;
}
