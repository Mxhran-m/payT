import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const Signin = () => {
    return <div className="h-screen flex justify-center bg-slate-300">
        <div className="flex flex-col justify-center">
            <div className="bg-white w-80 rounded-lg text-center p-2 px-4 w-max">
                <Heading label={"Sign In"}/>
                <SubHeading label={"Enter email and password to sign in"}/>
                <InputBox label={"Email"} placeholder={"Enter email"} />
                <InputBox label={"Email"} placeholder={"password"} />
                <div className="pt-4">
                    <Button label={"Sign In"} />
                </div>
                <BottomWarning label={"Don't have an account?"} to={"/Signup"} buttonText={"Sign up"}/>
            </div>
        </div>
    </div>
}