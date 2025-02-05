// src/models/job_offer/job_offer.ts

import { ReactNode } from "react";

export interface JobOfferData {
  id: number;
  position: string;
  company: string;
  salary: string;
  location: string;
  logo: string;
  isFeatured: boolean;
  employmentType?: string; // Opcjonalne pole
  workTime?: string; // Opcjonalne pole
  category?: string; // Opcjonalne pole
  distance?: number; // Opcjonalne pole
  dateAdded: string; // Data dodania oferty
}

export interface JobOffersResponse {
  offers: JobOfferData[];
}

export class JobOffer {
  id: number;
  position: string;
  company: string;
  salary: string;
  location: string;
  logo: string;
  isFeatured: boolean;
  employmentType?: string;
  workTime?: string;
  category?: string;
  distance?: number;
  description: ReactNode;
  dateAdded: string; // Usuń "!", ponieważ pole jest inicjalizowane w konstruktorze

  constructor(data: JobOfferData) {
    this.id = data.id;
    this.position = data.position;
    this.company = data.company;
    this.salary = data.salary;
    this.location = data.location;
    this.logo = data.logo;
    this.isFeatured = data.isFeatured;
    this.employmentType = data.employmentType;
    this.workTime = data.workTime;
    this.category = data.category || 'Inne'; // Domyślna kategoria
    this.distance = data.distance || 10; // Domyślna odległość
    this.dateAdded = data.dateAdded; // Inicjalizuj dateAdded
  }

  static fromJSON(data: JobOfferData): JobOffer {
    return new JobOffer(data);
  }
}