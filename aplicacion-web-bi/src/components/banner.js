import {Grid2, Button, IconButton} from "@mui/material"
import 'bootstrap/dist/css/bootstrap.css';
import '../css/banner.css'

import {useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import logo from "../images/unfpa.png"
import logoSm from "../images/unfpa-small.png"
import uniandes from "../images/uniandes.png"

function Banner(){

    const location = useLocation();
    const navigate = useNavigate();

    const [selectedImage, setImage] = useState(logo)

    useEffect(() => {
        window.addEventListener("resize", () => setImage((window.innerWidth < 1000)? logoSm: logo))
    },[])

    return(
        <div>
            <Grid2 container>
                <Grid2 size = {1}>
                    <img onClick={() => navigate("/")} src={uniandes} className="logo-uniandes"></img>
                </Grid2>
                <Grid2 size = {4}>
                </Grid2>
                <Grid2 size={1} position={"relative"}>
                    <img style={{height:"auto", width:"100%"}} onClick={() => navigate("/")} src={selectedImage} className="logo-banner"></img>
                </Grid2>
                <Grid2 size={3}>
                    <p className="p-banner">Fondo de Población de las Naciones Unidas</p>
                </Grid2>
            </Grid2>
            <Grid2 container className="banner-buttons" spacing={2}>
                <Grid2 size={{lg:2, md:12, sm:12,xs:12}}>
                    <Button variant="outlined" onClick={() => navigate("/home")} sx={{color:"white",  borderColor:((location.pathname === "/home")? "orange": "white") }}>Inicio</Button>
                </Grid2>
                <Grid2 size={{lg:1, md:12, sm:12,xs:12}}>
                    <Button variant="outlined" onClick={() => navigate("/predict")} sx={{color:"white", borderColor:((location.pathname === "/predict")? "orange": "white")}}>Predecir</Button>
                </Grid2>
                <Grid2 size={{lg:1, md:12, sm:12,xs:12}}>
                    <Button variant="outlined" onClick={() => navigate("/retrain")} sx={{color:"white", borderColor:((location.pathname === "/retrain")? "orange": "white")}}>Reentrenar</Button>
                </Grid2>
            </Grid2>
        </div>
    )
};

export default Banner;