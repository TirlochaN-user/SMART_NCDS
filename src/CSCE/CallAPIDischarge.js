import axios from 'axios'
function CallApiDischarge(data,setFun) {
    var config={
        method:'post',
        url:process.env.REACT_APP_BASE_API_URL+'SPIKEWELL/discharge_object/discharge?v=1.0.0',
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

export default CallApiDischarge;