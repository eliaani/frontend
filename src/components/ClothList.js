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
import EditCloth from "./EditCloth";

export default function Clothlist(){
    
    const gridRef = useRef();
    const [clothes, setClothes] = useState([]);
    const [producers, setProducers] = useState([]);
    const [open, setOpen] = useState(false);

    const columnDefs = [
        {field: 'name' , sortable: true, filter: true},
        {field: 'type' , sortable: true, filter: true},
        {field: 'producer', headerName: 'Producer', sortable: true, filter: true, valueGetter: (params) => params.data.producer.name},
        {field: 'price' , sortable: true, filter: true},
        {width: 120, headerName: '', cellRenderer: (props) => <Button color = 'error' startIcon={<DeleteIcon />} onClick={() => deleteCloth(props.data.id)}>Delete</Button>},
        {width: 120, headerName: '', cellRenderer: (props) => <EditCloth editCloth={editCloth} cloth={props.data} producers={producers}/>},
    ]

    const fetchCloths = () => {
        fetch('/api/cloths')
        .then(response => response.json())
        .then(data => setClothes(data))
    }

    const fetchProducers = () => {
        fetch('/api/producers')
        .then(response => response.json())
        .then(data => setProducers(data))
    }

    useEffect(() => {fetchCloths();fetchProducers()}, []);

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
                .then(res => fetchCloths())
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
            fetchCloths();
        else
            alert('Something went wrong in the addition!')
    })
    .catch(err => console.error(err))
}

const editCloth = (cloth) => {
    fetch('api/cloths/' + cloth.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cloth)
    }) 
    .then(res => fetchCloths())
    .catch(err => console.error(err))
}

return (
    <div>
        <AddCloth addCloth={addCloth} producers={producers}/>
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