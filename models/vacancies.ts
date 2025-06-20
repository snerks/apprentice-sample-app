export interface VacanciesResponse {
  vacancies: Vacancy[];
  total: number;
  totalFiltered: number;
  totalPages: number;
}

export interface Vacancy {
  title: string;
  description: string;
  numberOfPositions: number;
  postedDate: Date;
  closingDate: Date;
  startDate: Date;
  wage: Wage;
  hoursPerWeek: number;
  expectedDuration: string;
  address: Address;
  otherAddresses: any[];
  location: Location;
  distance: number;
  employerName: string;
  course: Course;
  apprenticeshipLevel: string;
  providerName: string;
  ukprn: number;
  isDisabilityConfident: boolean;
  vacancyUrl: string;
  vacancyReference: string;
  isNationalVacancy: boolean;
}

export interface Address {
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4: string;
  postcode: string;
  latitude: number;
  longitude: number;
}

export interface Course {
  larsCode: number;
  title: string;
  level: number;
  route: string;
}

export interface Location {
  lat: number;
  lon: number;
}

export interface Wage {
  wageType: string;
  wageUnit: string;
  wageAdditionalInformation: string;
  workingWeekDescription: string;
}
