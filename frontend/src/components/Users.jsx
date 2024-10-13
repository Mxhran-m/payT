import { useState } from "react"
import { Button } from "./Button"

export const Users = () => {
    // will replace with backend call 
    const [users, setUsers] = useState([{
        firstName: "John",
        lastName: "doe",
        _id: 1
    }]);

    return <>
        <div className="font-bold mt-6 text-lg">Users</div>
        <div className="my-2">
            <input type="text" placeholder="Search users..." className="w-full px-2 py-1 border border-slate-200 rounded"></input>
        </div>
        <div>
            {users.map( user => <User user={user} /> )}
        </div>
    </>
}

function User({user}){
    return <div className="flex justify-between ">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="h-full text-xl flex flex-col justify-center">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                 {user.firstName} {user.lastName}
            </div>
        </div>
        <div className="flex flex-col justify-center h-full">
            <Button label={"Send Money"}/>
        </div>
    </div>
}