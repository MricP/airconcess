import "../../styles/admin/UpdateUser.css";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getAllUsers, updateRoleUser } from "../../services/product";

export default function UpdateUser() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    
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

    const handleCheckboxClick = async (id, role, boolean) => {
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
                            <img 
                                src={user.profilePictureURL || "/assets/admin/default-avatar.png"} 
                                alt="Utilisateur" 
                            />
                            <p>{user.firstName}</p>
                            <p>{user.lastName}</p>
                            <p>{user.email}</p>
                            <label>
                                <input 
                                    type="checkbox" 
                                    checked={user.isAdmin} 
                                    onChange={(e) => handleCheckboxClick(user.idUser, "isAdmin", e.target.checked)} 
                                />
                                Admin
                            </label>
                            <label>
                                <input 
                                    type="checkbox" 
                                    checked={user.isTrainer} 
                                    onChange={(e) => handleCheckboxClick(user.idUser, "isTrainer", e.target.checked)} 
                                />
                                Formateur
                            </label>
                            <label>
                                <input type="checkbox" checked={user.isVerified} disabled />
                                Vérifié
                            </label>
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
