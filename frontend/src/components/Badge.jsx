export default function Badge({children}){
    return (
        <div className="position-relative">
            <span className="badge status-badge-mint">{children}</span>
        </div>
    );
};