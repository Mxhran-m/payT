import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export const Signin = () => {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const navigate = useNavigate()
    return <div className="h-screen flex justify-center bg-slate-300">
        <div className="flex flex-col justify-center">
            <div className="bg-white w-80 rounded-lg text-center p-2 px-4 w-max">
                <Heading label={"Sign In"}/>
                <SubHeading label={"Enter email and password to sign in"}/>
                <InputBox onChange={(e) => { setusername(e.target.value); }} label={"Email"} placeholder={"Enter email"} />
                <InputBox onChange={(e) => { setpassword(e.target.value); }} label={"password"} placeholder={"password"} />
                <div className="pt-4">
                    <Button onClick={
                       async () => {
                            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                                username,
                                password
                            })
                            localStorage.setItem("token", response.data.token)
                            navigate("/dashboard")
                        }} label={"Sign In"} />
                </div>
                <BottomWarning label={"Don't have an account?"} to={"/Signup"} buttonText={"Sign up"}/>
            </div>
        </div>
    </div>
}