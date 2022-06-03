import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, EntryTypeOption, DiagnosisSelection } from "./FormField";
import { AdditionalFields } from "./AdditionalFields";
import { EntryFormValues } from "../types";
import { useStateValue } from "../state";
import { setAllInitialValues, validateValues } from "./FormikValues";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryOptions: EntryTypeOption[] = [
  { value: "HealthCheck", label: "Health Check" },
  { value: "OccupationalHealthcare", label: "Occupational healthcare" },
  { value: "Hospital", label: "Hospital visit" },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [ { diagnoses } ] = useStateValue();

    return (
        <Formik
        initialValues={setAllInitialValues() as EntryFormValues}
        enableReinitialize = {true}
        onSubmit={onSubmit}
        validate={(values) => {validateValues(values);}}
        >
        {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
            return (
            <Form className="form ui">
                <SelectField label="Type of entry" name="type" options={entryOptions} />
                <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
                />
                <Field
                label="Date"
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
                />
                <Field
                label="Specialist"
                placeholder="Name of the treating specialist"
                name="specialist"
                component={TextField}
                />
                <AdditionalFields/>
                <DiagnosisSelection setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} diagnoses={Object.values(diagnoses)}/>
                <Grid>
                <Grid item>
                    <Button
                    color="secondary"
                    variant="contained"
                    style={{ float: "left" }}
                    type="button"
                    onClick={onCancel}
                    >
                    Cancel
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                    style={{
                        float: "right",
                    }}
                    type="submit"
                    variant="contained"
                    disabled={!dirty || !isValid}
                    >
                    Add
                    </Button>
                </Grid>
                </Grid>
            </Form>
            );
        }}
        </Formik>
  );
};

export default AddEntryForm;
