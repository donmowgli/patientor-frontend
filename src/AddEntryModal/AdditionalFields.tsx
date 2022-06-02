import { Field } from 'formik';
import { NumberField, TextField } from './FormField';

const AdditionalFields = (type : string): JSX.Element => {
    switch (type) {
        case 'HealthCheck':
        return(
            <Field
            label="Health check rating"
            placeholder="Health check rating"
            name="healthCheckRating"
            component={NumberField}
            />
        );
        case 'OccupationalHealthcare':
        return(
            <div>
                <Field
                label="Name of the Employer"
                placeholder="Employer name"
                name="employerName"
                component={TextField}
                />
                <Field
                label="Starting date of potential sick leave"
                placeholder="Starting date"
                name="startDate"
                component={TextField}
                />
                <Field
                label="Ending date of potential sick leave"
                placeholder="Ending date"
                name="endDate"
                component={TextField}
                />
            </div>
        );
        case 'Hospital':
        return(
            <div>
                <Field
                label="Discharge date"
                placeholder="Date of discharge"
                name="date"
                component={TextField}
                />
                <Field
                label="Discharge criteria"
                placeholder="Criteria"
                name="criteria"
                component={TextField}
                />
            </div>
        );
    }
    return <p></p>;
};

export {AdditionalFields};