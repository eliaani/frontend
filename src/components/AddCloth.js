import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState, useEffect, useRef } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem } from '@mui/material';

export default function AddCloth(props) {
    const [open, setOpen] = React.useState(false);
    const [cloth, setCloth] = React.useState({
       name: '',
       type: '',
       producer: '',
       price: '',
    })
    const handleClickOpen = () => {
        setOpen(true);
    }
    
      const handleClose = () => {
        setOpen(false);
    }
    
      const handleSave = () => {
        props.addCloth(cloth);
        setOpen(false);
    }

    const [producers, setProducers] = useState([]);

    const fetchData2 = () => {
        fetch('/api/producers')
        .then(response => response.json())
        .then(data => setProducers(data))
    }

    useEffect(() => fetchData2, []);

    return ( 
        <div>
            <Button variant='outlined' onClick={handleClickOpen}>
                Add Cloth
            </Button>
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Cloth</DialogTitle>
            <DialogContent>
                <TextField
                margin='dense'
                label='name'
                value={cloth.name}
                onChange={e => setCloth({...cloth, name: e.target.value})}
                fullWidth
                variant='standard'
                />
                   <TextField
                margin='dense'
                label='type'
                value={cloth.type}
                onChange={e => setCloth({...cloth, type: e.target.value})}
                fullWidth
                variant='standard'
                />   <TextField
                margin='dense'
                label='producer'
                select
                value={cloth.producer}
                onChange={e => setCloth({...cloth, producer: e.target.value})}
                fullWidth
                variant='standard'
                >
                {producers.map((option) => (
                    <MenuItem key={option.producerid} value={option}>
                        {option.name}
                    </MenuItem>
                    ))}
                </TextField> 

                    <TextField
                margin='dense'
                label='price'
                value={cloth.price}
                onChange={e => setCloth({...cloth, price: e.target.value})}
                fullWidth
                variant='standard'
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
            </Dialog>
        </div>
    );
}