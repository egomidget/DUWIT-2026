export default function AttrBox({title, value, children}){
    return (
        <div className="col">
            <div className="attr-box">
                <small className="text-uppercase d-block">{title}</small>
                <strong>{value}</strong>
                {children}
            </div>
        </div>
    )
}