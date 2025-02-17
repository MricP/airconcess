import React, { useEffect, useState } from 'react';
import '../../styles/product/ProductMap.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const ProductMap = ({ aircraft,modelName }) => {
    const defaultCenter = [51, -0.09];
    const [center, setCenter] = useState(defaultCenter);

    useEffect(() => {
        if (aircraft?.last_location_latitude && aircraft?.last_location_longitude) {
            setCenter([aircraft.last_location_latitude, aircraft.last_location_longitude]);
        }
    }, [aircraft]);

    const customIcon = new L.Icon({
        iconUrl: '/assets/plane-icon.svg',
        className: 'plane-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16],
    });

    return (
        <div className='productMap-container'>
            <MapContainer key={center.join(',')} className='map' center={center} minZoom={4} maxZoom={13} zoom={8} scrollWheelZoom={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {aircraft?.last_location_latitude && (
                    <Marker position={center} icon={customIcon}>
                        <Popup className='map-popup'>
                            <section>
                                <p><strong>{modelName}</strong></p>
                                <p>• Série : {aircraft?.serial_number}</p>
                                <p>• Dernière localisation : {(new Date(aircraft?.last_location_update)).toLocaleDateString()}</p>
                                <p>{`• LAT ${aircraft?.last_location_latitude}, LON ${aircraft?.last_location_longitude}`}</p>
                            </section>
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
            {!aircraft?.last_location_latitude && (
                <div className='no-position-div'>
                    <h3>La position de cet appareil n'est pas enregistrée.</h3>
                </div>
            )}
        </div>
    );
};

export default ProductMap;
