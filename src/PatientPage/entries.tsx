
import { Entry, exactEntry, Diagnosis } from '../types';
import { assertNever } from 'assert-never';
import { useStateValue } from '../state';
import "../styles/entries.css";

const Entries = (entries : Array<Entry>): JSX.Element => {
    if(!entries){return <p></p>;}
    return(
        <div>
            <h4>Entries</h4>
            <ul>{Object.values(entries).map((entry : Entry) => {
                    return <EntryComponent key={entry.id} {...entry}/>;
                })}
            </ul>
        </div>
    );
};

const EntryComponent = ( entry : Entry ): JSX.Element => {
    const exEntry = entry as exactEntry;
    return(
        <div className="entry">
            <p>{exEntry.date}</p>
            <p>{exEntry.description}</p>
            <p>Diagnose made by {exEntry.specialist}</p>
            <Exact {...exEntry}/>
            <Diagnoses {...exEntry}/>
        </div>
    );
};

const Exact = (entry : exactEntry): JSX.Element => {

    switch(entry.type){
        case 'HealthCheck' : {
            return(
                <div>
                    <p>Standard health check</p>
                </div>
            );
        }
        case 'OccupationalHealthcare' : {
            return(
                <div>
                    <p>Occupational health care check</p>
                    <p>{entry.employerName}</p>
                    <p>Sick leave:</p>
                    <p>Starting from {entry.sickLeave?.startDate} and ending {entry.sickLeave?.endDate}</p>
                </div>
            );
        }
        case 'Hospital' : {
            return(
                <div>
                    <p>Hospital visit</p>
                    <p>Discharged at: {entry.discharge.date}</p>
                    <p>{entry.discharge.criteria}</p>
                </div>
            );
        }
        default:
            return assertNever(entry, true);
    }
};

const Diagnoses = (entry : exactEntry): JSX.Element => {
    const [{ diagnoses }] = useStateValue();
    let list : Array<Diagnosis> = [];
    Object.values(diagnoses).find(diagnose => {
        entry.diagnosisCodes?.forEach((code : string) => {
            if(code === diagnose.code){list = list.concat(diagnose);}
        });
    });

    return(
        <div>
            <h5>Diagnosis</h5>
            <ul>{Object.values(list).map((diagnosis : Diagnosis) => {
                return <li key={diagnosis.name}>{diagnosis.code} {diagnosis.name}</li>;
            })}
            </ul>
        </div>
    );
};

export { Entries };