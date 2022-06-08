import requsets from "@/api/request";

//获取地区
export const reqAreaInfo=()=>{
    return requsets({url:"http://geoapi.heartrails.com/api/json?method=getAreas",method:"get"})
}

//获取省份
export const reqPrefecturesInfo=(area)=>{
    return requsets({url:`https://geoapi.heartrails.com/api/json?method=getPrefectures&area=${area}`,method:"get"})
}

//获取城市
export const reqCitiesInfo=(prefecture)=>{
    return requsets({url:`https://geoapi.heartrails.com/api/json?method=getCities&prefecture=${prefecture}`,method:"get"})
}

//获取经纬度
export const reqLocationInfo=(keyword)=>{
    return requsets({url:`http://geoapi.heartrails.com/api/json?method=suggest&matching=like&keyword=${keyword}`,method:"get"})
}

//获取周天气
// export const reqWeatherInfo=(x,y)=>{
//     return requsets({url:`https://api.open-meteo.com/v1/forecast?latitude=${x}&longitude=${y}&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,windspeed_10m_max,winddirection_10m_dominant&timezone=Asia%2FTokyo`,method:"get"})
// }

export const reqWeatherInfo=(x,y)=>{
    return requsets({url:`https://api.open-meteo.com/v1/forecast?latitude=${y}&longitude=${x}&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,windspeed_10m_max,winddirection_10m_dominant&timezone=Asia%2FTokyo`,method:"get"})
}
