import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useLocation } from "react-router-dom";

export default function QuestionList() {
    const [question, setQuestion] = useState({ text: '' });
    const [questions, setQuestions] = useState([]);
    const location = useLocation();

    const [columnDefs] = useState([
        { field: 'text' }
    ]);

    useEffect(() => {
        const inquiryid = new URLSearchParams(location.search).get("inquiryid");
        if (inquiryid) {
          fetchQuestions(inquiryid);
        }
    }, [location]);

    const fetchQuestions = () => {
        fetch(`https://kyselyapp.onrender.com/questions?inquiryid=${inquiryid}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error in fetch: " + response.statusText)
                }
            })
            .then(data => setQuestions(data))
            .catch(err => console.error(err))
    }

    return (
        <>
            <div className="ag-theme-material" style={{ width: '80%', height: 500 }}>
                <AgGridReact
                    rowData={questions}
                    columnDefs={columnDefs}
                >

                </AgGridReact>
            </div>
        </>
    )

}