import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "../style.css";

export default function AnswerList() {
    const [answers, setAnswers] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const [questionText, setQuestionText] = useState("");

    const [columnDefs] = useState([
        { field: 'answer', sortable: true, filter: true, floatingFilter: true, autoHeight: true }
    ]);

    useEffect(() => {
        const questionId = new URLSearchParams(location.search).get("questionId");
        if (questionId) {
            fetchAnswers(questionId);
            fetchQuestionText(questionId);
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
    };

    const fetchQuestionText = (questionId) => {
        fetch(`https://kyselyapp.onrender.com/questions/${questionId}/answers`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error in fetch: " + response.statusText)
                }
            })
            .then(data => setQuestionText(data.text))
            .catch(err => console.error(err))
    };

    const generateChartData = () => {
        const chartData = {};
        const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#FF5733'];
    
        answers.forEach((answer, index) => {
            if (chartData[answer.answer]) {
              chartData[answer.answer].Vastauksia++; 
            } else {
              chartData[answer.answer] = {
                Vastauksia: 1, 
                color: colors[index % colors.length],
              };
            }
          });
    
        return Object.keys(chartData).map((key) => ({
          answer: key,
          Vastauksia: chartData[key].Vastauksia,
          color: chartData[key].color
        }));
      };
    
      const defaultColDef = {
        minWidth: 350,
      };
    
      const chartData = generateChartData();
      console.log("ChartData:", chartData);

    return (
        <>
            <>
                <h2>{questionText}</h2>
            </>
            <div className="ag-theme-material" style={{ width: '100%', height: 500 }}>
                <AgGridReact
                    rowData={answers}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                >

                </AgGridReact>
            </div>
            <div style={{ width: '100%', height: 500 }}>
              <ResponsiveContainer>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="answer" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Vastauksia">
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <Button
                onClick={() => navigate(-1)}
                style={{marginTop: 30}}>
                Back To Questions
            </Button> 
        </>
    )
}