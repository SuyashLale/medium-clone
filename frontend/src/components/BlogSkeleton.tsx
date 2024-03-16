import { Circle } from "./BlogCard";

export const BlogSkeleton = () => {
    return (
        <div role="status" className="max-w-sm animate-pulse">
            <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-lg cursor-pointer">
                <div className="flex">
                    <div className="">
                        <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                    </div>
                    <div className="flex flex-col justify-center font-extralight pl-2 text-sm">
                        <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
                        <div className="flex flex-col justify-center px-2">
                            <Circle />
                        </div>
                        <div className="flex flex-col justify-center text-slate-400 text-sm">
                            <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
                        </div>
                        <div className="text-xl font-semibold pt-2">
                            <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
                            <div className="text-md font-thin pt-4">
                                <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
                                <div className="text-slate-400 text-sm font-500">
                                    <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
