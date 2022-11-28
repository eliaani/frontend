import React from "react";
import { AgGridReact } from 'ag-grid-react';
import { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCloth from "./AddCloth";
import Snackbar from '@mui/material/Snackbar';

export default function Clothlist(){

    const gridRef = useRef();
    const [clothes, setClothes] = useState([]);
    const [open, setOpen] = useState(false);
    
    const columnDefs = [
        {field: 'name' , sortable: true, filter: true},
        {field: 'type' , sortable: true, filter: true},
        {field: 'producer' , sortable: true, filter: true},
        {field: 'price' , sortable: true, filter: true},
        {width: 120,
        cellRenderer: params => <Button color = 'error' startIcon={<DeleteIcon />} onClick={() => deleteClothes(params.data)}>Delete</Button>}
    ]


    useEffect(() => fetchData(), []);

    const handleClick = () => {
        setOpen(true);
      };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    }
    
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
        handleClick();
      }


    const addCloth = (cloth) => {
    fetch('api/cloths', {
        method: 'POST', 
        headers: {'Content-type' : 'application/json'},
        body: JSON.stringify(cloth)
    })
    .then(response => {
        if (response.ok)
            fetchData();
        else
            alert('Something went wrong in the addition!')
    })
    .catch(err => console.error(err))
}



return (
    <div>
        <AddCloth addCloth={addCloth}/>
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
    <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Cloth deleted successfully"
            action={deleteClothes}
            />
    </div>
)
};