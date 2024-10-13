export const Balance = ({ value }) => {
    return <div className="flex">
        <div className="text-lg font-bold">Your Balance</div>
        <div className="font-semibold text-lg ml-4">
            Rs { value }
        </div>
    </div>
}