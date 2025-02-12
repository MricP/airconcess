import "../../styles/admin/UpdateUser.css";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/product";

export default function UpdateUser() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const loadUsers = async () => {
            const data = await getAllUsers();
            setUsers(data);
        };
        loadUsers();
    }, []);

    return (
        <div className="update-user">
            <h2>Modifier un utilisateur</h2>
            <div className="users-list">
                {users ? (
                    users.map((user) => (
                        <div className="user-container" key={user.idUser}>
                            <img src={user.profilePictureURL} alt="Utilisateur" />
                            <p>{user.firstName}</p>
                            <p>{user.lastName}</p>
                            <p>{user.email}</p>
                            <p>{user.location}</p>
                        </div>
                    ))
                ) : (
                    <p>Chargement des utilisateurs...</p>
                )}
            </div>
        </div>
    );
}