import React, { useState } from "react";
import axios from 'axios';
import { useStateValue } from "../state";
import { Typography } from "@material-ui/core";
import { Patient, Entry } from "../types";
import { Entries } from "./entries";
import { apiBaseUrl } from "../constants";

const PatientPage = () => {
    const [{ patient }] = useStateValue();
    const [sPatient, setsPatient] = useState(patient);

    React.useEffect(() => {
        const getInfo = async () => {
            await axios.get<Patient>(`${apiBaseUrl}/patients/${patient.id}`)
                        .then(response => {
                            setsPatient(response.data);
                        });
        };
        void getInfo();
    }, [patient]);

    return (
        <div className="App">
            <p></p>
            <Typography align="left" variant="h5">
                {sPatient.name}
            </Typography>
            <p>SSN: {sPatient.ssn}</p>
            <p>Occupation: {sPatient.occupation}</p>
            <Entries {...sPatient.entries as Array<Entry>}/>
        </div>
    );
};

export default PatientPage;