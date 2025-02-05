'use client';  // This marks the component as a client-side component

import React, { useState } from 'react';
import JobOffers from './job_offers/page';
import Link from 'next/link';
import './globals.css';
import '/fonts/NunitoSans-Italic-VariableFont_YTLC,opsz,wdth,wght.ttf';

interface FilterOptions {
  [key: string]: string[];
}

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [distance, setDistance] = useState('');
  const [activeFilter, setActiveFilter] = useState('');

  const filterOptions: FilterOptions = {
    'Forma zatrudnienia': ['Umowa o pracę', 'B2B', 'Umowa zlecenie', 'Umowa o dzieło'],
    'Wymiar pracy': ['Pełny etat', 'Część etatu', 'Tymczasowa'],
    'Poziom stanowiska': ['Junior', 'Mid', 'Senior', 'Lead', 'Manager'],
    'Tryb pracy': ['Stacjonarna', 'Hybrydowa', 'Zdalna'],
    'Wynagrodzenie': ['do 4000', '4000-8000', '8000-12000', '12000-16000', 'powyżej 16000']
  };

  return (
    <div className="container">
      <header className="header">
        <div className="user-controls"></div>
      </header>

      <div className="search-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Słowo kluczowe, firma, stanowisko"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="text"
            placeholder="Kategoria Oferty pracy"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="text"
            placeholder="Lokalizacja"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="text"
            placeholder="Odległość"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
          <button className="search-btn">Szukaj</button>
        </div>

        <div className="filters-row">
          {Object.keys(filterOptions).map((filter) => (
            <div key={filter} className="filter-dropdown">
              <button 
                className="filter-button"
                onClick={() => setActiveFilter(activeFilter === filter ? '' : filter)}
              >
                {filter}
              </button>
              {activeFilter === filter && (
                <div className="dropdown-content">
                  {filterOptions[filter].map((option: string) => (
                    <div key={option} className="dropdown-item">
                      <input type="checkbox" id={option} />
                      <label htmlFor={option}>{option}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <main className="main-content">
        <JobOffers
          searchTerm={searchTerm}
          category={category}
          location={location}
          distance={distance}
        />
      </main>

      <footer className="footer">
        <Link href="/terms">Regulamin</Link>
        <a href="#">Polityka cookies</a>
        <a href="#">Praca</a>
      </footer>
    </div>
  );
}
