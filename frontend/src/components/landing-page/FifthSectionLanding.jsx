import React, { useEffect, useState } from 'react';
import '../../styles/landing-page/FifthSectionLanding.css';
import { getTestimonialsByUser, getAllTestimonials } from '../../services/api';
import { createTestimonial } from '../../services/auth';

function FifthSectionLanding() {
    const exampleTestimonial = {
        text: "Air Concess m’a aidé à réaliser mes rêves d’aviation. La fiche technique de l’avion fournissait des informations détaillées sur chaque appareil et l’équipe du service client était toujours là pour répondre à mes questions.",
        firstname: "Jean",
        lastname: "Dupont",
        profile_picture: ""
    };

    const [isOpenForm, setIsOpenForm] = useState(false);
    const [testimonials, setTestimonials] = useState([]);

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                if (token) {
                    const response = await getTestimonialsByUser(token);
                    console.log('Testimonials by user:', response);
                    setTestimonials(Array.isArray(response) ? response : []);
                } else {
                    const response = await getAllTestimonials();
                    console.log('All testimonials:', response);
                    setTestimonials(Array.isArray(response) ? response : []);
                }
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            }
        };

        // fetchTestimonials();
    }, []);

    const handleOpenFormTestimonial = async () => {
        setIsOpenForm(!isOpenForm);
    };
    const handleAddTestimonial = async (event) => {
        event.preventDefault();
        const testimonial = event.target.testimonial.value;

        try {
            
            console.log('Creating testimonial:', testimonial);

            const response = await createTestimonial(token, testimonial);
            setTestimonials([...testimonials, response]);
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
                        {testimonials.length > 0 && testimonials.map((testimonial, index) => (
                            <TestimonialCard key={index} testimonial={testimonial} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const TestimonialCard = ({ testimonial }) => {
    return (
        <div className="testimonial-card">
            <p className="testimonial">
                {testimonial.text}
            </p>
            <div className="author-container">
                <div className="author-name">
                    <span>{testimonial.firstname}</span>
                    <span>{testimonial.lastname}</span>
                </div>
                <div className="profile-picture">
                    {/* <img
                        src={testimonial.profile_picture || ""}
                        alt={testimonial.firstname + " " + testimonial.lastname}
                    /> */}
                </div>
            </div>
        </div>
    );
}

export default FifthSectionLanding;
