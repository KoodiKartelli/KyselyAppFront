import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";

export default function InquiryList() {

    const [inquiry, setInquiry] = useState({ title: '', description: '' });
    const [inquiries, setInquiries] = useState([]);

    const [columnDefs] = useState([
        { field: 'title' },
        { field: 'description' }
    ]);

    useEffect(() => {
        fetchInquiries();
    }, [])

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
            <div className="ag-theme-material" style={{ width: '80%', height: 500 }}>
                <AgGridReact
                    rowData={inquiries}
                    columnDefs={columnDefs}
                >

                </AgGridReact>
            </div>
        </>
    )

}