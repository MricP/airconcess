import "../styles/training/PageTraining.css";
import FirstTrainingComponent from "../components/training/FirstTrainingComponent";
import SecondTrainingComposant from "../components/training/SecondTrainingComposant";
import ThirdTrainingComponent from "../components/training/ThirdTrainingComponent";

export default function PageTraining() {
    return (
        <main className="page-training">
            <FirstTrainingComponent />
            <SecondTrainingComposant />
            <ThirdTrainingComponent />
        </main>
    )
}