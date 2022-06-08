import { reqLocationInfo, reqWeatherInfo,} from "@/api";
import WWindUtil from "@/utils/windTransition"
import tools from "@/utils/tools"

const state ={
    area:[],
    location:{},
    weather:{},

}
const mutations={
    GETLOCATION(state,location){
        state.location=location
    },
    GETWEATHER(state,weather){
        state.weather=weather
    }
}
const actions={
    async getLocation({commit},keyword){
       const result= await reqLocationInfo(keyword)
        const response=result.response||{}
        const x=response.location[0].x
        const y=response.location[0].y
        if(response.location){
            commit("GETLOCATION",{x,y,keyword})
        }
    },
    async getWeather({commit},newDate){
        const result= await reqWeatherInfo(newDate.x,newDate.y)||{}
        console.log(result)
        if (result.daily){
            commit("GETWEATHER",result)
        }
    }
}
const getters={
    todayWeather:(state)=>{
        if(state.weather.daily){
            const {sunrise,sunset,temperature_2m_max,temperature_2m_min,time,weathercode,winddirection_10m_dominant,windspeed_10m_max}=state.weather.daily
        const weatherName=tools.todayWeatherName(weathercode[0])
        return {
            sunrise:sunrise[0].substr(-5, 5),
            sunset:sunset[0].substr(-5, 5),
            temperature_2m_max:temperature_2m_max[0],
            temperature_2m_min:temperature_2m_min[0],
            time:time[0],
            weatherName:weatherName,
            winddirection_10m_dominant:WWindUtil.WWindUtil.windValueFormat(winddirection_10m_dominant[0]),
            windspeed_10m_max: WWindUtil.WWindUtil.windFormatLevel(windspeed_10m_max[0])
        }
        }
        else{return {}}

    },
    weeklyWeather:(state)=>{
        if(state.weather.daily){
            const {sunrise,sunset,temperature_2m_max,temperature_2m_min,time,weathercode,winddirection_10m_dominant,windspeed_10m_max}=state.weather.daily
            let weeklyData=[]
            sunrise.forEach((item,index)=>{
                const weatherName=tools.todayWeatherName(weathercode[index])
                const DailyData={
                    sunrise:sunrise[index].substr(-5, 5),
                    sunset:sunset[index].substr(-5, 5),
                    temperature_max:temperature_2m_max[index],
                    temperature_min:temperature_2m_min[index],
                    time:time[index],
                    weatherName:weatherName,
                    winddirection:WWindUtil.WWindUtil.windValueFormat(winddirection_10m_dominant[index]),
                    windspeed: WWindUtil.WWindUtil.windFormatLevel(windspeed_10m_max[index])
                }
                weeklyData.push(DailyData)
            })
            return  weeklyData
        }
        else{return []}
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}