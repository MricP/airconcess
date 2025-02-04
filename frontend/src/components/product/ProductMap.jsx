import React from 'react'
import '../../styles/product/ProductMap.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css'; // Importation du CSS de Leaflet
import L from 'leaflet'; // Importation de Leaflet pour utiliser l'icône


const ProductMap = (aircraft) => {
    
    const customIcon = new L.Icon({
        iconUrl: '/assets/plane-icon.svg', // Remplacez par l'URL de votre icône
        className: 'plane-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 16], // position de l'icon par rapport au point (ici au centre)
        popupAnchor: [0, -16], // Position du popup par rapport à l'icône
    });

    return (
        <div className='productMap-container'>
            <MapContainer className='map' center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {aircraft?.position ?
                <Marker className="marker" position={aircraft?.position} icon={customIcon}>
                    <Popup className='map-popup'>
                        <section>
                            <p><strong>{aircraft?.modelName}</strong></p>
                            <p>• Serie : {aircraft?.serialNumber}</p>
                            <p>• Dernière localisation : {aircraft?.lastUpdate}</p>
                            <p>{`• Dernière position : LAT ${aircraft?.position[0]}, LON ${aircraft?.position[1]}`}</p>
                        </section>
                    </Popup>
                </Marker>
                : null}
            </MapContainer>
            {aircraft?.position ? null:<div className='no-position-div'><h3>La position de cet appareil n'est pas enregistrée.</h3></div>}
        </div>
    )
};

export default ProductMap
