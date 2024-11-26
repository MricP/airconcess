import "../styles/maintenance/PageMaintenance.css";
import FirstMaintenanceComponent from "../components/maintenance/FirstMaintenanceComponent"
import SecondMaintenanceComponent from "../components/maintenance/SecondMaintenanceComponent";

export default function PageMaintenance() {
    return (
        <div className="page-maintenance">
            <FirstMaintenanceComponent />
            <SecondMaintenanceComponent />
        </div>
    )
}