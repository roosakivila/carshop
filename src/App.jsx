
import CarsApi from './components/CarApi.jsx'
import { AppBar, CssBaseline, Typography } from '@mui/material'



function App() {


  return (
    <>
      <CssBaseline />
      <AppBar position='static' >
        <Typography variant='h3' component="h1" margin={2}>Carshop</Typography>
      </AppBar>
      <CarsApi />
    </>
  )
}

export default App
