import React, { useState, useEffect } from "react";
import * as XLSX from 'xlsx';
import ShowFile from "./predictTypes/showFile";
import ShowMetrics from "./predictTypes/showMetrics";
import {Grid2, Button, TextField,  Card , CardContent, Divider} from "@mui/material"

import {useNavigate } from 'react-router-dom';

import Load from "./predictTypes/load";


function Retrain(){

    const navigate = useNavigate();

    const [hasFile, setHasFile] = useState(false);
    const [training, setTraining] = useState(false);
    const [trainF, setTrainF] = useState(false);
    const [texts, setTexts] = useState([]);
    const [labels, setLabels] = useState([]);

    const [accuracy, setAccuracy] = useState(0);
    const [recall, setRecall] = useState(0);
    const [F1, setF1] = useState(0);
    const [precision, setPrecision] = useState(0);

    const [X, setX] = useState("Textos_espanol")
    const [Y, setY] = useState("sdg")

    const handleUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            processXLSX(workbook);
        };
        reader.readAsArrayBuffer(file);
        }
    };

    const processXLSX = (workbook) => {
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        const result1 = jsonData.map((row) => row[X]); 
        const result2 = jsonData.map((row) => row[Y]); 
        setTexts(result1);
        setLabels(result2);
        setHasFile(true);
    };

    const sendInfo = () => {
        setHasFile(false);
        setTraining(true);
        
        setTimeout(() => send(), 10000)
        // send();

    }

    const send = () => {

        //recibo metricas
        let response = {
            precision: Math.random(),
            recall: Math.random(),
            F1: Math.random(),
            accuracy: Math.random()
        }

        setAccuracy(response.accuracy);
        setPrecision(response.precision);
        setRecall(response.recall);
        setF1(response.F1);

        setTraining(false)
        setTrainF(true)

    }

    return(
        <div>
            <h1 style={{fontFamily:"serif", textAlign:"left", marginLeft:"3%", marginTop:"1%"}}>Reentrenar el modelo:</h1>
            <h3 style={{fontFamily:"serif", textAlign:"left", marginLeft:"3%"}}>Seleccione un archivo .xlsx y luego verifique que haya sido cargado correctamente por el sistema</h3>

            {!hasFile && !training && !trainF && 
            (
                <Card style={{width:"50%", height:"auto", margin:"auto", marginTop:"3%"}}>
                    <CardContent>
                        <Grid2 container>
                            <Grid2 style={{marginTop:"2%"}} size={{md:12, lg:6}}>
                                <TextField style={{marginRight:"5%"}} label="Columna Texto" value={X} onChange={(e) => setX(e.target.value)}/>
                            </Grid2>
                            <Grid2 style={{marginTop:"2%"}} size={{md:12, lg:6}}>
                                <TextField label="Columna Label" value={Y} onChange={(e) => setY(e.target.value)}/>
                            </Grid2>
                            <Grid2 style={{marginTop:"3%"}} size={6}>
                                <Divider/>
                            </Grid2>
                            <Grid2 size={{md:12}}>
                                <input type="file" accept=".xlsx" onChange={handleUpload} style={{marginTop:"3%"}} />
                            </Grid2>
                        </Grid2>
                    </CardContent>
                </Card>
            )}
            {hasFile && !training && !trainF  &&
            <Grid2 container marginTop={3}>
                <Grid2 size={6}>
                    <Button onClick={()  => sendInfo()} sx={{borderColor:"green", color:"green"}} variant="outlined">Aceptar</Button>
                </Grid2>
                <Grid2 size={6}>
                    <Button onClick={() => window.location.reload()} sx={{borderColor:"red", color:"red"}} variant="outlined">Cancelar</Button>
                </Grid2>
                <Grid2 size={12}>
                    <ShowFile texts={texts} labels={labels} />
                </Grid2>
                
            </Grid2>}

            {training &&  !trainF &&
            <div>
                <Load msg={"Entrenando..."}/>
            </div>
            }

            {trainF && 
            <div>
                <Button onClick={() => navigate("/")} sx={{borderColor:"green", color:"green", marginTop:"3%"}} variant="outlined">Aceptar</Button>
                <h2 style={{marginTop:"2%", marginBottom:"2%", fontFamily: 'georgia', fontWeight: "bold"}}>Entrenamiento completado!! </h2>
                <h3 style={{marginTop:"2%", marginBottom:"2%", fontFamily: 'georgia', fontWeight: "bold"}}>Metricas obtenidas del reentrenamiento: </h3>
                <ShowMetrics recall={recall} precision={precision} F1={F1} accuracy={accuracy} />
            </div>
            }
        </div>
    )

};
export default Retrain;