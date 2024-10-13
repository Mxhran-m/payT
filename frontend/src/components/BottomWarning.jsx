import { Link } from "react-router-dom"
export function BottomWarning({label, buttonText, to}) {
    return <div>
        <div>
            {label}
            <Link className="pointer underline pl-2 cursor-pointer" to={to}>{buttonText}</Link>
        </div>
    </div>
}