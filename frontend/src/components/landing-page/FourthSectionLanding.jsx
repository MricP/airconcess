import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import '../../styles/landing-page/FourthSectionLanding.css';

function FourthSectionLanding() {
    const controls = useAnimation();
    const isMobile = useMediaQuery({ query: '(max-width: 723px)' });
    const ref = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (ref.current && videoRef.current) {
                const rect = ref.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                if (rect.top < windowHeight && rect.bottom > 0) {
                    const scrollPercentage = Math.min((windowHeight - rect.top) / windowHeight, 1);
                    const scale = 1 + scrollPercentage * 0.5;
                    controls.start({ scale: scale, transition: { duration: 0.1 } })
                } else {
                    videoRef.current.pause();
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll);
    }, [controls])

    return (
        <section className="fourth-section-landing">
            {!isMobile ? (
                <motion.div
                    ref={ref}
                    animate={controls}
                    initial={{ scale: 1 }}
                    className="video-container"
                >
                    <video
                        ref={videoRef}
                        src="https://www.w3schools.com/html/mov_bbb.mp4"
                        controls
                        className="video"
                    />
                </motion.div>
            ) : (
                <div className="video-container-mobile">
                    <video
                        ref={videoRef}
                        src="https://www.w3schools.com/html/mov_bbb.mp4"
                        controls
                        className="video"
                    />
                </div>
            )}
        </section>
    )
}

export default FourthSectionLanding;
