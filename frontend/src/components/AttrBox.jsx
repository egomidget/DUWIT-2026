export default function AttrBox({title, value, children}){
    return (
        <div class="col">
            <div class="attr-box">
                <small class="text-uppercase d-block">{title}</small>
                <strong>{value}</strong>
                {children}
            </div>
        </div>
    )
}