export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Array<Entry>;
}

export interface baseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface healthCheckEntry extends baseEntry {
  type: "HealthCheck";
  healthCheckRating: healthCheckRating;
}

interface occupationalHealthcareEntry extends baseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: sickLeave;
}

interface hospitalEntry extends baseEntry{
  type: "Hospital";
  discharge: discharge;
}

interface sickLeave {
  startDate: string;
  endDate: string
}

interface discharge {
  date: string;
  criteria: string;
}

enum healthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "highRisk" = 2,
  "CriticalRisk" = 3
}

export type Entry = baseEntry | healthCheckEntry | occupationalHealthcareEntry | hospitalEntry ;
export type exactEntry = healthCheckEntry | occupationalHealthcareEntry | hospitalEntry ;

