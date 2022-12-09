import React from 'react';
import Button from '@mui/material/Button';
import { useState, useEffect, useRef } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';


export default function EditCloth(props) {
    const [open, setOpen] = React.useState(false);
    const [cloth, setCloth] = React.useState({})

    const handleClickOpen = () => {
        setCloth({...props.cloth, producer: props.cloth.producer.producerid})
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateCloth = () => {
        const producer = props.producers.find(producer => producer.producerid === cloth.producer)
        props.editCloth({...cloth, producer})   
        handleClose()
    }

    console.log(cloth);

    return (
        <div>
            <Button variant='outlined' onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Cloth</DialogTitle>
                <DialogContent>
                    <TextField
                        margin='dense'
                        label='name'
                        value={cloth.name}
                        onChange={e => setCloth({ ...cloth, name: e.target.value })}
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        margin='dense'
                        label='type'
                        value={cloth.type}
                        onChange={e => setCloth({ ...cloth, type: e.target.value })}
                        fullWidth
                        variant='standard'
                    />   <TextField
                        margin='dense'
                        label='producer'
                        select
                        value={cloth.producer}
                        onChange={e => setCloth({ ...cloth, producer: e.target.value })}
                        fullWidth
                        variant='standard'
                    >
                        {props.producers.map((option) => (
                            <MenuItem key={option.producerid} value={option.producerid}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        margin='dense'
                        label='price'
                        type='number'
                        format='number'
                        value={cloth.price}
                        onChange={e => setCloth({ ...cloth, price: +e.target.value })}
                        fullWidth
                        variant='standard'
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={updateCloth}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}