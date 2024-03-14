import { ChangeEvent, useState } from "react";
import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    return (
        <div>
            <Appbar />
            <div className="flex justify-center mt-20">
                <div className="max-w-screen-lg w-full">
                    <div className="flex flex-col justify-center">
                        <input
                            type="text"
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Title"
                        />
                        <TextEditor
                            onChange={(e) => {
                                setContent(e.target.value);
                            }}
                        />
                        <button
                            type="submit"
                            onClick={async () => {
                                const response = await axios.post(
                                    `${BACKEND_URL}/api/v1/blog`,
                                    {
                                        title: title,
                                        content: content,
                                    },
                                    {
                                        headers: {
                                            Authorization:
                                                localStorage.getItem("token"),
                                        },
                                    }
                                );
                                navigate(`/blog/${response.data.id}`);
                            }}
                            className="items-center mt-8 px-5 py-2.5 text-sm font-medium text-center text-white rounded-lg focus:ring-4 bg-green-700 hover:bg-green-800 focus:ring-green-300"
                        >
                            Publish post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

function TextEditor({
    onChange,
}: {
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
    return (
        <div>
            <textarea
                id="message"
                onChange={onChange}
                rows={10}
                className="block mt-8 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your thoughts here..."
            ></textarea>
        </div>
    );
}
