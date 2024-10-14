import React from "react";
import { Link } from "react-router-dom";
export const Landing = () => {
    return <div className="h-screen flex justify-center bg-slate-300"> 
        <div className="flex flex-col justify-center text-5xl font-bold text-fuchsia-800">
            {"Log in to see the other side of this website..."}
            <Link className="text-xl underline pt-5 font-semibold ml-72 w-max text-yellow-950 shadow hover:text-yellow-900" to={"/signup"}>{"SignUp, If you don't have an account."}</Link>
            <Link className="text-xl underline pt-1 font-semibold ml-72 w-max text-red-500 shadow hover:text-red-700" to={"/signin"}>{"SignIn, If you already have an account."}</Link>
        </div>
    </div>
}