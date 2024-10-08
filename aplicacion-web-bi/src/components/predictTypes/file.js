import React, { useState, useEffect } from "react";
import {TextField, Card, CardContent, Divider} from "@mui/material"
import * as XLSX from 'xlsx';
import ShowResults from "./showResults";

function FilePredict(){

    const [hasFile, setHasFile] = useState(false);
    const [list, setList] = useState([])
    const [nameC, setNameC] = useState("Textos_espanol")

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
        const result = jsonData.map((row) => row[nameC]).filter(Boolean); 
        setList(result);
        setHasFile(true)
    };
    return(
        <div>
            {!hasFile && 
            (
                <Card style={{width:"30%", height:"auto", margin:"auto", marginTop:"2%"}}>
                    <CardContent>
                        <div style={{marginBottom:"5%"}}>
                        <TextField label="Nombre columna" value={nameC} onChange={(e) => setNameC(e.target.value)}/>
                        </div>

                        <Divider/>

                        < input style={{marginTop:"5%"}} type="file" accept=".xlsx" onChange={handleUpload} />
                    </CardContent>
                </Card >
            )}
            {hasFile && <ShowResults texts={list} />}
        </div>
    )
};

export default FilePredict;