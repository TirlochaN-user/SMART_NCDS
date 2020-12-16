import axios from 'axios'
function CallApi(data,setFun) {
    var config={
        method:'post',
        url:process.env.REACT_APP_BASE_API_URL+'SPIKEWELL11/sarnatexam_object/sarnat?v=1.0.0',
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

export default CallApi;