import { ReactNode } from 'react';

interface JobOfferData {
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
  dateAdded: string;
  contractType?: string; 
  workMode?: string;
  experienceLevel?: string;
  duties?: string;
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
  dateAdded: string;
  contractType?: string; 
  workMode?: string;
  experienceLevel?: string;
  duties?: string; // Dodajemy właściwość dla obowiązków

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
    this.category = data.category || 'Inne'; 
    this.distance = data.distance || 10; 
    this.dateAdded = data.dateAdded;
    this.contractType = data.contractType; 
    this.workMode = data.workMode; 
    this.experienceLevel = data.experienceLevel;
    this.duties = data.duties;  // Dodajemy obowiązki
  }

  static fromJSON(data: JobOfferData): JobOffer {
    return new JobOffer(data);
  }
}
