<template>
  <div id="home" :class="changeBackgroundIMG">
    <div class="centre" >
        <el-cascader class="cascader" :props="cascader_props" :options="cascader_options" @change="changeCity"></el-cascader>
      <div class="welcomeText" v-show="!contentShow"><p>ようこそ、天気予報！<br>クリックして始めよう！</p></div>
      <div class="content" v-show="contentShow">
        <div class="cityName"><span class="iconfont icon-Location"></span>{{getLocationInfo.keyword}}</div>
        <div class="time">{{this.nowDate}}</div>
        <div class="weatherName">{{todayWeather.weatherName}}</div>
        <div class="sunTime">
          <span class="iconfont icon-sunrise"></span>{{todayWeather.sunrise}}
          <span class="iconfont icon-sunset"></span>{{todayWeather.sunset}}
        </div>
        <div class="temperature">
          {{todayWeather.temperature_2m_min}}°C〜{{todayWeather.temperature_2m_max}}°C
        </div>
        <div class="windDirection">風向：{{todayWeather.winddirection_10m_dominant}}</div>
        <div class="windSpeed">最大風速：{{todayWeather.windspeed_10m_max}}</div>
        <div class="bottom">
        <el-table
            :data="tableData"
            height="250"
            border
            style="width: 100%">
          <el-table-column
              prop="time"
              label="日付"
              width="100">
          </el-table-column>
          <el-table-column
              prop="weatherName"
              label="天気"
              width="60">
          </el-table-column>
          <el-table-column
              prop="temperature_min"
              label="最小気温"
              width="100">
          </el-table-column>
          <el-table-column
              prop="temperature_max"
              label="最大気温"
              width="100">
          </el-table-column>
          <el-table-column
              prop="sunrise"
              label="日の出"
              width="90">
          </el-table-column>
          <el-table-column
              prop="sunset"
              label="日の入"
              width="90">
          </el-table-column>
          <el-table-column
              prop="winddirection"
              label="風向"
              width="90">
          </el-table-column>
          <el-table-column
              prop="windspeed"
              label="最大風速"
              width="160">
          </el-table-column>
        </el-table>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState,mapGetters} from "vuex"
import {reqAreaInfo, reqCitiesInfo, reqPrefecturesInfo} from "@/api"
export default {
  name: "homeComponent",
  data() {
    return {
      cascader_props: {
        lazy: true,
        lazyLoad (node, resolve) {
          const { level } = node;
          if(level==0){
            reqAreaInfo().then(response=>{
              const data=response.response.area
              let newData=[]
              data.forEach((item)=>{
                newData.push({"value":item,"label":item})
              })
              resolve(newData)
            })
          }
          if(level==1){
            reqPrefecturesInfo(node.value).then(response=>{
              const data=response.response.prefecture
              let newData=[]
              data.forEach((item)=>{
                newData.push({"value":item,"label":item})
              })
              resolve(newData)
            })
          }
          if(level==2){
            reqCitiesInfo(node.value).then(response=>{
              const data=response.response.location
              let newData=[]
              data.forEach((item)=>{
                newData.push({"value":item.city,"label":item.city,"leaf":2})
                // newData.leaf=level>=2
              })
              resolve(newData)
            })
          }
        }
      },
      cascader_options:[],
      tableData: [],
      changeBackgroundIMG:"",
      contentShow:false,
      nowDate:"",

    };
  },
  mounted(){
    this.nowDate=this.getNowTime()
  },
  updated() {
    this.nowDate=this.getNowTime()
  },
  computed:{
    ...mapState({
      getLocationInfo:(state)=>{
          return state.home.location
      }
    }),
    ...mapGetters(["todayWeather","weeklyWeather"]),



  },
  methods:{
    changeCity(value){
      console.log(value[1]+value[2])
      this.$store.dispatch("getLocation",value[1]+value[2])
    },
    open1() {
      this.$notify({
        title: 'リクエスト成功',
        type: 'success'
      });
    },
    onChangeBackgroundIMG: (that)=>{
      const todayWeather=that.todayWeather||{}
      switch(todayWeather.weatherName){
        case "晴れ":
          return "sun"
        case "曇り":
          return "cloud"
        case "霧":
          return "frog"
        case "小雨":
          return "smallrain"
        case "雨":
          return "rain"
        case "大雨":
          return "bigrain"
        case "雪":
          return "smsnow"
        case "暴風雪":
          return "snow"
        case "驟雨":
          return "zhouyu"
        case "雷雨":
          return "leiyu"
        default:
          return "home"
      }
    },
    getNowTime:()=>{
      function zeroFill(i){
        if (i >= 0 && i <= 9) {
          return "0" + i;
        } else {
          return i;
        }
      }
      const now=new Date()
      var year = now.getFullYear();
      var month = zeroFill(now.getMonth()+1);
      var date = zeroFill(now.getDate());
      var hour= zeroFill(now.getHours());
      var minute= zeroFill(now.getMinutes());
      var second= zeroFill(now.getSeconds());
      return `${year}-${month}-${date} ${hour}:${minute}:${second}`
    },

  },
  watch:{
    getLocationInfo(newData){
      this.$store.dispatch("getWeather",newData)
    },
    todayWeather(){
      this.open1()
      this.changeBackgroundIMG=this.onChangeBackgroundIMG(this)
      this.contentShow=true
    },
    weeklyWeather(newData){
      this.tableData=newData
    }

  }

}
</script>

<style lang="less" scoped>
#home{
  background-image: url("images/home.jpeg");
  width: 100%;
  height: 100vh;
  .centre{
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    .welcomeText{
      margin-top: 220px;
      font-size: 50px;
      font-weight: bolder;
      font-family: fantasy;
      text-shadow: 0 0 10px black;
      color: white;
      font-style: italic;
      text-align: center;
      line-height: 100px;
    }

    .cascader{
      margin-top: 50px;
      width: 280px;
    }
    .content{
      display: flex;
      align-items: center;
      flex-direction: column;
      height: 90vh;
      justify-content: space-around;
      .cityName{
        font-size: 20px;
        color: white;
        text-shadow: 0 0 10px black;
        span{
          font-size:20px;
          color:white;
        }
      }
      .weatherName{
        font-size: 50px;
        margin-top: 20px;
        font-weight: bolder;
        font-family: fantasy;
        text-shadow: 0 0 10px black;
        color: white;
        font-style: italic;
      }
      .sunTime{
        .icon-sunrise,.icon-sunset{
          color: #d44e4e;
          font-size: 30px;
        }
        font-size:20px;
        text-shadow: 0 0 10px white;
        span:nth-child(1){
          margin-right: 10px;
        }
      }
      .time{
        font-size: 20px;
        color: white;
        text-shadow: 0 0 10px black;
      }
      .temperature{
        font-size:20px ;
        text-shadow: 0 0 10px white;
      }
      .windSpeed{
        font-size:20px ;
        text-shadow: 0 0 10px white;
      }
      .windDirection{
        font-size:20px ;
        text-shadow: 0 0 10px white;
      }
      .bottom{
        width: 100%;
      }

    }

  }

}
#home.sun{
  background-image: url("images/sun.jpeg");
}
#home.cloud{
  background-image: url("images/cloud.jpeg");
}
#home.frog{
  background-image: url("images/frog.jpeg");
}
#home.smallrain{
  background-image: url("images/smallrain.jpeg");
}
#home.rain{
  background-image: url("images/rain.jpeg");
}
#home.bigrain{
  background-image: url("images/bigrain.jpeg");
}
#home.smsnow{
  background-image: url("images/smsnow.jpeg");
}
#home.snow{
  background-image: url("images/snow.jpeg");
}
#home.zhouyu{
  background-image: url("images/zhouyu.jpeg");
}
#home.leiyu{
  background-image: url("images/leiyu.jpeg");
}
#home.default{
  background-image: url("images/home.jpeg");
}
</style>