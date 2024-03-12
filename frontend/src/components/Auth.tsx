/* eslint-disable @typescript-eslint/no-unused-vars */
import { SignUpInput } from "@suyashlale/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    // type: input prop; the second type is the type in TS
    // Component State
    const [postInputs, setPostInputs] = useState<SignUpInput>({
        name: "",
        username: "",
        password: "",
    });

    // Use navigate hook
    const navigate = useNavigate();

    // Send the backend request here to sign in/ sign up the user
    async function sendRequest() {
        try {
            // Send request here
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/${
                    type === "signup" ? "signup" : "signin"
                }`,
                postInputs
            );

            // API responds with JWT
            const jwt = response.data;

            // Store the JWT in the localStorage
            localStorage.setItem("token", jwt.jwt);

            // Navigate the user to the post/blog page
            navigate("/blogs");
        } catch (e) {
            // alert the user here that the request has failed
        }
    }

    return (
        <div className="flex flex-col justify-center h-screen">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-4xl font-extrabold">
                            {type === "signup" ? "Create an account" : "Login"}
                        </div>
                        <div className="text-slate-400">
                            {type === "signup"
                                ? "Already have an account?"
                                : "Don't have an account?"}
                            <Link
                                className="pl-2 underline"
                                to={type === "signup" ? "/signin" : "/signup"}
                            >
                                {type === "signup" ? "Log in" : "Sign Up"}
                            </Link>
                        </div>
                    </div>
                    <div className="pt-8">
                        {type === "signup" ? (
                            <LabelledInput
                                label="Name"
                                placeholder="Suyash Lale..."
                                onChange={(e) => {
                                    setPostInputs((c) => ({
                                        ...c, // c -> current value of the postInputs object
                                        name: e.target.value,
                                    }));
                                }}
                            />
                        ) : null}
                        <LabelledInput
                            label="Username"
                            placeholder="Enter your email..."
                            type="email"
                            onChange={(e) => {
                                setPostInputs((c) => ({
                                    ...c, // c -> current value of the postInputs object
                                    username: e.target.value,
                                }));
                            }}
                        />
                        <LabelledInput
                            label="Password"
                            placeholder="Enter you password..."
                            type="password"
                            onChange={(e) => {
                                setPostInputs((c) => ({
                                    ...c, // c -> current value of the postInputs object
                                    password: e.target.value,
                                }));
                            }}
                        />
                        <button
                            type="button"
                            onClick={sendRequest}
                            className="w-full mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                        >
                            {type === "signup" ? "Sign Up" : "Sign In"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface LabelledInputType {
    label: string;
    placeholder: string;
    type?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({
    label,
    placeholder,
    onChange,
    type,
}: LabelledInputType) {
    return (
        <div>
            <div>
                <label className="block mb-2 text-sm font-semibold text-gray-900">
                    {label}
                </label>
                <input
                    type={type || "text"}
                    id="first_name"
                    onChange={onChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
                    placeholder={placeholder}
                    required
                />
            </div>
        </div>
    );
}
