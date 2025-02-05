'use client';

import React, { useEffect, useState } from 'react';
import './job_offers.css';
import { JobOffer, JobOffersResponse } from '../../../models/job_offer/job_offer';
import jobOffersData from '../../../data.json';


interface JobOffersProps {
  searchTerm: string;
  category: string;
  location: string;
  distance: string;
}

// Formatowanie daty
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('pl-PL', options);
};

// Deserializacja i sortowanie ofert pracy
const deserializeJobOffers = (data: JobOffersResponse): JobOffer[] => {
  return data.offers
    .map((offerData) => {
      const parsedDate = new Date(offerData.dateAdded);
      const validDate = !isNaN(parsedDate.getTime()) ? parsedDate.toISOString() : '1970-01-01T00:00:00.000Z'; // Ustaw domyślną datę, jeśli jest niepoprawna

      return JobOffer.fromJSON({
        ...offerData,
        dateAdded: validDate,
      });
    })
    .sort((a, b) => {
      // Pierwszeństwo dla ofert polecanych
      if (a.isFeatured && !b.isFeatured) return -1; // Oferta a jest wyróżniona
      if (!a.isFeatured && b.isFeatured) return 1; // Oferta b jest wyróżniona

      // Sortowanie po dacie, od najnowszej do najstarszej
      const dateA = new Date(a.dateAdded);
      const dateB = new Date(b.dateAdded);
      return dateB.getTime() - dateA.getTime(); // Sortowanie od najnowszej do najstarszej
    });
};

// Funkcja sprawdzająca poprawność daty
const isValidDate = (date: string): boolean => {
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
};

export default function Page({ searchTerm, category, location, distance }: JobOffersProps) {
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState<JobOffer | null>(null);

  // Dodawanie domyślnych wartości kategorii i odległości
  const addCategoryAndDistance = (offers: JobOffer[]): JobOffer[] => {
    return offers.map((offer) => ({
      ...offer,
      category: offer.category || 'Inne',
      distance: offer.distance || 10,
    }));
  };

  // Ładowanie ofert
  useEffect(() => {
    const fetchJobOffers = async () => {
      try {
        const deserializedOffers = deserializeJobOffers(jobOffersData as JobOffersResponse);
        const offersWithCategoryAndDistance = addCategoryAndDistance(deserializedOffers);
        setJobOffers(offersWithCategoryAndDistance);
      } catch (error) {
        console.error('Błąd podczas pobierania ofert pracy:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobOffers();
  }, []);

  // Filtrowanie ofert na podstawie wyszukiwania i innych filtrów
  const filteredOffers = jobOffers.filter((offer) => {
    let isSearchMatch = false;
    let isCategoryMatch = true;
    let isLocationMatch = true;

    if (offer) {
      isSearchMatch = offer.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.company.toLowerCase().includes(searchTerm.toLowerCase());
      isCategoryMatch = category ? offer.category?.toLowerCase() === category.toLowerCase() : true;
      isLocationMatch = location ? offer.location.toLowerCase().includes(location.toLowerCase()) : true;
    }

    const isDistanceMatch = distance
      ? (offer.distance ?? 10) <= parseInt(distance)
      : true;

    return isSearchMatch && isCategoryMatch && isLocationMatch && isDistanceMatch;
  });

  // Funkcja obsługująca kliknięcie w ofertę pracy
  const handleOfferClick = (offer: JobOffer) => {
    setSelectedOffer(offer);
  };

  // Ładowanie
  if (loading) {
    return (
      <div className="job-offers-container">
        <h2>Rekomendowane oferty</h2>
        <p>Ładowanie ofert pracy...</p>
      </div>
    );
  }

  // Brak ofert
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
          <p>Data dodania: {isValidDate(selectedOffer.dateAdded) ? formatDate(selectedOffer.dateAdded) : 'Niepoprawna data'}</p>
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
                <p className="job-date">Dodano: {isValidDate(offer.dateAdded) ? formatDate(offer.dateAdded) : 'Niepoprawna data'}</p>
                {offer.isFeatured && <p className="job-featured">Polecane!</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
