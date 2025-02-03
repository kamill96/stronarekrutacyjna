'use client';

import React, { useEffect, useState } from 'react';
import './job_offers.css';
import { JobOffer, JobOffersResponse } from '../../../models/job_offer/job_offer'; // Importujemy JobOffer i JobOffersResponse
import jobOffersData from '../../../data.json';

interface JobOffersProps {
  searchTerm: string;
  category: string;
  location: string;
  distance: string;
}

export default function JobOffers({ searchTerm, category, location, distance }: JobOffersProps) {
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState<JobOffer | null>(null);

  // Funkcja dodająca kategorię i odległość do ofert (jeśli nie ma)
  const addCategoryAndDistance = (offers: JobOffer[]): JobOffer[] => {
    return offers.map((offer) => ({
      ...offer,
      category: offer.category || 'Inne',  // Domyślna kategoria
      distance: offer.distance || 10,  // Domyślna odległość
    }));
  };

  // Funkcja deserializująca oferty z JSONa
  const deserializeJobOffers = (data: JobOffersResponse): JobOffer[] => {
    return data.offers.map((offerData) => JobOffer.fromJSON(offerData)); // Przekształcamy do instancji klasy JobOffer
  };

  useEffect(() => {
    const fetchJobOffers = async () => {
      try {
        // Przekształcamy dane z jobOffersData do JobOffer
        const deserializedOffers = deserializeJobOffers(jobOffersData as JobOffersResponse);
        const offersWithCategoryAndDistance = addCategoryAndDistance(deserializedOffers);
        setJobOffers(offersWithCategoryAndDistance); // Ustawiamy oferty w stanie
        console.log('Pobrane oferty:', offersWithCategoryAndDistance);
      } catch (error) {
        console.error('Błąd podczas pobierania ofert pracy:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobOffers();
  }, []); // Efekt uruchamia się tylko raz przy załadowaniu komponentu

  // Filtrowanie ofert na podstawie parametrów
  const filteredOffers = jobOffers.filter((offer) => {
    const isSearchMatch =
      offer.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.company.toLowerCase().includes(searchTerm.toLowerCase());
    const isCategoryMatch = category ? offer.category?.toLowerCase() === category.toLowerCase() : true;
    const isLocationMatch = location ? offer.location.toLowerCase().includes(location.toLowerCase()) : true;
    
    // Dodajemy sprawdzenie, jeśli distance jest undefined
    const isDistanceMatch = distance 
      ? (offer.distance ?? 10) <= parseInt(distance) // Jeśli distance jest undefined, przypisujemy wartość domyślną 10
      : true;

    return isSearchMatch && isCategoryMatch && isLocationMatch && isDistanceMatch;
  });

  const handleOfferClick = (offer: JobOffer) => {
    setSelectedOffer(offer);
  };

  if (loading) {
    return (
      <div className="job-offers-container">
        <h2>Rekomendowane oferty</h2>
        <p>Ładowanie ofert pracy...</p>
      </div>
    );
  }

  if (filteredOffers.length === 0) {
    return (
      <div className="job-offers-container">
        <h2>Rekomendowane oferty</h2>
        <p>Brak dostępnych ofert pracy.</p>
      </div>
    );
  }

  return (
    <div className="job-offers-container">
      <div className="recommended-offers">
        <h2>Rekomendowane oferty</h2>
      </div>

      {selectedOffer ? (
        <div className="job-offer-details">
          <h3>{selectedOffer.position}</h3>
          <p>Firma: {selectedOffer.company}</p>
          <p>Lokalizacja: {selectedOffer.location}</p>
          <p>Wynagrodzenie: {selectedOffer.salary}</p>
          {selectedOffer.isFeatured && <p>Oferta polecana!</p>}
          <button onClick={() => setSelectedOffer(null)}>Powrót do listy ofert</button>
        </div>
      ) : (
        <div className="job-offers">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className="job-offer"
              onClick={() => handleOfferClick(offer)}
              style={{ cursor: 'pointer' }}
            >
              <div className="job-logo">
                <div className="logo-placeholder">{offer.logo}</div>
              </div>
              <div className="job-details">
                <h3 className="job-title">{offer.position}</h3>
                <p className="company-name">{offer.company}</p>
                <p className="job-location">{offer.location}</p>
                <p className="job-salary">{offer.salary}</p>
                {offer.isFeatured && <p className="job-featured">Polecane!</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
