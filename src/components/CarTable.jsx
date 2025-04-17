import { useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react"
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

function CarTable({ cars, deleteCar, editCar }) {

    const [colDefs, setColDefs] = useState([
        { field: "brand" },
        { field: "model" },
        { field: "color" },
        { field: "fuel" },
        { field: "modelYear" },
        { field: "price" },
        {
            headerName: "Actions",
            minWidth: 200,
            filter: false,
            sortable: false,
            cellRenderer: (params) => (
                <>
                    <Button
                        size="small"
                        onClick={() => editCar(params.data._links.self.href)}>
                        Edit
                    </Button>
                    <Button
                        size="small"
                        color="error" endIcon={<DeleteIcon />}
                        onClick={() => deleteCar(params.data._links.self.href)}>
                    </Button>
                </>
            )
        }
    ]);

    const columSettings = {
        flex: 1,
        filter: true,
        floatingFilter: true
    }
    const gridRef = useRef();


    return (
        <div style={{ height: 500 }}>
            <AgGridReact
                key={cars.length}
                rowData={cars}
                columnDefs={colDefs}
                ref={gridRef}
                onGridReady={params => gridRef.current = params.api}
                defaultColDef={columSettings}
                pagination={true}
                paginationPageSize={10}
            />
        </div>
    )

}
export default CarTable; 