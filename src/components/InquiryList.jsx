import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "../style.css";


export default function InquiryList() {

    const [inquiry, setInquiry] = useState({ title: '', description: '' });
    const [inquiries, setInquiries] = useState([]);

    const [columnDefs] = useState([
        { field: 'title', sortable: true, filter: true, floatingFilter: true },
        { field: 'description', cellStyle: { whiteSpace: 'normal' }, autoHeight: true },
        {
            cellRenderer: (params) => (
                <Link to={`/questions?inquiryid=${params.data.inquiryid}`}>
                    <Button size="small">Questions</Button>
                </Link>
            ),
        },
    ]);

    useEffect(() => {
        fetchInquiries();
    }, [])

    const defaultColDef = {
        minWidth: 350,
        rowHeight: 100,
    }

    const fetchInquiries = () => {
        fetch('https://kyselyapp.onrender.com/inquiries')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error in fetch: " + response.statusText)
                }
            })
            .then(data => setInquiries(data))
            .catch(err => console.error(err))
    }

    return (
        <>
            <div className="ag-theme-material" style={{ height: '700px', width: '95%', margin: 'auto' }}>
                <AgGridReact
                    rowData={inquiries}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    domLayout='autoHeight'
                >
                </AgGridReact>
            </div>
        </>
    )

}