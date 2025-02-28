import { Field, useFormikContext } from 'formik';
import { EntryFormValues } from '../types';
import { NumberField, TextField } from './FormField';
import { validateField } from './FormikValues';

const AdditionalFields = (): JSX.Element => {
    const { values } = useFormikContext();
    const formValues : EntryFormValues = values as EntryFormValues;
    const type : string = formValues.type;
    switch (type) {
        case 'HealthCheck':
        return(
            <Field
            label="Health check rating"
            placeholder="Health check rating"
            name="healthCheckRating"
            min="0"
            max="4"
            component={NumberField}
            validate={validateField}
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
                validate={validateField}
                />
                <Field
                label="Starting date of potential sick leave"
                placeholder="Starting date"
                name="sickLeave.startDate"
                component={TextField}
                />
                <Field
                label="Ending date of potential sick leave"
                placeholder="Ending date"
                name="sickLeave.endDate"
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
                name="discharge.date"
                component={TextField}
                validate={validateField}
                />
                <Field
                label="Discharge criteria"
                placeholder="Criteria"
                name="discharge.criteria"
                component={TextField}
                validate={validateField}
                />
            </div>
        );
    }
    return <p></p>;
};

export {AdditionalFields};