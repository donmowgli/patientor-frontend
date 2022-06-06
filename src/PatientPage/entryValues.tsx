import { EntryFormValues, healthCheckEntry, hospitalEntry, occupationalHealthcareEntry } from "../types";

const parseValues = (values: EntryFormValues): EntryFormValues => {
    const newEntry : EntryFormValues = baseValues(values);
    switch(values.type){
        case 'HealthCheck':
            const healthEntry : healthCheckEntry = newEntry as healthCheckEntry;
            healthEntry.healthCheckRating = values.healthCheckRating;
            return healthEntry;
        case 'OccupationalHealthcare':
            const occEntry : occupationalHealthcareEntry = newEntry as occupationalHealthcareEntry;
            occEntry.employerName = values.employerName;
            occEntry.sickLeave = values.sickLeave;
            return occEntry;
        case 'Hospital':
            const hospitalEntry : hospitalEntry = newEntry as hospitalEntry;
            hospitalEntry.discharge = values.discharge;
            return hospitalEntry;
    }
};

const baseValues = (values: EntryFormValues) => {
    const baseEntry : EntryFormValues = values;
    baseEntry.type = values.type;
    baseEntry.description = values.description;
    baseEntry.date = values.date;
    baseEntry.specialist = values.specialist;
    baseEntry.diagnosisCodes = values.diagnosisCodes;
    return baseEntry;
};

export { parseValues };