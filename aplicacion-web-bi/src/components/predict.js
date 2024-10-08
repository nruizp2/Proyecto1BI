import {Select, MenuItem, Box, FormControl, FormHelperText} from "@mui/material"
import React from "react";

import FilePredict from "./predictTypes/file"
import Manual  from "./predictTypes/manual";

function Predict(){

    const [tipo, setTipo] = React.useState(-1);

    const handleChange = (event) => {
      setTipo(event.target.value);
    };


    return(
        <div>
            <h1 style={{fontFamily:"serif", textAlign:"left", marginLeft:"3%", marginTop:"1%"}}>Predecir textos:</h1>
            <h3 style={{fontFamily:"serif", textAlign:"left", marginLeft:"3%"}}>Seleccione como quiere introducir sus datos (manual o subiendo un archivo)</h3>
            <Box sx={{ maxWidth:200, marginTop:4, marginLeft:4 }}>
                <FormHelperText>Tipo de Predicción</FormHelperText>
                <FormControl fullWidth>
                    <Select value={tipo} onChange={handleChange}>
                        <MenuItem value={-1}>Seleccionar</MenuItem>
                        <MenuItem value={0}>Manual</MenuItem>
                        <MenuItem value={1}>Subir Archivo</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {(tipo===1) && <FilePredict/>}
            {(tipo===0) && <Manual/>}
        </div>
    )

};
export default Predict;