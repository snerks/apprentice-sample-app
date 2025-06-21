import z from 'zod/v4';

export interface VacanciesResponse {
  vacancies: Vacancy[];
  total: number;
  totalFiltered: number;
  totalPages: number;
}

export const VacancySchema = z.object({
  title: z.string(),
  description: z.string(),
  numberOfPositions: z.number(),
  postedDate: z.string().transform(str => new Date(str)),
  closingDate: z.string().transform(str => new Date(str)),
  startDate: z.string().transform(str => new Date(str)),
  wage: z.object({
    wageType: z.string(),
    wageUnit: z.string(),
    wageAdditionalInformation: z.string(),
    workingWeekDescription: z.string(),
  }),
  hoursPerWeek: z.number(),
  expectedDuration: z.string(),
  address: z.object({
    addressLine1: z.string(),
    addressLine2: z.string().optional(),
    addressLine3: z.string().optional(),
    addressLine4: z.string().optional(),
    postcode: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  }),
  otherAddresses: z.array(z.object()),
  location: z.object({
    lat: z.number(),
    lon: z.number(),
  }),
  distance: z.number(),
  employerName: z.string(),
  course: z.object({
    larsCode: z.number(),
    title: z.string(),
    level: z.number(),
    route: z.string(),
  }),
  apprenticeshipLevel: z.string(),
  providerName: z.string(),
  ukprn: z.number(),
  isDisabilityConfident: z.boolean(),
  vacancyUrl: z.string(),
  vacancyReference: z.string(),
  isNationalVacancy: z.boolean(),
});

export type VacancyType = z.infer<typeof VacancySchema>;

export interface Vacancy {
  title: string;
  description: string;
  numberOfPositions: number;
  postedDate: Date; // Date;
  // postedDateTyped: Date;
  closingDate: Date;
  startDate: Date;
  wage: Wage;
  hoursPerWeek: number;
  expectedDuration: string;
  address: Address;
  otherAddresses: unknown[];
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
  addressLine2?: string;
  addressLine3?: string;
  addressLine4?: string;
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
