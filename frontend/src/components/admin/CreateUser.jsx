import "../../styles/admin/CreateUser.css";
import { useState } from "react";

import GrayInput from '../../components/general/GrayInput';
import DarkButton2 from "../general/DarkButton2";

import { createUserWithCRUD } from "../../services/product";

export default function CreateUser(){
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isTrainer, setIsTrainer] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let admin = 0;
        let trainer = 0;
        if (isAdmin === true) admin = 1;
        if (isTrainer === true) trainer = 1;
        try {
          await createUserWithCRUD(email, password, firstName, lastName, admin, trainer);
          window.location.reload();
        } catch (error) {
          console.log('Error response:', error.response?.data?.message || 'Unknown error');
        }
    };

    return (
        <div className="create-user">
            <h2>Ajouter un utilisateur</h2>
            <form onSubmit={handleSubmit} className="sign-up-form">
               <div className="form-group">
                 <label htmlFor="firstName" className="form-label">Prénom*</label>
                 <GrayInput placeholder="Prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)} required={true} />
               </div>
               <div className="form-group">
                 <label htmlFor="lastName" className="form-label">Nom*</label>
                 <GrayInput placeholder="Nom" value={lastName} onChange={(e) => setLastName(e.target.value)} required={true} />
               </div>
               <div className="form-group">
                 <label htmlFor="email" className="form-label">Email*</label>
                 <GrayInput placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required={true} />
               </div>
               <div className="form-group">
                 <label htmlFor="password" className="form-label">Mot de passe*</label>
                 <GrayInput type={"password"} placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required={true} />
               </div>
               <div className="checkbox">
                <label htmlFor="isAdmin"><input type="checkbox" onChange={(e) => setIsAdmin(e.target.checked)}/>Admin</label>
                <label htmlFor="isTrainer"><input type="checkbox" onChange={(e) => setIsTrainer(e.target.checked)}/>Formateur</label>
               </div>
               <DarkButton2 text="Ajouter l'utilisateur" use={handleSubmit} />
            </form>
        </div>
    )
}