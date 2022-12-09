import React from "react";
import { AgGridReact } from 'ag-grid-react';
import { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import DeleteIcon from '@mui/icons-material/Delete';
import AddProducer from "./AddProducer";
import EditProducer from "./EditProducer";

export default function Producerlist(){
    const gridRef = useRef();
    const [open, setOpen] = useState(false);
    const [producers, setProducers] = useState([]);

    const columnDefs = [
        {field: 'name', headerName: 'Producer Name' , sortable: true, filter: true},
        {width: 120, headerName: '', cellRenderer: (props) => <Button color = 'error' startIcon={<DeleteIcon/>} onClick={() => deleteProducer(props.data.producerid)}>Delete</Button>},
        {width: 120, headerName: '', cellRenderer: (props) => <EditProducer editProducer={editProducer} producer={props.data}/>},
        ]

        useEffect(() => fetchProducer(), []);

        const fetchProducer = () => {
            fetch('/api/producers')
            .then(response => response.json())
            .then(data => setProducers(data))
        }

        const addProducer = (producer) => {
            fetch('api/producers', {
                method: 'POST', 
                headers: {'Content-type' : 'application/json'},
                body: JSON.stringify(producer)
            })
            .then(response => {
                if (response.ok)
                    fetchProducer();
                else
                    alert('Something went wrong in the addition!')
            })
            .catch(err => console.error(err))
        }

        const editProducer = (producer) => {
            fetch('api/producers/' + producer.producerid, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producer)
            }) 
            .then(res => fetchProducer())
            .catch(err => console.error(err))
        }

        const deleteProducer = (producerid) => {
            if (window.confirm('Are you sure?')) {
                fetch("api/producers/" + producerid, { method: 'DELETE' })
                    .then(res => fetchProducer())
                    .catch(err => console.error(err))
            }
        }

        return (
            <div>
                <AddProducer addProducer={addProducer}/>
            <div className='ag-theme-material' style={{height: 400, width: '100%', margin:'auto'}}>
            <AgGridReact
                rowData={producers}
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
