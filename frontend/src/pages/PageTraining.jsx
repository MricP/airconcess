import "../styles/training/PageTraining.css";
import FirstTrainingComponent from "../components/training/FirstTrainingComponent";
import SecondTrainingComposant from "../components/training/SecondTrainingComposant";

export default function PageTraining() {
    return (
        <main>
            <div className="page-training">
                <FirstTrainingComponent />
                <SecondTrainingComposant />
            </div>
        </main>
    )
}