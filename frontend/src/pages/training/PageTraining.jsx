import "../../styles/training/PageTraining.css";
import FirstTrainingComponent from "../../components/training/FirstTrainingComponent";
import SecondTrainingComposant from "../../components/training/SecondTrainingComponent";
import ThirdTrainingComponent from "../../components/training/ThirdTrainingComponent";

export default function PageTraining() {
    return (
        <main>
            <div className="page-training">
                <FirstTrainingComponent />
                <SecondTrainingComposant />
                <ThirdTrainingComponent />
            </div>
        </main>
    )
}