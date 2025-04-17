import { useCallback, useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import CarTable from "./CarTable";
import AddCar from "./AddCar";
import EditCar from "./EditCar";


function CarsApi() {

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");


    const fetchCars = useCallback(async () => {
        await fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars')
            .then(response => {
                if (!response.ok)
                    throw new Error("Virhe hakuprosessissa")
                return response.json();
            })
            .then(responseData => {
                console.log(responseData);
                setCars(responseData._embedded.cars);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            })
    }, []);

    useEffect(() => {
        fetchCars();
    }, [fetchCars]);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const deleteCar = async (href) => {
        const id = extractIdFromHref(href)
        if (!id) {
            console.error("Could not extract car ID from:", href);
            return;
        }
        console.log("Deleting car with ID:", id);

        try {
            const response = await fetch(`https://car-rest-service-carshop.2.rahtiapp.fi/cars/${id}`, {
                method: "DELETE",
            });
            if (response.status === 204 || response.status === 200) {
                console.log("Car deleted successfully");

                setTimeout(async () => {
                    await fetchCars();
                }, 50);

                setSnackbarOpen(true);
                setSnackbarSeverity("success");
                setSnackbarMessage("Car deleted successfully!");
            } else if (response.status === 404) {
                console.warn("Car not found for deletion.");
                setSnackbarOpen(true);
                setSnackbarSeverity("error");
                setSnackbarMessage("Car not found for deletion.");
            } else {
                console.error("Error deleting car. Status:", response.status);
                setSnackbarOpen(true);
                setSnackbarSeverity("error");
                setSnackbarMessage("Error deleting car.");
            }
        } catch (error) {
            console.error("Error deleting car:", error);
            setSnackbarSeverity("error");
            setSnackbarMessage("Error deleting car: " + error.message);
            setSnackbarOpen(true);
        }
    };

    const extractIdFromHref = (href) => {
        const match = /\/cars\/(\d+)/.exec(href);
        return match ? match[1] : null;
    };

    const saveCar = (car) => {
        fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to save car');
                }
                return fetchCars();
            })
            .catch(err => console.error(err))
        setSnackbarOpen(true);
        setSnackbarSeverity("success");
        setSnackbarMessage("Car added successfully");
    }

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);

    const updateCar = (car, id) => {
        fetch(`https://car-rest-service-carshop.2.rahtiapp.fi/cars/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
            .then(response => {
                if (!response.ok) throw new Error("Failed to update car");
                return response;
            })
            .then(() => {
                fetchCars();
                setSnackbarOpen(true);
                setSnackbarSeverity("success");
                setSnackbarMessage("Car updated successfully!");
            })
            .catch(err => {
                console.error(err);
                setSnackbarOpen(true);
                setSnackbarSeverity("error");
                setSnackbarMessage("Error updating car");
            });
    };

    const handleEditClick = (href) => {
        const car = cars.find(c => c._links.self.href === href);
        setSelectedCar(car);
        setEditDialogOpen(true);
    };

    return (
        <div>
            <EditCar open={editDialogOpen}
                handleClose={() => setEditDialogOpen(false)}
                car={selectedCar}
                updateCar={updateCar} />
            <AddCar saveCar={saveCar} />
            {loading && <p>Loading cars...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {!loading && !error &&
                <CarTable cars={cars} deleteCar={deleteCar} editCar={handleEditClick} />}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    )

}

export default CarsApi;