import React, { useEffect, useState } from 'react';
import '../../styles/landing-page/FifthSectionLanding.css';
import { getTestimonialsByUser, getAllTestimonials } from '../../services/api';
import useRedirect from '../Custom-hooks';

function FifthSectionLanding() {
    const [testimonials, setTestimonials] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const token = localStorage.getItem('token');
    const redirect = useRedirect();

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await getAllTestimonials();
                setTestimonials(response.data);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            }
        }

        fetchTestimonials();
    }, []);

    useEffect(() => {
        if (testimonials.length > 0) {
            const intervalId = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
            }, 4000);

            return () => clearInterval(intervalId);
        }
    }, [testimonials]);

    const handleAddTestimonial = () => {
        redirect('/my-profile');
    };

    return (
        <div className="fifth-section-container">
            <div className="fifth-section-content">
                <div className="fifth-section-left">
                    <h3>Le charme de notre collection</h3>
                    <h2>Clients satisfaits</h2>
                    <p className="fifth-section-text">
                        Découvrez les expériences de nos clients satisfaits et découvrez comment Air Concess
                        les a aidés à réaliser leurs rêves d’aviation.
                    </p>
                    {token && (
                        <button className="add-testimonial-button" onClick={handleAddTestimonial}>
                            Ajouter un témoignage
                        </button>
                    )}

                </div>
                <div className="fifth-section-right">
                    <div className="testimonials-container">
                        {testimonials.length > 0 && (
                            <TestimonialCard testimonial={testimonials[currentIndex]} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

const TestimonialCard = ({ testimonial }) => {
    const [userTestimonials, setUserTestimonials] = useState({});

    useEffect(() => {
        const fetchUserTestimonials = async () => {
            try {
                const response = await getTestimonialsByUser(testimonial.id_user);
                setUserTestimonials(response.data);
            } catch (error) {
                console.error('Error fetching user testimonials:', error);
            }
        };

        fetchUserTestimonials();
    }, [testimonial.id_user]);

    const { content } = testimonial;
    const { firstName, lastName, profilePictureURL } = userTestimonials;

    return (
        <div className="testimonial-card">
            <p className="testimonial-content">
                {content}
            </p>
            <div className="author-container">
                <div className="author-name">
                    <span>{firstName}</span>
                    <span>{lastName}</span>
                </div>
                <div className="profile-picture">
                    <img
                        src={profilePictureURL || ""}
                        alt={firstName + " " + lastName}
                    />
                </div>
            </div>
        </div>
    );
}

export default FifthSectionLanding;
