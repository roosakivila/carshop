import React from 'react';
import { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';


function AddCar(props) {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        modelYear: '',
        price: ''
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value });
    }

    const addCar = () => {
        props.saveCar(car);
        handleClose();
        setCar({
            brand: '',
            model: '',
            color: '',
            fuel: '',
            modelYear: '',
            price: ''
        })
    }

    return (
        <>
            <Button sx={{ margin: '8px' }} variant="outlined" onClick={handleClickOpen}>
                Add car
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Add car</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="brand"
                        value={car.brand}
                        label="Brand"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        name="model"
                        value={car.model}
                        label="Model"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="color"
                        value={car.color}
                        label="Color"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        name="fuel"
                        value={car.fuel}
                        label="Fuel"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="modelYear"
                        value={car.modelYear}
                        label="Year"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        name="price"
                        value={car.price}
                        label="Price"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                        variant="standard"
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" onClick={addCar}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddCar;