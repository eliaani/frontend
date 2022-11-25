import React from "react";
import { AgGridReact } from 'ag-grid-react';
import { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Clothlist(){

    const gridRef = useRef();
    const [clothes, setClothes] = useState([]);
    const [open, setOpen] = useState(false);
    
    const columnDefs = [
        {field: 'name' , sortable: true, filter: true},
        {field: 'type' , sortable: true, filter: true},
        {field: 'producer' , sortable: true, filter: true},
        {field: 'price' , sortable: true, filter: true}
    ]


    useEffect(() => fetchData(), []);


    const fetchData = () => {
        fetch('/api/cloths')
        .then(response => response.json())
        .then(data => setClothes(data._embedded.cloths))
        console.log("clothes")
    }

    const deleteClothes = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
        setClothes(clothes.filter((cloth, index) =>
        index !== gridRef.current.getSelectedNodes()[0].childIndex));
        setOpen(true);
        } else {
          alert('Select row first!');
        }
      }

return (
    <div>
        <Button startIcon={<DeleteIcon/>} onClick={deleteClothes} variant="contained">Delete</Button>
    <div className='ag-theme-material' style={{height: 650, width: '100%', margin:'auto'}}>
    <AgGridReact
        rowData={clothes}
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