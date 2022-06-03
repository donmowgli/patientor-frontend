import { EntryFormValues, healthCheckEntry, hospitalEntry, occupationalHealthcareEntry } from "../types";

const setInitialValues = (type : string) =>{
    switch(type){
        case 'HealthCheck':
            return({
                type: "HealthCheck",
                description: "",
                date: "",
                specialist: "",
                healthCheckRating: 0
            });
        case 'OccupationalHealthCare':
            return({
                type: "OccupationalHealthCare",
                description: "",
                date: "",
                specialist: "",
                employerName: "",
                sickLeave: [{}]
            });
        case 'Hospital':
            return({
                type: "Hospital",
                description: "",
                date: "",
                specialist: "",
                discharge: [{}]
            });
    }
};

const setAllInitialValues = () => {
    return(
        {
            type: "Hospital",
            date: "",
            specialist: "",
            description: "",
            diagnosisCodes: [],
            healthCheckRating: 0,
            discharge: {
              date: "",
              criteria: "",
            },
            sickLeave: {
                startDate: "",
                endDate: "",
            },
          }
    );
};

const validateValues = (values : EntryFormValues) => {
    const type = values.type;
    const requiredError = "Field is required";
    const errors: { [field: string]: string } = {};

    switch(type){
        case 'HealthCheck':
            const hcValues = values as healthCheckEntry;
            if (!hcValues.description) {
                errors.description = requiredError;
            }
            if (!hcValues.date) {
                errors.date = requiredError;
            }
            if (!hcValues.specialist) {
                errors.specialist = requiredError;
            }
            if (!hcValues.healthCheckRating) {
                errors.healthCheckRating = requiredError;
            }
            return errors;
        case 'OccupationalHealthcare':
            const OccValues = values as occupationalHealthcareEntry;
            if (!OccValues.description) {
                errors.description = requiredError;
            }
            if (!OccValues.date) {
                errors.date = requiredError;
            }
            if (!OccValues.specialist) {
                errors.specialist = requiredError;
            }
            return errors;
        case 'Hospital':
            const hosValues = values as unknown as hospitalEntry;
            if (!hosValues.description) {
                errors.description = requiredError;
            }
            if (!hosValues.date) {
                errors.date = requiredError;
            }
            if (!hosValues.specialist) {
                errors.specialist = requiredError;
            }
            if (!hosValues.specialist) {
                errors.specialist = requiredError;
            }
            return errors;
    }
};

export { setInitialValues, setAllInitialValues, validateValues };