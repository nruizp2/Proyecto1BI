import { Grid2 } from "@mui/material";
import ods_3 from "../images/ods_3.jpg";
import ods_4 from "../images/ods_4.jpg";
import ods_5 from "../images/ods_5.jpg";

function Home(){


    return(
        <Grid2 container marginTop={4}>
            <Grid2 size={12} marginBottom={2}>
                <h1 style={{fontSize:"20px", textAlign:"left", marginLeft:"2%"}}>Bienvenidos al Proyecto de Análisis de Opiniones Ciudadanas para el Desarrollo Sostenible</h1>
                <p style={{textAlign:"justify", marginLeft:"2%", marginRight:"5%"}}>En colaboración con el Fondo de Poblaciones de las Naciones Unidas (UNFPA) y entidades públicas, hemos desarrollado una plataforma innovadora que tiene como objetivo vincular las opiniones de los ciudadanos con los Objetivos de Desarrollo Sostenible (ODS). Nuestro propósito es impulsar soluciones basadas en las voces de la comunidad para contribuir al progreso de los ODS 3, 4 y 5, centrados en la salud y bienestar, educación de calidad e igualdad de género.</p>
            </Grid2>
            <Grid2 size={{lg:2, md:12, sm:12,xs:12}} >
                <img style={{height:"200px"}}  src={ods_3}></img>
            </Grid2>
            <Grid2 size={{lg:10, md:12, sm:12,xs:12}} marginTop={3}>
                <h1 style={{fontSize:"20px", textAlign:"left", marginLeft:"2%"}}>¿Qué hacemos?</h1>
                <p style={{textAlign:"justify", marginLeft:"2%", marginRight:"5%"}}>Este proyecto utiliza tecnología avanzada de análisis de datos para procesar y clasificar automáticamente grandes volúmenes de información textual proveniente de la participación ciudadana. Utilizando inteligencia artificial, relacionamos las opiniones expresadas por la ciudadanía con los ODS 3, 4 y 5, permitiendo a los tomadores de decisiones entender mejor los retos actuales y proponer soluciones más alineadas con las necesidades de las personas.</p>
            </Grid2>
            <Grid2  size={{lg:2, md:12, sm:12,xs:12}}>
                <img style={{height:"200px", margin:"auto"}}  src={ods_4}></img>
            </Grid2>
            <Grid2 size={{lg:10, md:12, sm:12,xs:12}} marginTop={3}>
                <h1 style={{fontSize:"20px", textAlign:"left", marginLeft:"2%"}}>Nuestra metodología</h1>
                <p style={{textAlign:"justify", marginLeft:"2%", marginRight:"5%"}}>A través de una combinación de procesamiento de lenguaje natural (NLP) y machine learning, nuestro modelo analiza los textos recibidos para identificar patrones y asociaciones clave. Esto nos permite categorizar las opiniones de manera automática y precisa, optimizando el tiempo y los recursos. Además, nuestra plataforma permite reentrenar el modelo de forma continua con nuevas opiniones, mejorando su precisión y adaptabilidad en el tiempo.</p>
            </Grid2>
            <Grid2 size={{lg:2, md:12, sm:12,xs:12}}>
                <img style={{height:"200px"}}  src={ods_5}></img>
            </Grid2>
            <Grid2 size={{lg:10, md:12, sm:12,xs:12}} marginTop={3}>
                <h1 style={{fontSize:"20px", textAlign:"left", marginLeft:"2%"}}>Impacto</h1>
                <p style={{textAlign:"justify", marginLeft:"2%", marginRight:"5%"}}>Este proyecto no solo facilita la identificación de problemas, sino que también promueve la participación activa de la ciudadanía en el desarrollo sostenible. Al relacionar sus opiniones con los ODS, podemos enfocar nuestros esfuerzos en áreas críticas como la mejora de la salud, el acceso a una educación inclusiva y equitativa, y la lucha por la igualdad de género.</p>
            </Grid2>

            <Grid2 size={12} marginTop={3}>
                <h1 style={{fontSize:"20px", textAlign:"left", marginLeft:"2%"}}>¡Participa!</h1>
                <p style={{textAlign:"justify", marginLeft:"2%", marginRight:"5%"}}>Te invitamos a ser parte de este esfuerzo colectivo. Utiliza el modelo, comparte tus datos y ayuda a construir un futuro mejor para todos. Juntos, podemos lograr un impacto real y positivo en nuestra sociedad.</p>
            </Grid2>
        </Grid2>
    )

};
export default Home;