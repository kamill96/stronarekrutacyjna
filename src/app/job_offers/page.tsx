'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import './job_offers.css';
import { JobOffer } from '../../../models/job_offer/job_offer';

interface JobOffersResponse {
  offers: JobOffer[];
}

interface JobOffersProps {
  searchTerm: string;
  category: string;
  location: string;
  distance: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const deserializeJobOffers = (data: JobOffersResponse): JobOffer[] => {
  return data.offers
    .map((offerData: JobOffer) => {
      const parsedDate = new Date(offerData.dateAdded);
      return JobOffer.fromJSON({
        ...offerData,
        dateAdded: isNaN(parsedDate.getTime())
          ? '1970-01-01T00:00:00.000Z'
          : parsedDate.toISOString(),
      });
    })
    .sort(
      (a, b) =>
        (b.isFeatured ? 1 : -1) -
          (a.isFeatured ? 1 : -1) ||
        new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    );
};

export default function Page({ searchTerm = '', category = '', location = '', distance = '10' }: JobOffersProps) {
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState<JobOffer | null>(null);

  useEffect(() => {
    async function fetchJobOffers() {
      try {
        const res = await fetch('/api/job_offers');
        if (!res.ok) {
          throw new Error("Błąd podczas pobierania ofert pracy");
        }
        const data: JobOffersResponse = await res.json();
        setJobOffers(deserializeJobOffers(data));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchJobOffers();
  }, []);

  const filteredOffers = jobOffers.filter((offer) => {
    return (
      (offer.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.company?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!category || offer.category?.toLowerCase() === category.toLowerCase()) &&
      (!location || offer.location?.toLowerCase().includes(location.toLowerCase())) &&
      (!distance || (offer.distance ?? 10) <= parseInt(distance))
    );
  });

  if (loading)
    return (
      <div className="job-offers-container">
        <h2>Rekomendowane oferty</h2>
        <p>Ładowanie ofert pracy...</p>
      </div>
    );
  if (filteredOffers.length === 0)
    return (
      <div className="job-offers-container">
        <h2>Rekomendowane oferty</h2>
        <p>Brak dostępnych ofert pracy.</p>
      </div>
    );

  return (
    <div className="job-offers-container">
      <h2>Rekomendowane oferty</h2>
      {selectedOffer ? (
        <div className="job-offer-details">
          <h3>{selectedOffer.position}</h3>
          <p>Firma: {selectedOffer.company}</p>
          <p>Lokalizacja: {selectedOffer.location}</p>
          <p>Wynagrodzenie: {selectedOffer.salary}</p>
          <p>Dodano: {formatDate(selectedOffer.dateAdded)}</p>
          <p>Rodzaj umowy: {selectedOffer.contractType}</p>
          <p>Tryb pracy: {selectedOffer.workMode}</p>
          <p>Poziom doświadczenia: {selectedOffer.experienceLevel}</p>
          {selectedOffer.isFeatured && <p><strong>Oferta polecana!</strong></p>}
          <button onClick={() => setSelectedOffer(null)}>Powrót do listy ofert</button>
        </div>
      ) : (
        <div className="job-offers">
          {filteredOffers.map((offer) => (
            <div key={offer.id} className="job-offer" onClick={() => setSelectedOffer(offer)}>
              <div className="job-logo">
                <Image src={`/${offer.logo}`} alt={`${offer.company} logo`} width={50} height={50} />
              </div>
              <div className="job-details">
                <h3 className="job-title">{offer.position}</h3>
                <p className="company-name">{offer.company}</p>
                <p className="job-location">{offer.location}</p>
                <p className="job-salary">{offer.salary}</p>
                <p className="job-date">Dodano: {formatDate(offer.dateAdded)}</p>
                {offer.isFeatured && <p className="job-featured">Polecane!</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
