import Badge from "./Badge";
import AttrBox from "./AttrBox";
import CandyDivider from "./CandyDivider";
export default function StudySpace({ name, location, sugar_level, image_url, description , rating, locationLink}) {
    return (
    <div className="container mt-5">
        <div className="card study-card-rush shadow-lg">
            <Badge>Open Now</Badge>

            <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <h2 className="sugar-font text-pink mb-0">{name}</h2>
                        <p className="text-muted"><i className="bi bi-geo-alt"></i>{location}</p>
                    </div>
                    <div className="rating-bubble">
                        <span className="sugar-font">{rating}</span>
                    </div>
                </div>

                <CandyDivider/>

                <div className="row g-3 text-center mb-4">
                    <AttrBox title="Sugar Levels" value="Quiet" />
                    <AttrBox title="Wifi" value="900 Mbps" />
                    <AttrBox title="Outlets" value="Plenty" />
                </div>

                <h5 className="sugar-font small-head">The Lowdown</h5>
                <p className="card-text">{description}</p>

                <div className="d-grid gap-2 mt-4">
                    <a className="btn btn-go-time" href={locationLink}>BOOK MY SPOT</a>
                    {/* <button className="btn btn-outline-sugar">View Menu</button> */}
                </div>
            </div>
        </div>
    </div>
    )
}