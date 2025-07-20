import "./TestHeight.css"

export default function TestHeight({num}) {
    return (
        <div className={`TestHeight TestHeight${num}`}>
            <p className="t32">num : {num}</p>
            <p className="ToBottom t32">Ma Fin</p>
        </div>
    )
}