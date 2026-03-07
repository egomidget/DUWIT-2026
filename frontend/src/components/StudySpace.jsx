import Badge from "./Badge";
import AttrBox from "./AttrBox";
import CandyDivider from "./CandyDivider";
export default function StudySpace({ name, location, sugar_level, image_url, description , rating, locationLink}) {
    return (
    <div class="container mt-5">
        <div class="card study-card-rush shadow-lg">
            <Badge>Open Now</Badge>

            <div class="card-body p-4">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <h2 class="sugar-font text-pink mb-0">{name}</h2>
                        <p class="text-muted"><i class="bi bi-geo-alt"></i>{location}</p>
                    </div>
                    <div class="rating-bubble">
                        <span class="sugar-font">{rating}</span>
                    </div>
                </div>

                <CandyDivider/>

                <div class="row g-3 text-center mb-4">
                    <AttrBox title="Sugar Levels" value="Quiet" />
                    <AttrBox title="Wifi" value="900 Mbps" />
                    <AttrBox title="Outlets" value="Plenty" />
                </div>

                <h5 class="sugar-font small-head">The Lowdown</h5>
                <p class="card-text">{description}</p>

                <div class="d-grid gap-2 mt-4">
                    <a class="btn btn-go-time" href={locationLink}>BOOK MY SPOT</a>
                    {/* <button class="btn btn-outline-sugar">View Menu</button> */}
                </div>
            </div>
        </div>
    </div>
    )
}