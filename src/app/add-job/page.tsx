'use client';

import { useState } from 'react';

export default function AddJob() {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [requirements, setRequirements] = useState('');
  const [benefits, setBenefits] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      jobTitle,
      companyName,
      jobDescription,
      salary,
      requirements,
      benefits,
      experienceLevel
    });
  };

  return (
    <div className="add-job-container">
      <h2>Dodaj Ogłoszenie</h2>
      <form onSubmit={handleSubmit} className="job-form">
        <div>
          <label htmlFor="jobTitle">Tytuł ogłoszenia</label>
          <input
            type="text"
            id="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Wpisz tytuł ogłoszenia"
          />
        </div>

        <div>
          <label htmlFor="companyName">Nazwa firmy</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Nazwa firmy"
          />
        </div>

        <div>
          <label htmlFor="jobDescription">Opis stanowiska</label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Wpisz opis stanowiska"
          ></textarea>
        </div>

        <div>
          <label htmlFor="salary">Wynagrodzenie</label>
          <input
            type="text"
            id="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Wpisz wynagrodzenie"
          />
        </div>

        <div>
          <label htmlFor="requirements">Wymagania</label>
          <textarea
            id="requirements"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="Podaj wymagania dla kandydata"
          ></textarea>
        </div>

        <div>
          <label htmlFor="benefits">Benefity</label>
          <textarea
            id="benefits"
            value={benefits}
            onChange={(e) => setBenefits(e.target.value)}
            placeholder="Wymień benefity dostępne w pracy"
          ></textarea>
        </div>

        <div>
          <label htmlFor="experienceLevel">Poziom doświadczenia</label>
          <select
            id="experienceLevel"
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
          >
            <option value="">Wybierz poziom</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
            <option value="manager">Manager</option>
          </select>
        </div>

        <button type="submit">Dodaj ogłoszenie</button>
      </form>
    </div>
  );
}
