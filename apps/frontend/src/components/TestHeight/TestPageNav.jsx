import "./TestHeight.css"

export default function TestPageNav() {
    return (
        <div className={`TestPage`}>
            <div className="FalseNavBar">
                <p className="t2">Viarte</p>
            </div>
            <p className="t32">Ma page de scroll avec nav</p>
            {
                Array.from({length: 10}).map(() => {
                    return (
                        <div className="MakeSpace"></div>
                    )
                })
            }
        </div>
    )
}