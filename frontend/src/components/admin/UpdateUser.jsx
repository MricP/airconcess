import "../../styles/admin/UpdateUser.css";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoTrashBin } from "react-icons/io5";
import { getAllUsers, updateRoleUser, deleteUser, deleteTrainer, createTrainer } from "../../services/product";
import { useMediaQuery } from 'react-responsive'

export default function UpdateUser() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const isMobile = useMediaQuery({ maxWidth: 992 });
    
    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await getAllUsers();
                setUsers(data);
            } catch (error) {
                console.error("Erreur lors du chargement des utilisateurs :", error);
            }
        };
        loadUsers();
    }, []);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
        setCurrentPage(1); // Réinitialiser à la première page lors d'une recherche
    };

    const handleCheckboxAdminClick = async (id, role, boolean) => {
        const newValue = Number(boolean);
        try {
            await updateRoleUser(id, role, newValue);
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.idUser === id ? { ...user, [role]: newValue } : user
                )
            );
        } catch (error) {
            console.error(`Erreur lors de la mise à jour du rôle ${role} :`, error);
        }
    };

    const handleCheckboxTrainerClick = async (id, role, boolean) => {
        if (boolean) {
            await createTrainer(id);

        } else {
            await deleteTrainer(id); 
        }
        await updateRoleUser(id, role, Number(boolean));
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.idUser === id ? { ...user, isTrainer: boolean } : user
            )
        );
    };

    const handleBinClick = async (id, boolean) => {
        if (boolean) {
            await deleteTrainer(id)
        }
        await deleteUser(id);
        setUsers((prevUsers) => prevUsers.filter(user => user.idUser !== id));
    }

    // Filtrer les utilisateurs en fonction du terme de recherche
    const filteredUsers = users.filter(user =>
        user.lastName.toLowerCase().includes(searchTerm) ||
        user.firstName.toLowerCase().includes(searchTerm)
    );
    
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <div className="update-user">
            <h2>Modifier un utilisateur</h2>
            <div className="filter-bar">
                <input
                    type="text"
                    placeholder="Rechercher un utilisateur ..."
                    value={searchTerm}
                    onChange={handleInputChange}
                />
            </div>
            <div className="users-list">
                {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user) => (
                        <div className="user-container" key={user.idUser}>
                            {isMobile ? 
                                <table className="info-user">
                                    <tbody>
                                        <tr>
                                            <td rowSpan={3}>
                                                <img src={user.profilePictureURL || "/assets/admin/default-avatar.png"} alt="Utilisateur" />
                                            </td>
                                        </tr>
                                        <td>
                                            <tr>{user.firstName} {user.lastName}</tr>
                                            <tr>{user.email}</tr>
                                        </td>
                                        
                                    </tbody>
                                </table> :
                                <table className="info-user">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <img src={user.profilePictureURL || "/assets/admin/default-avatar.png"} alt="Utilisateur" />
                                            </td>
                                        </tr>
                                        <tr><td>{user.firstName}</td></tr>
                                        <tr><td>{user.lastName}</td></tr>
                                        <tr><td>{user.email}</td></tr>
                                    </tbody>
                                </table> 
                            }

                            <div className="role-user">
                                <label>
                                    <input 
                                        type="checkbox" 
                                        checked={user.isAdmin} 
                                        onChange={(e) => handleCheckboxAdminClick(user.idUser, "isAdmin", e.target.checked)} 
                                    />
                                    Admin
                                </label>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        checked={user.isTrainer}
                                        onChange={(e) => handleCheckboxTrainerClick(user.idUser, "isTrainer", e.target.checked)} 
                                    />
                                    Formateur
                                </label>
                                <label>
                                    <input type="checkbox" checked={user.isVerified} disabled />
                                    Vérifié
                                </label>
                                <IoTrashBin size={23} color='red' id="bin" onClick={() => handleBinClick(user.idUser, user.isTrainer)}/>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Aucun utilisateur trouvé...</p>
                )}
            </div>
            <div className="chooseCatalogPage">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    <IoIosArrowBack color="#B5B5B5" size={35} />
                </button>
                <p>{currentPage} / {totalPages || 1}</p>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    <IoIosArrowForward color="#B5B5B5" size={35} />
                </button>
            </div>
        </div>
    );
}
