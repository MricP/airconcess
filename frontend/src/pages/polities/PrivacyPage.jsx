import React from 'react';
import '../../styles/polities/PrivacyPage.css';
import { Link } from 'react-router-dom';

function PrivacyPage() {
  return (
    <main className='main-privacy-page'>
      <div className="flex-container-privacy">
        <h1 className='privacy-page-title'>POLITIQUE DE CONFIDENTIALITÉ</h1>
        <section>
          <p><span className='privacy-update-text'>Dernière mise à jour : 04/12/2024</span></p>
          <p>
            Votre confidentialité est importante pour nous. Cette politique de confidentialité décrit comment nous collectons, utilisons et protégeons vos informations lorsque vous accédez à notre site local.
          </p>

          <h3>1. Collecte des informations</h3>
          <p>
            Comme ce site est hébergé sur le web, vos données personnelles sont collectées, stockée dans notre base de données.
          </p>

          <h3>2. Utilisation des informations</h3>
          <p>
            Toutes les données ou contenus que vous fournissez sont traités sur notre serveur.
          </p>

          <h3>3. Sécurité des données</h3>
          <p>
            Nous prenons la confidentialité et la sécurité de vos données au sérieux. Les informations traitées restent sur nos et sont accessibles qu'à travers ce site local.
          </p>

          <h3>4. Cookies et technologies similaires</h3>
          <p>
            Ce site ne déploie aucun cookie ou technologie similaire pour collecter des données utilisateur.
          </p>

          <h3>5. Partage des données</h3>
          <p>
            Nous ne partageons aucune donnée avec des tiers, car toutes les interactions et données restent locales.
          </p>

          <h3>6. Liens vers des tiers</h3>
          <p>
            Si des liens vers des ressources externes sont disponibles sur ce site, notez que ces liens peuvent rediriger vers des sites tiers avec leurs propres politiques de confidentialité. Nous vous encourageons à lire leurs politiques avant de fournir vos informations.
          </p>

          <h3>7. Modifications de la politique de confidentialité</h3>
          <p>
            Nous nous réservons le droit de mettre à jour cette politique de confidentialité à tout moment. Les modifications prendront effet immédiatement après leur publication sur le site.
          </p>

          <h3>8. Nous contacter</h3>
          <p>
            Si vous avez des questions concernant cette politique de confidentialité, vous pouvez nous contacter à :
          </p>
          <Link target="_blank" className='link-politics-underline' to="mailto:airconcess.contact@gmail.com" rel="noopener noreferrer">airconcess.contact@gmail.com</Link>
        </section>
      </div>
    </main>
  );
}

export default PrivacyPage;
