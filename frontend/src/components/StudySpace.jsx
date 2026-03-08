import Badge from "./Badge";
import AttrBox from "./AttrBox";
import CandyDivider from "./CandyDivider";
// export default function StudySpace({ name, location, windows, sound, tempurature, description , rating, locationLink}) {
export default function StudySpace({ locationLink, ...props}) {
    return (
    <div className="container mt-5">
        <div className="card study-card-rush shadow-lg">
            <Badge>Open Now</Badge>

            <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <h2 className="sugar-font text-pink mb-0">{props.name}</h2>
                        <p className="text-muted"><i className="bi bi-geo-alt"></i>{props.location.latitude}, {props.location.longitude}</p>
                    </div>
                    <div className="rating-bubble">
                        <span className="sugar-font">{props.rating}</span>
                    </div>
                </div>

                <CandyDivider/>

                <div className="row g-3 text-center mb-4">
                    <AttrBox title="Windows" value={props.windows} />
                    <AttrBox title="Sound" value={props.sound} />
                    <AttrBox title="Tempurature" value={props.tempurature} />
                    <AttrBox title="Ambience" value={props.ambience} />

                </div>

                <h5 className="sugar-font small-head">The Lowdown</h5>
                <p className="card-text">{props.description}</p>

                <div className="d-grid gap-2 mt-4">
                    <a className="btn btn-go-time" href={locationLink}>BOOK MY SPOT</a>
                    {/* <button className="btn btn-outline-sugar">View Menu</button> */}
                </div>
            </div>
        </div>
    </div>
    )
}