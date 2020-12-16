import axios from 'axios'
function CallApiBaseline(data,setFun) {
    var config={
        method:'post',
        url:process.env.REACT_APP_BASE_API_URL+'SPIKEWELL11/acidemia_object/getRecommendation?v=1.0.0',
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

export default CallApiBaseline;