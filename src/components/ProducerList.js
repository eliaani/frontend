import React from "react";
import { AgGridReact } from 'ag-grid-react';
import { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function Producerlist(){
    const gridRef = useRef();
    const [open, setOpen] = useState(false);
    const [producer, setProducer] = useState([]);

    const columnDefs = [
        {field: 'name', headerName: 'Producer Name' , sortable: true, filter: true},
        ]

        useEffect(() => fetchProducer(), []);

        const fetchProducer = () => {
            fetch('/api/producers')
            .then(response => response.json())
            .then(data => setProducer(data._embedded.producers))
            console.log("producer")
        }

        return (
            <div>
            <div className='ag-theme-material' style={{height: 400, width: '100%', margin:'auto'}}>
            <AgGridReact
                rowData={producer}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
                suppressCellFocus={true}
                onGridReady={params => gridRef.current = params.api}
                ref={gridRef}
                rowSelection='single'
            />
            </div>
            </div>
        )
        };
