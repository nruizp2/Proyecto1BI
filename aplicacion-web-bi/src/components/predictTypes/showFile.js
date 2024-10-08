import 'bootstrap/dist/css/bootstrap.min.css';
import ods_3 from "../../images/ods_3.jpg";
import ods_4 from "../../images/ods_4.jpg";
import ods_5 from "../../images/ods_5.jpg";
import React, { useState, useEffect } from "react";
import Pagination from '@mui/material/Pagination';

function ShowFile({ texts, labels }) {
    const [page, setPage] = useState(1);
    const itemsPerPage = 4;

    const ods_to_img = {
        3: ods_3,
        4: ods_4,
        5: ods_5
    };

    const handleChange = (event, value) => {
        setPage(value);
    };

    const startIndex = (page - 1) * itemsPerPage;
    const selectedTexts = texts.slice(startIndex, startIndex + itemsPerPage);
    const selectedLabels = labels.slice(startIndex, startIndex + itemsPerPage);


    return (
        <div style={{ marginLeft: "5%", marginRight: "5%"}}>
            <Pagination
                count={Math.ceil(texts.length / itemsPerPage)}
                page={page}
                onChange={handleChange}
                color="primary"
                style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
            />
            <table className='table table-striped table-bordered table-responsive'>
                <thead>
                    <tr>
                        <th>Texto</th>
                        <th>Label</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedTexts.map((t, i) => (
                        <tr key={i}>
                            <td>
                                <p style={{ textAlign: "justify" }}>{t}</p>
                            </td>
                            <td>
                                <img src={ods_to_img[selectedLabels[i]]} style={{ height: "100px", width: "100px", margin: "auto", display: "block", alignSelf: "center" }} alt="ODS" />
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

export default ShowFile;
