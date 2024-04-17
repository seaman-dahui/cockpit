import { Card, Spin } from "antd";
import { useEffect, useState } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";
import sunny_icon from "..//images/wether_icon/sunny.png";
import cloudy_icon from "..//images/wether_icon/cloudy.png";
import overcast_icon from "..//images/wether_icon/overcast.png";
import breeze_icon from "..//images/wether_icon/breeze.png";
import dust_icon from "..//images/wether_icon/dust.png";
import fog_icon from "..//images/wether_icon/fog.png";
import gale_icon from "..//images/wether_icon/gale.png";
import haze_icon from "..//images/wether_icon/haze.png";
import heavy_rain_icon from "..//images/wether_icon/heavy_rain.png";
import little_rain_icon from "..//images/wether_icon/little_rain.png";
import major_snow_icon from "..//images/wether_icon/major_snow.png";
import moderat_rain_icon from "..//images/wether_icon/moderat_rain.png";
import rain_snow_icon from "..//images/wether_icon/rain_snow.png";
import rainstorm_icon from "..//images/wether_icon/rainstorm.png";
import sandstorm_icon from "..//images/wether_icon/sandstorm.png";
import shower_icon from "..//images/wether_icon/shower.png";
import snow_icon from "..//images/wether_icon/snow.png";
import snowstorm_icon from "..//images/wether_icon/snowstorm.png";
import spit_icon from "..//images/wether_icon/spit.png";
import thunder_icon from "..//images/wether_icon/thunder.png";

window._AMapSecurityConfig = {
  securityJsCode: "9a37ebccd3be8b4a28e4edf0653b8652",
};

const WetherCard = (props, ref) => {
  const [weatherInfo, setWeatherInfo] = useState({});

  useEffect(() => {
    AMapLoader.load({
      // key: "", // 申请好的Web端开发者Key，
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ["AMap.Weather", "AMap.CitySearch"], // 需要使用的的插件列表，
    })
      .then((AMap) => {
        //创建天气查询实例
        const weather = new AMap.Weather();
        // ip城市定位实例
        const citySearch = new AMap.CitySearch();

        citySearch.getLocalCity(function (status, result) {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            //执行实时天气信息查询
            weather.getLive(result.city, (err, data) => {
              setWeatherInfo(data);
            });
          }
        });
      })
      .catch((e) => {
        console.log(e);
      });

    return () => {};
  }, []);

  const getWetherBg = (weather = "") => {
    let bgColor = "linear-gradient(129deg, #4DA8F7 3%, #5CDCCD 85%)";
    if (
      weather.includes("风") ||
      weather.includes("晴") ||
      weather.includes("云") ||
      weather.includes("阴")
    ) {
      bgColor = "linear-gradient(129deg, #4DA8F7 3%, #5CDCCD 85%)";
    }
    if (weather.includes("雷") || weather.includes("雨")) {
      bgColor = "linear-gradient(129deg, #4D99F7 2%, #5C7ADB 27%, #6B5CDC 84%)";
    }
    if (
      weather.includes("雾") ||
      weather.includes("霾") ||
      weather.includes("尘") ||
      weather.includes("沙") ||
      "强风/劲风、疾风、大风、烈风、风暴、狂爆风、飓风、龙卷风".includes(
        weather
      )
    ) {
      bgColor = "linear-gradient(129deg, #5C9ED8 2%, #8091C8 32%, #ADAACA 84%)";
    }
    if (weather.includes("雪") || weather.includes("冻雨")) {
      bgColor =
        "linear-gradient(129deg, rgba(182, 133, 255, 0.8) 2%, rgba(92, 143, 219, 0.8) 25%, rgba(107, 92, 220, 0.8) 92%)";
    }

    return bgColor;
  };

  const getWetherIcon = (weather = "") => {
    let icon = ""; //未知
    switch (weather) {
      case "晴":
        icon = sunny_icon;
        break;
      case "少云":
      case "晴间多云":
      case "多云":
        icon = cloudy_icon;
        break;
      case "阴":
      case "平静":
      case "未知":
        icon = overcast_icon;
        break;
      case "有风":
      case "微风":
      case "和风":
      case "清风":
        icon = breeze_icon;
        break;
      case "阵雨":
        icon = shower_icon;
        break;
      case "雷阵雨":
      case "雷阵雨并伴有冰雹":
      case "强雷阵雨":
        icon = thunder_icon;
        break;
      case "小雨":
      case "毛毛雨/细雨":
      case "雨":
      case "小雨-中雨":
        icon = little_rain_icon;
        break;
      case "中雨":
      case "中雨-大雨":
        icon = moderat_rain_icon;
        break;
      case "大雨":
      case "大雨-暴雨":
        icon = heavy_rain_icon;
        break;
      case "暴雨":
      case "暴雨-大暴雨":
      case "大暴雨":
      case "大暴雨-特大暴雨":
      case "特大暴雨":
      case "强阵雨":
      case "极端降雨":
        icon = rainstorm_icon;
        break;
      case "雾":
      case "轻雾":
      case "大雾":
      case "浓雾":
      case "强浓雾":
      case "特强浓雾":
        icon = fog_icon;
        break;
      case "霾":
      case "中度霾":
      case "重度霾":
      case "严重霾":
        icon = haze_icon;
        break;
      case "强风/劲风":
      case "疾风":
      case "大风":
      case "烈风":
      case "风暴":
      case "狂爆风":
      case "飓风":
      case "热带风暴":
      case "龙卷风":
        icon = gale_icon;
        break;
      case "浮尘":
      case "扬沙":
        icon = dust_icon;
        break;
      case "沙尘暴":
      case "强沙尘暴":
        icon = sandstorm_icon;
        break;
      case "雨雪天气":
      case "雨夹雪":
      case "阵雨夹雪":
      case "冻雨":
        icon = rain_snow_icon;
        break;
      case "雪":
      case "阵雪":
      case "小雪":
      case "小雪-中雪":
        icon = spit_icon;
        break;
      case "中雪":
      case "中雪-大雪":
        icon = snow_icon;
        break;
      case "大雪":
      case "大雪-暴雪":
        icon = major_snow_icon;
        break;
      case "暴雪":
        icon = snowstorm_icon;
        break;

      default:
        icon = overcast_icon;
        break;
    }

    return icon;
  };

  return (
    <>
      {props.cockpit ? (
        <div>
          <div style={{ color: "#0aeaee" }}>
            {weatherInfo.city || "天气信息更新中..."}{" "}
            {weatherInfo.city && (
              <img
                src={getWetherIcon(weatherInfo.weather)}
                alt={weatherInfo.weather}
                title={weatherInfo.weather}
                width="35px"
                style={{ verticalAlign: "middle" }}
              />
            )}
            {weatherInfo.temperature || ""}
            {!!weatherInfo.temperature && "℃"}
          </div>
        </div>
      ) : (
        <Card
          bordered={false}
          style={{
            height: 262,
            background: weatherInfo.weather && getWetherBg(weatherInfo.weather),
          }}
        >
          <div style={{ fontSize: 24, color: "#fff" }}>
            {weatherInfo.city || "天气信息更新中..."}{" "}
            {weatherInfo.temperature || ""}
            {!!weatherInfo.temperature && "℃"} {weatherInfo.weather || ""}
          </div>
          {/* <div style={{ fontSize: 16, color: '#fff' }}>有12个任务需要今天完成</div> */}
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
          >
            {weatherInfo.city ? (
              <img
                src={getWetherIcon(weatherInfo.weather)}
                alt=""
                width="60%"
              />
            ) : (
              <Spin />
            )}
          </div>
        </Card>
      )}
    </>
  );
};

export default WetherCard;
