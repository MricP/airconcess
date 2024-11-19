import Template from '../components/Template';
import TrainingService from '../components/our-services/TrainingService';
import MaintenanceService from '../components/our-services/MaintenanceService';
import "../styles/our-services/PageServices.css";
import { useEffect } from 'react';

export default function PageServices() {
    
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