import React, { useState } from "react";
import axios from 'axios';
import { useStateValue } from "../state";
import { Typography } from "@material-ui/core";
import { Patient, Diagnosis, Entry } from "../types";
import { apiBaseUrl } from "../constants";

const PatientPage = () => {
    const [{ patient, diagnoses }] = useStateValue();
    const [sPatient, setsPatient] = useState(patient);
    const [patientDiagnoses, setPatientDiagnoses] = useState(diagnoses);

    React.useEffect(() => {
        const getInfo = async () => {
            await axios.get<Patient>(`${apiBaseUrl}/patients/${patient.id}`)
                        .then(response => {
                            setsPatient(response.data);
                        });
        };
        void getInfo();
    }, [patient]);

    React.useEffect(() => {
        const setNewPatientDiagnoses = () => {
            const newDiagnoses: Array<Diagnosis> = [];
            sPatient.entries?.forEach(entry => {entry.diagnosisCodes?.forEach(code => {
                Object.values(diagnoses).forEach(diagnose => {
                    if(diagnose.code === code) newDiagnoses.push(diagnose);
                });
            });
            setPatientDiagnoses({...newDiagnoses as any});
        });
        };
        void setNewPatientDiagnoses();
    }, [sPatient]);

    return (
        <div className="App">
            <p></p>
            <Typography align="left" variant="h5">
                {sPatient.name}
            </Typography>
            <p>SSN: {sPatient.ssn}</p>
            <p>Occupation: {sPatient.occupation}</p>
            <Typography align="left" variant="h6">
                Entries
            </Typography>
            <ul>{sPatient.entries?.map((entry : Entry) => (
                <div key={entry.id}>
                    <li>{entry.date} {entry.description}</li>
                    <ul>{Object.values(patientDiagnoses).map((diagnosis : Diagnosis) => (
                        <li key={diagnosis.name}>{diagnosis.code} {diagnosis.name}</li>
                    ))}
                    </ul>
                </div>
                ))}
            </ul>
        </div>
    );
};

export default PatientPage;