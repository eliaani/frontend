import React from "react";
import { AgGridReact } from 'ag-grid-react';
import { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCloth from "./AddCloth";
import Snackbar from '@mui/material/Snackbar';
import Producerlist from "./ProducerList";

export default function Clothlist(){
    
    const fetchData = () => {
        fetch('/api/cloths')
        .then(response => response.json())
        .then(data => setClothes(data))
    }

    const gridRef = useRef();
    const [clothes, setClothes] = useState([]);
    const [open, setOpen] = useState(false);
    const [producer, setProducer] = useState([]);
    
    const columnDefs = [
        {field: 'name' , sortable: true, filter: true},
        {field: 'type' , sortable: true, filter: true},
        {field: 'producer', headerName: 'Producer', sortable: true, filter: true, 
        valueGetter: (params) => params.data.producer.name},
        {field: 'price' , sortable: true, filter: true},
        {width: 120,
        field: '_links.self.href',
        headerName: '',
            cellRenderer: (props) => <Button color = 'error' startIcon={<DeleteIcon />} onClick={() => deleteCloth(props.data.id)}>Delete</Button>
        }
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
      
      const deleteCloth = (id) => {
        console.log(id)
        if (window.confirm('Are you sure?')) {
            fetch("api/cloths/" + id, { method: 'DELETE' })
                .then(res => fetchData())
                .catch(err => console.error(err))
                
        }

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

console.log(clothes)

return (
    <div>
        <AddCloth addCloth={addCloth}/>
    <div className='ag-theme-material' style={{height: 650, width: '65%', margin:'auto'}}>
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
            action={deleteCloth}
            />
    </div>
)
};