import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState, useEffect, useRef } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem } from '@mui/material';

export default function AddProducer(props) {
    const [open, setOpen] = React.useState(false);
    const [producer, setProducer] = React.useState({})
    const handleClickOpen = () => {
        setOpen(true);
    }
    
      const handleClose = () => {
        setOpen(false);
        setProducer({});
    }
    
      const handleSave = () => {
        props.addProducer(producer);
        setOpen(false);
        setProducer({});
    }

    return ( 
        <div>
            <Button variant='outlined' onClick={handleClickOpen}>
                Add Producer
            </Button>
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Producer</DialogTitle>
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
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
            </Dialog>
        </div>
    );
}