import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

function Probabilities({probs, classes}){
    const colors = {
        3: "#269a47",
        4: "#c31f33",
        5: "#ef402b"
    }
    return(
        <div style={{margin:"auto", alignContent:"center", display:"flex"}}>
          <PieChart
          series={[
            {
              data: [
                { id: 0, value: probs[0], label: String(classes[0]) },
                { id: 1, value: probs[1], label:  String(classes[1]) },
                { id: 2, value: probs[2], label: String(classes[2])},
              ],
            },
          ]}
          colors={classes.map(c => colors[c])}
          width={200}
          height={100}
        />
        </div>
    )
};

export default Probabilities;

