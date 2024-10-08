import { Gauge } from '@mui/x-charts/Gauge';

import {Grid2} from "@mui/material"

function ShowMetrics({F1, accuracy, precision, recall}){

    return(
        <Grid2 container alignContent={'center'} display={"flex"}>
            <Grid2 size={{md:3, sm: 6}}>
                <p style={{}}>Accuracy</p>
                <Gauge sx={{margin:"auto"}} width={200} height={200} value={accuracy} valueMin={0} valueMax={1} />
            </Grid2>
            <Grid2 size={{md:3, sm: 6}}>
                <p>F1</p>
                <Gauge sx={{margin:"auto"}} width={200} height={200} value={F1} valueMin={0} valueMax={1} />
            </Grid2>
            <Grid2 size={{md:3, sm: 6}}>
                <p>Precision</p>
                <Gauge sx={{margin:"auto"}} width={200} height={200} value={precision} valueMin={0} valueMax={1} />
            </Grid2>
            <Grid2 size={{md:3, sm: 6}}>
                <p>Recall</p>
                <Gauge sx={{margin:"auto"}} width={200} height={200} value={recall} valueMin={0} valueMax={1} />
            </Grid2>
        </Grid2>
    )

};

export default ShowMetrics;