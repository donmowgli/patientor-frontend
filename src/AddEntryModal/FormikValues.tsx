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
            if (!OccValues.employerName) {
                errors.employerName = requiredError;
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
            if (!hosValues.discharge.criteria) {
                errors.dischargeCriteria = requiredError;
            }
            if (!hosValues.discharge.date) {
                errors.dischargeDate = requiredError;
            }
            return errors;
    }
};

const validateAll = (values : EntryFormValues | any) => {
    const requiredError = "Field is required";
    const errors: { [field: string]: string } = {};
    if (!values.description) {
        errors.description = requiredError;
    }
    if (!values.date) {
        errors.date = requiredError;
    }
    if (!values.specialist) {
        errors.specialist = requiredError;
    }
    if (!values.healthCheckRating) {
        errors.healthCheckRating = requiredError;
    }
    if (!values.discharge.criteria) {
        errors.dischargeCriteria = requiredError;
    }
    if (!values.discharge.date) {
        errors.dischargeCriteria = requiredError;
    }
    return errors;
};

const validateField = (value: string) => {
    const requiredError = "Field is required";
    if(!value) return requiredError;
};

export { setInitialValues, setAllInitialValues, validateValues, validateAll, validateField };