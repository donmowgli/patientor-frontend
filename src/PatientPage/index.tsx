import React, { useState } from "react";
import axios from 'axios';
import { useStateValue } from "../state";
import { Typography } from "@material-ui/core";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";

const PatientPage = () => {
    const [{ patient }] = useStateValue();
    const [sPatient, setsPatient] = useState(patient);

    const getInfo = async () => {
        await axios.get<Patient>(`${apiBaseUrl}/patients/${patient.id}`)
                    .then(response => {
                        setsPatient(response.data);
                    });
    };
    void getInfo();

    return (
        <div className="App">
            <p></p>
            <Typography align="left" variant="h5">
                {sPatient.name}
            </Typography>
            <p>SSN: {sPatient.ssn}</p>
            <p>Occupation: {sPatient.occupation}</p>
        </div>
    );
};

export default PatientPage;