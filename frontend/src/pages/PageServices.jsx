import Template from '../components/Template';
import TrainingService from '../components/TrainingService';
import MaintenanceService from '../components/MaintenanceService';
import "../styles/PageServices.css";
import { useEffect } from 'react';

export default function PageServices() {

    useEffect(() => {
        // Appliquer overflow:hidden pour masquer la scrollbar principale
        document.body.style.overflow = "hidden";

        // Nettoyage : Rétablir la scrollbar quand on quitte la page
        return () => {
            document.body.style.overflow = "";
        };
    }, []);
    
    return (
        <Template>
            <div className='page-services'>
                <div className="page-services-component">
                    <TrainingService />
                </div>
                <div className="page-services-component">
                    <MaintenanceService />
                </div>


            </div>
        </Template>
    )
}