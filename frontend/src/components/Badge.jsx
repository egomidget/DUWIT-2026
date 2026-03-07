export default function Badge({children}){
    return (
        <div class="position-relative">
            <span class="badge status-badge-mint">{children}</span>
        </div>
    );
};