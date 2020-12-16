import axios from 'axios'
async function CallApiFeedingAdv(data,setFun) {
    var config={
        method:'post',
        url:process.env.REACT_APP_BASE_API_URL+'SPIKEWELL/feeding_object/feeding?v=1.0.0',
        "headers":{
            "content-type":"application/json"
        },
        "data":data
    }
    axios(config)
        .then(response=>{
                setFun(response.data.result)}               
        )
}

export default CallApiFeedingAdv;