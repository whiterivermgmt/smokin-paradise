"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const defaultIcon = L.icon({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function LeafletMap() {
  return (
    <div className="w-full h-96 rounded-xl overflow-hidden shadow-md z-0">
      <MapContainer
        center={[38.861, -86.486]} // 3078 John A Williams Blvd
        zoom={16}
        scrollWheelZoom={false}
        className="w-full h-full rounded-xl"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[38.861, -86.486]} icon={defaultIcon}>
          <Popup>3078 John A Williams Blvd, Bedford, IN 47421</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
