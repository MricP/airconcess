import React from "react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { useMediaQuery } from "react-responsive";
import "../../styles/landing-page/FourthSectionLanding.css";

function FourthSectionLanding() {
    const isMobile = useMediaQuery({ query: "(max-width: 1220px)" });

    const videoSrc = {
        type: "video",
        sources: [
            {
                src: "/assets/landing/aeronef-video.mp4",
                type: 'video/mp4',
                size: 1080,
            }
        ]
    };

    return (
        <section className="fourth-section-landing">
            <div className={isMobile ? "video-container-mobile" : "video-container"}>
                <Plyr source={videoSrc} options={{ autoplay: true }} />
            </div>
        </section>
    );
}

export default FourthSectionLanding;
