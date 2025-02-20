import React from 'react';
import '../../styles/polities/LegalNoticesPage.css';
import { Link } from 'react-router-dom';

function LegalNoticesPage() {
  return (
    <main className='main-legal-notices-page'>
      <div className="flex-container-legal-notices">
        <h1 className='legal-notices-title'>MENTIONS LÉGALES</h1>
        <section>
          <p><span className='legal-update-text'>Dernière mise à jour : 20/02/2025</span></p>
          <p>
            Cette page présente les mentions légales du site. En accédant à ce site, vous acceptez les conditions ci-dessous.
          </p>

          <h3>1. Informations légales</h3>
          <p className='legal-info'>
            Le présent site est édité par :
            <span>Air'Concess</span>
            <span>SIRET : 123 456 789 00000</span>
            <span>Téléphone : +33 1 23 45 67 89</span>
            <span>Email : <Link target="_blank" className='link-politics-underline' to="mailto:airconcess.contact@gmail.com" rel="noopener noreferrer">airconcess.contact@gmail.com</Link></span>
            <span>Adresse : 123 Rue des Ailes, 75008 Paris, France</span>
          </p>

          <h3>2. Hébergement</h3>
          <p className='legal-info'>
            Le site est hébergé par :
            <span>Vercel</span>
            <span>Site web : <Link className='link-politics-underline' to="https://vercel.com/" target="_blank" rel="noopener noreferrer">https://vercel.com/</Link></span>
          </p>

          <h3>3. Propriété intellectuelle</h3>
          <p>
            Tous les contenus présents sur ce site, incluant textes, images, graphismes, logos, vidéos, et autres éléments, sont des ressources open-source mais peuvent etre soumises à des droits d'auteurs sauf mention contraire.
          </p>

          <h3>4. Responsabilité</h3>
          <p>
            L'éditeur du site ne peut être tenu responsable des erreurs ou omissions concernant les informations présentes sur ce site. L'utilisation des informations du site se fait sous la responsabilité exclusive de l'utilisateur.
          </p>

          <h3>5. Protection des données personnelles</h3>
          <p>
            Les données personnelles collectées par ce site sont traitées conformément à la <Link className='link-politics-underline' to="/privacy">politique de confidentialité</Link> disponible sur notre site.
          </p>

          <h3>6. Liens externes</h3>
          <p>
            Ce site peut contenir des liens vers d'autres sites web. Nous ne contrôlons pas ces sites et déclinons toute responsabilité quant à leur contenu.
          </p>

          <h3>7. Modifications des mentions légales</h3>
          <p>
            Nous nous réservons le droit de modifier ces mentions légales à tout moment. Les modifications seront publiées sur cette page avec une nouvelle date de mise à jour.
          </p>

          <h3>8. Nous contacter</h3>
          <p>
            Pour toute question concernant ces mentions légales, vous pouvez nous contacter à :
          </p>
          <Link target="_blank" className='link-politics-underline' to="mailto:airconcess.contact@gmail.com" rel="noopener noreferrer">airconcess.contact@gmail.com</Link>
        </section>
      </div>
    </main>
  );
}

export default LegalNoticesPage;
