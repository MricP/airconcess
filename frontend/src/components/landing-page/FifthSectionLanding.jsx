import React, { useEffect, useState } from 'react';
import '../../styles/landing-page/FifthSectionLanding.css';
import { getTestimonialsByUser, getAllTestimonials } from '../../services/api';
import { createTestimonial } from '../../services/auth';

function FifthSectionLanding() {

    const [isOpenForm, setIsOpenForm] = useState(false);
    const [testimonials, setTestimonials] = useState([]);

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

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

    const handleOpenFormTestimonial = async () => {
        setIsOpenForm(!isOpenForm);
    };

    const handleAddTestimonial = async (event) => {
        event.preventDefault();
        const testimonial = event.target.testimonial.value;

        try {
            const response = await createTestimonial(token, testimonial);
            setTestimonials([...testimonials, response.data]);
            setIsOpenForm(false);
        } catch (error) {
            console.error('Error creating testimonial:', error);
        }
    }

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
                    {user && (
                        <button className="add-testimonial-button" onClick={handleOpenFormTestimonial}>
                            Ajouter un témoignage
                        </button>
                    )}
                    {isOpenForm && (
                        <div className='form-testimonial'>
                            <div className='form-testimonial-content'>
                                <h3>Partagez votre expérience</h3>
                                <form onSubmit={handleAddTestimonial}>
                                    <textarea
                                        name="testimonial"
                                        id="testimonial"
                                        placeholder="Votre témoignage ici..."
                                    />
                                    <button type="submit">Envoyer</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
                <div className="fifth-section-right">
                    <div className="testimonials-container">
                        <div className="testimonials-container">
                            {testimonials.length > 0 && testimonials.map((testimonial) => (
                                <TestimonialCard key={testimonial.id_test} testimonial={testimonial} />
                            ))}
                        </div>
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
                const response = await getTestimonialsByUser(24);
                console.log('User testimonials fetched:', response);
                setUserTestimonials(response.data);
            } catch (error) {
                console.error('Error fetching user testimonials:', error);
            }
        };

        fetchUserTestimonials();
    }, [testimonial.id_user]);

    const { content } = testimonial;
    const { firstName, lastName, profilePictureURL } = userTestimonials;
    console.log('profilePictureURL:', profilePictureURL);
    return (
        <div className="testimonial-card">
            <p className="testimonial">
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
