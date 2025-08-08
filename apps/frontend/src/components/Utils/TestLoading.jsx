export default function TestLoading({setLoading}) {
    return (
        <button className="TestLoading" onClick={() => setLoading((prev) => !prev)}>
            <p className="t4">Toggle</p>
        </button>
    )
}