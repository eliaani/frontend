import React from 'react';
import Button from '@mui/material/Button';
import { useState, useEffect, useRef } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';


export default function EditProducer(props) {
    const [open, setOpen] = React.useState(false);
    const [producer, setProducer] = React.useState({})

    const handleClickOpen = () => {
        setProducer(props.producer)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateProducer = () => {
        props.editProducer(producer)
        handleClose()
    }

    console.log(producer);

    return ( 
        <div>
            <Button variant='outlined' onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit producer</DialogTitle>
            <DialogContent>
                <TextField
                margin='dense'
                label='name'
                value={producer.name}
                onChange={e => setProducer({...producer, name: e.target.value})}
                fullWidth
                variant='standard'
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={updateProducer}>Save</Button>
            </DialogActions>
            </Dialog>
        </div>
    );
}