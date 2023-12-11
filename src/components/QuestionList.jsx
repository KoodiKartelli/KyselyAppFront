import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddAnswer from "./AddAnswer";

export default function QuestionList() {
    const [questions, setQuestions] = useState([]);
    const location = useLocation();
    const [answers, setAnswers] = useState([]);
    const [rowHeight, setRowHeight] = useState(150);

    const [columnDefs] = useState([
        { field: 'text', sortable: true, filter: true, floatingFilter: true },
        {
            cellRenderer: params => <AddAnswer addAnswer={addAnswer} questionId={params.data.questionId} options={params.data.options} />
        },
        {
            cellRenderer: (params) => (
                <Link to={`/answers?questionId=${params.data.questionId}`}>
                    <Button size="small">Answers</Button>
                </Link>
            ),
        },
    ]);

    useEffect(() => {
        const inquiryid = new URLSearchParams(location.search).get("inquiryid");
        if (inquiryid) {
            fetchQuestions(inquiryid);
        }
    }, [location]);

    const defaultColDef = {
        minWidth: 350,
    }

    const fetchQuestions = (inquiryid) => {
        fetch(`https://kyselyapp.onrender.com/inquiries/${inquiryid}/questions`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error in fetch: " + response.statusText)
                }
            })
            .then(data => setQuestions(data.questions))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        const questionId = new URLSearchParams(location.search).get("questionId");
        if (questionId) {
            getAnswers(questionId);
        }
    }, [location]);

    const addAnswer = (answer) => {
        fetch(`https://kyselyapp.onrender.com/questions/${answer.questionId}/answers`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ answer: answer.answer })
        })
            .then(response => {
                if (response.ok) {
                    getAnswers(answer.questionId);
                } else {
                    alert("Something went wrong");
                }
            })
            .catch(err => console.error(err));
    }

    const getAnswers = (questionId) => {
        fetch(`https://kyselyapp.onrender.com/questions/${questionId}/answers`)
            .then(response => response.json())
            .then(responseData => {
                setAnswers(responseData.answers)
            })
            .catch(err => console.error(err));
    }

    return (
        <>
            <div className="ag-theme-material" style={{ width: '100%', height: 500 }}>
                <AgGridReact
                    rowData={questions}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    getRowHeight={() => rowHeight}
                >
                </AgGridReact>
            </div>
        </>
    )

}