import "../../styles/admin/PageAdmin.css";
import FirstAdminComponent from "../../components/admin/FirstAdminComponent";
import EditArticle from "../../components/admin/EditArticle";

export default function PageAdmin(){
    return (
        <div className="page-admin">
            <FirstAdminComponent />
            <EditArticle />
        </div>
    )
}