import TrainingService from '../components/our-services/TrainingService';
import MaintenanceService from '../components/our-services/MaintenanceService';
import "../styles/our-services/PageServices.css";

export default function PageServices() {
    
    return (
        <main>
            <div className='page-services'>
                <div className="page-services-component">
                    <TrainingService />
                </div>
                <div className="page-services-component">
                    <MaintenanceService />
                </div>


            </div>
        </main>
    )
}