import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const Signup = () => {
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 w-max px-4">
                        <Heading label={"Sign Up"} />
                        <SubHeading label={"Enter your information to create account"}/>
                        <InputBox onChange={(e) => { setusername(e.target.value); }}  label={"Email"} placeholder={"example@gmail.com"}/>
                        <InputBox onChange={(e) => { setfirstName(e.target.value); }} label={"First Name"} placeholder={"Jon"}/>
                        <InputBox onChange={(e) => { setlastName(e.target.value); }} label={"Last Name"} placeholder={"Doe"}/>
                        <InputBox onChange={(e) => { setpassword(e.target.value); }} label={"Password"} placeholder={"Password"}/>
                        <div className="pt-4">
                            <Button onClick={async () => { 
                                const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                                    username,
                                    firstName,
                                    lastName,
                                    password
                                })
                                localStorage.setItem("token", response.data.token)
                                navigate("/dashboard")
                            }} label={"Sign Up"}/>
                        </div>
                        <BottomWarning label={"Already have an account?"} buttonText={"Sign In"} to={"/Signin"}/>
                </div>
        </div>
    </div>
}