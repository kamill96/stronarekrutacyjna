// src/models/job_offer/job_offer.ts

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
  }

  static fromJSON(data: JobOfferData): JobOffer {
    return new JobOffer(data);
  }
}
