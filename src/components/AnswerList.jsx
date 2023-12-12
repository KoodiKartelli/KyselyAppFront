import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "../style.css";

export default function AnswerList() {
    const [answers, setAnswers] = useState([]);
    const location = useLocation();

    const [columnDefs] = useState([
        { field: 'answer', sortable: true, filter: true, floatingFilter: true, autoHeight: true }
    ]);

    useEffect(() => {
        const questionId = new URLSearchParams(location.search).get("questionId");
        if (questionId) {
            fetchAnswers(questionId);
        }
    }, [location]);

    const fetchAnswers = (questionId) => {
        fetch(`https://kyselyapp.onrender.com/questions/${questionId}/answers`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error in fetch: " + response.statusText)
                }
            })
            .then(data => setAnswers(data.answers))
            .catch(err => console.error(err))
    }

    const defaultColDef = {
        minWidth: 350,
    }

    return (
        <>
            <div className="ag-theme-material" style={{ width: '100%', height: 500 }}>
                <AgGridReact
                    rowData={answers}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                >

                </AgGridReact>
            </div>
        </>
    )
}