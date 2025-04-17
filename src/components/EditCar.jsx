import React from 'react';
import { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function EditCar({ open, handleClose, car, updateCar }) {

    const [formData, setFormData] = useState({ ...car });

    useEffect(() => {
        if (car) {
            setFormData(car);
        }
    }, [car]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        const id = car._links.self.href.split("/cars/")[1];
        updateCar(formData, id);
        handleClose();
    };

    if (!car) return null;

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Car</DialogTitle>
                <DialogContent>
                    {["brand", "model", "color", "fuel", "modelYear", "price"].map(field => (
                        <TextField
                            key={field}
                            name={field}
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={formData[field] || ''}
                            onChange={handleChange}
                            margin="dense"
                            fullWidth
                            variant="standard"
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditCar;