export function InputBox({placeholder, label, onChange}) {
    return <div>
    <div className="text-sm font-medium py-2 text-left">
        {label}
    </div>
    <input placeholder={placeholder} onChange={onChange} className="w-full px-2 py-1 border rounded border-slate-200"/>
    </div>
}