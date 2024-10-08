import load from "../../images/loading.gif"

function Load({msg}){

    return(
        <div style={{marginTop:"3%"}}>
            <img style={{width:"5%", height:"auto"}} src={load}></img>
            <p>{msg}</p>
        </div>
    )
}

export default Load;