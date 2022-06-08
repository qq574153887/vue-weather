

function todayWeatherName(weathercode){
    switch (weathercode) {
        case 0:
            return "晴れ"
        case 1:
        case 2:
        case 3:
            return "曇り"
        case 45:
        case 48:
            return "霧"
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
            return "小雨"
        case 61:
        case 63:
        case 65:
            return "雨"
        case 66:
        case 67:
            return "大雨"
        case 71:
        case 73:
        case 75:
            return "雪"
        case 77:
            return "暴風雪"
        case 80:
        case 81:
        case 82:
        case 85:
        case 86:
            return "驟雨"
        case 95:
        case 96:
        case 99:
            return "雷雨"
    }
}
export default {todayWeatherName}