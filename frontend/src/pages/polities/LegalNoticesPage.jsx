import React from 'react';
import '../../styles/polities/LegalNoticesPage.css';

function LegalNoticesPage() {
  return (
    <main className='main-legal-notices-page'>
      <div className="flex-container-legal-notices">
        <h1 className='legal-notices-title'>MENTIONS LÉGALES</h1>
        <section>
          <p><span className='legal-update-text'>Dernière mise à jour : 04/12/2024</span></p>
          <p>
            Cette page présente les mentions légales du site. En accédant à ce site, vous acceptez les conditions ci-dessous.
          </p>

          <h3>1. Informations légales</h3>
          <p className='legal-info'>
            Le présent site est édité par :
            <span>Air'Concess</span>
            <span>Adresse : 123 rue de l'exemple, 75000 Paris</span>
            <span>Email : <a href="mailto:airconcess.contact@gmail.com" target="_blank" rel="noopener noreferrer">airconcess.contact@gmail.com</a></span>
            <span>SIRET : 123 456 789 00000</span>
          </p>

          <h3>2. Hébergement</h3>
          <p className='legal-info'>
            Le site est hébergé par :
            <span>IUT Lyon 1</span>
            <span>Adresse : 123 rue de l'exemple, 69000 Villeurbanne</span>
            <span>Site web : <a href="https://iut.univ-lyon1.fr/" target="_blank" rel="noopener noreferrer">https://iut.univ-lyon1.fr/</a></span>
          </p>

          <h3>3. Propriété intellectuelle</h3>
          <p>
            Tous les contenus présents sur ce site, incluant textes, images, graphismes, logos, vidéos, et autres éléments, sont protégés par des droits d'auteur et sont la propriété exclusive de l'éditeur du site, sauf mention contraire.
          </p>

          <h3>4. Responsabilité</h3>
          <p>
            L'éditeur du site ne peut être tenu responsable des erreurs ou omissions concernant les informations présentes sur ce site. L'utilisation des informations du site se fait sous la responsabilité exclusive de l'utilisateur.
          </p>

          <h3>5. Protection des données personnelles</h3>
          <p>
            Les données personnelles collectées par ce site sont traitées conformément à la <a href="/privacy">politique de confidentialité</a> disponible sur notre site.
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
          <span>airconcess.contact@gmail.com</span>
        </section>
      </div>
    </main>
  );
}

export default LegalNoticesPage;
