 import axios from "axios";
import nprogress from "nprogress"
 import  "nprogress/nprogress.css"

const requsets =axios.create({
    timeout:5000,
})

 requsets.interceptors.request.use((config)=>{
     nprogress.start()
     return config
 })

 requsets.interceptors.response.use((res)=>{
     nprogress.done()
     return res.data
 },() => {
     return Promise.reject(new Error("faile"))
 })
 export default requsets