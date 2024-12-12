import React from 'react';
import '../../styles/polities/CguPage.css';

export default function CguPage() {
  return (
    <main className='main-cgu-page'>
      <div className="flex-container-cgu">
        <h1 className='cgu-title'>CONDITIONS GÉNÉRALES DE VENTE</h1>
        <section>
          <p><span className='cgu-update-text'>Dernière mise à jour : 04/12/2024</span></p>
          <p>
            En accédant et en utilisant ce site, vous acceptez d'être lié par les conditions générales de vente suivantes. Si vous n'êtes pas d'accord avec ces conditions, veuillez ne pas utiliser ce site.
          </p>

          <h3>1. Objet</h3>
          <p>
            Les présentes conditions régissent les services proposés par Air'Concess sur ce site.
          </p>

          <h3>2. Réservations</h3>
          <p>
            Les réservations effectuées sur ce site sont soumises à la disponibilité des créneaux. Toute réservation passée sur ce site constitue un contrat de service entre le client et Air'Concess.
          </p>

          <h3>3. Prix et paiement</h3>
          <p>
            Les prix des services sont indiqués en [devise]. Le paiement doit être effectué en totalité lors de la réservation via les moyens de paiement proposés.
          </p>

          <h3>4. Prise de rendez-vous</h3>
          <p>
            Les rendez-vous pour la prestation des services seront fixés à l'adresse indiquée par le client. Les délais pour les rendez-vous peuvent varier en fonction de la disponibilité et de la zone géographique.
          </p>

          <h3>5. Annulation</h3>
          <p>
            Le client dispose d'un délai de 48 heures avant le rendez-vous pour l'annuler ou le modifier sans frais.
          </p>

          <h3>6. Garanties</h3>
          <p>
            Les services fournis par Air'Concess sont garantis conformément à la législation en vigueur.
          </p>

          <h3>7. Responsabilité</h3>
          <p>
            Air'Concess ne pourra être tenue responsable des dommages directs ou indirects résultant de l'utilisation de ce site ou des services fournis.
          </p>

          <h3>8. Protection des données personnelles</h3>
          <p>
            Les données personnelles collectées dans le cadre de la réservation sont traitées conformément à notre politique de confidentialité. Pour plus d'informations, veuillez consulter notre <a href="/privacy">politique de confidentialité</a>.
          </p>

          <h3>9. Modifications des CGV</h3>
          <p>
            Air'Concess se réserve le droit de modifier les présentes conditions générales de vente à tout moment. Les modifications seront publiées sur cette page avec une nouvelle date de mise à jour.
          </p>

          <h3>10. Nous contacter</h3>
          <p>
            Pour toute question concernant ces conditions générales de vente, vous pouvez nous contacter à :
            <br />
            <span>contact@exemple.com</span>
          </p>
        </section>
      </div>
    </main>
  );
}
