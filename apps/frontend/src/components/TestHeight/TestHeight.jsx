import "./TestHeight.css"

export default function TestHeight({num}) {
    return (
        <div className={`TestHeight TestHeight${num}`}>
            <p className="t32">num : {num}</p>
        </div>
    )
}