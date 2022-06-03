import React, { useState } from "react";
import axios from 'axios';
import { useStateValue } from "../state";
import { Typography, Button } from "@material-ui/core";
import AddEntryModal from "../AddEntryModal";
import { Patient, Entry, EntryFormValues } from "../types";
import { Entries } from "./entries";
import { apiBaseUrl } from "../constants";
import { parseValues } from "./entryValues";

const PatientPage = () => {

    const [{ patient }] = useStateValue();
    const [sPatient, setsPatient] = useState(patient);
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();
  
    const openModal = (): void => setModalOpen(true);
  
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };
  
    const submitNewEntry = async (values : EntryFormValues) => {
        console.log(values);
        const parsedValues : EntryFormValues = parseValues(values);
        try {
            const { data: newEntry } = await axios.post<Entry>(
                `${apiBaseUrl}/patients/:${sPatient.id}`,
                parsedValues
            );
            if(!sPatient.entries){sPatient.entries = [];}
            sPatient.entries.push(newEntry);
            closeModal();
            } catch (e: unknown) {
                if (axios.isAxiosError(e)) {
                    console.error(e?.response?.data || "Unrecognized axios error");
                    setError(String(e?.response?.data?.error) || "Unrecognized axios error");
                } else {
                    console.error("Unknown error", e);
                    setError("Unknown error");
                }
            }
    };

    React.useEffect(() => {
        const getInfo = async () => {
            await axios.get<Patient>(`${apiBaseUrl}/patients/${patient.id}`)
                        .then(response => {
                            setsPatient(response.data);
                        });
        };
        void getInfo();
    }, [patient, patient.entries]);

    return (
        <div className="App">
            <p></p>
            <Typography align="left" variant="h5">
                {sPatient.name}
            </Typography>
            <p>SSN: {sPatient.ssn}</p>
            <p>Occupation: {sPatient.occupation}</p>
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button variant="contained" onClick={() => openModal()}>
                Add New Entry
            </Button>
            <Entries {...sPatient.entries as Array<Entry>}/>
        </div>
    );
};

export default PatientPage;