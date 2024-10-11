import 'bootstrap/dist/css/bootstrap.min.css';
import ods_3 from "../../images/ods_3.jpg";
import ods_4 from "../../images/ods_4.jpg";
import ods_5 from "../../images/ods_5.jpg";
import React, { useState, useEffect } from "react";
import Pagination from '@mui/material/Pagination';
import Probabilities from './probabilities';
import Load from './load';
import { Button } from '@mui/material';
import {useNavigate } from 'react-router-dom';


function ShowResults({ texts }) {
    const navigate = useNavigate();
    const [predictions, setPredictions] = useState(null);
    const [page, setPage] = useState(1);
    const [classes, setClasses] = useState([]);
    const [probs, setProbs] = useState([])

    const itemsPerPage = 4;

    const ods_to_img = {
        3: ods_3,
        4: ods_4,
        5: ods_5
    };

    const get = async () => {
        try {
            const url = `http://localhost:3001/predict`;
            
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({
                    "texts": texts,
                })
            });
            if (!response.ok) {
                throw new Error("Error")
            }
            const data = await response.json();    
            setPredictions(data["predictions"])
            setProbs(data["probabilities"])
            setClasses(data["classes"])
        } catch (error) {
            alert("Error, redirigiendo a la pagina principal")
            navigate("/");
        }
    };

    useEffect(() => {
        get()

    }, []);

    const handleChange = (event, value) => {
        setPage(value);
    };

    const startIndex = (page - 1) * itemsPerPage;
    const selectedTexts = texts.slice(startIndex, startIndex + itemsPerPage);
    const selectedPredictions = predictions ? predictions.slice(startIndex, startIndex + itemsPerPage) : [];
    const selectedProbs = probs ? probs.slice(startIndex, startIndex + itemsPerPage) : [];

    if (predictions === null) {
        return (
            <Load msg={"Cargando..."}/>
        );
    }

    return (
        <div style={{ marginLeft: "5%", marginRight: "5%"}}>
            <Button sx={{borderColor:"#303444", color:"#303444"}} variant="outlined"  onClick={() => window.location.reload()}>Terminar</Button>
            <Pagination
                count={Math.ceil(texts.length / itemsPerPage)}
                page={page}
                onChange={handleChange}
                color="primary"
                style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom:"2%" }}
            />
            <table className='table table-striped table-bordered table-responsive'>
                <thead>
                    <tr>
                        <th>Texto</th>
                        <th>Predicción</th>
                        <th>Probabilidades</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedTexts.map((t, i) => (
                        <tr key={i}>
                            <td>
                                <p style={{ textAlign: "justify" }}>{t}</p>
                            </td>
                            <td>
                                <img src={ods_to_img[selectedPredictions[i]]} style={{ height: "100px", width: "100px", margin: "auto", display: "block", alignSelf: "center" }} alt="ODS" />
                            </td>
                            <td>
                                <Probabilities classes={classes} probs = {selectedProbs[i]}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination
                count={Math.ceil(texts.length / itemsPerPage)}
                page={page}
                onChange={handleChange}
                color="primary"
                style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
            />
        </div>
    );
}

export default ShowResults;
