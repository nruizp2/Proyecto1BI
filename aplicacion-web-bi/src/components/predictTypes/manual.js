import React, { useState, useEffect } from "react";
import {Button,TextField} from "@mui/material"

import ShowResults from "./showResults";

function Manual(){

    const [isPredict, setIsPredict] = useState(false)
    const [texts, setTexts] = useState([""])

    const addText = () => {
        let texts_ = [...texts];
        texts_.push("")
        setTexts(texts_)
    };

    const editText = (e, index) => {
        let texts_ = [...texts];
        texts_[index] = e.target.value
        setTexts(texts_)
    }

    const deleteText = (index) => {
        let texts_ = [...texts];
        texts_.splice(index, 1);
        setTexts(texts_)
    }

    useEffect(() => {
        window.addEventListener("keydown", (e) => (e.key === "Enter")? setIsPredict(true): null)
    },[]);


    return(
        <div>
            {!isPredict && (
                <div>
                        <div style={{alignItems:"start", display:"flex", marginBottom:"3%"}}>
                            <Button sx={{borderColor:"green", color:"green", marginTop:3, marginLeft:4, marginBottom:3, margin:"auto"}} variant="outlined" onClick={() => setIsPredict(true)}>Predecir</Button>
                        </div>
                        <div style={{marginLeft:"5%", marginRight:"5%"}}>
                            <table className='table table-striped table-bordered table-responsive'>
                                <thead>
                                    <tr>
                                        <th>Texto</th>
                                        <th>Borrar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { texts.map( (t,i) => (
                                        <tr key={i}>
                                            <td ><TextField  value={t} onChange={(e) => editText(e,i) } multiline fullWidth /></td>
                                            <td ><Button disabled={(texts.length ===1)? true: false} sx={{borderColor:"#303444", color:"#303444"}} variant="outlined" onClick={(e) => {deleteText(i)}}>Borrar</Button></td>
                                        </tr>
                                    ) ) }
                                </tbody>
                            </table>
                        </div>
                        <Button sx={{borderColor:"#303444", color:"#303444"}} variant="outlined" onClick={addText}>Agregar texto</Button>
                </div>
            )}
            {isPredict && <ShowResults texts={texts} />}
        </div>
    )
};

export default Manual;