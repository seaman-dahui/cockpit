import { useEffect, useRef, useState } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";
import mapLeftIcon from "../images/map_left_icon.png";
import mapRightIcon from "../images/map_right_icon.png";
import { firstPartList, projectInfo, showMap } from "@/services/cockpit";
import circle_1 from "../images/circle_1.png";
import circle_2 from "../images/circle_2.png";
import circle_3 from "../images/circle_3.png";

let mapObj = null;

let markList = [];

const LGMap = () => {
  const [firstPartLists, setFirstPartList] = useState([]);
  const [activeFirst, setActiveFirst] = useState("");

  const topRef = useRef();

  useEffect(() => {
    // getFirstPartList();

    AMapLoader.load({
      key: "", // 申请好的Web端开发者Key，
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      // plugins: ['AMap'], // 需要使用的的插件列表，
    }).then((AMap) => {
      mapObj = new AMap.Map("mapContainer", {
        zoom: 13.05, //初始化地图层级
        center: [121.9108278, 30.90016523], //初始化地图中心点
        pitch: 0,
        pitchEnable: false,
        viewMode: "3D",
        dragEnable: true,
        rotateEnable: false,
        resizeEnable: true,
      });
    });
    console.log(11111, mapObj);

    // getShowMap("");
    return () => {
      mapObj?.destroy();
    };
  }, []);

  // 甲方
  const getFirstPartList = () => {
    firstPartList({}).then((res) => {
      if (res?.code === 0) {
        setFirstPartList(res.data || []);
      }
    });
  };

  // 切换甲方
  const changeFirstPart = (id) => {
    setActiveFirst(id);
    getShowMap(id);
  };

  // 根据甲方查项目
  const getShowMap = (id) => {
    showMap({ id: id }).then((res) => {
      if (res?.code === 0) {
        markList.forEach((m) => {
          mapObj.remove(m);
        });
        markList = [];
        res.data.forEach((v) => addMarker(v));
      }
    });
  };

  // 创建地图实例
  const getMaps = () => {
    return new Promise((resolve, reject) => {
      AMapLoader.load({
        // key: "", // 申请好的Web端开发者Key，
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        // plugins: ['AMap'], // 需要使用的的插件列表，
      })
        .then((AMap) => {
          const map = new AMap.Map("mapContainer", {
            zoom: 13.05, //初始化地图层级
            center: [121.9108278, 30.90016523], //初始化地图中心点
            pitch: 0,
            pitchEnable: false,
            viewMode: "3D",
            dragEnable: true,
            rotateEnable: false,
            resizeEnable: true,
          });

          resolve(map);
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };

  // marker项目标记
  const addMarker = (project) => {
    // 以 icon URL 的形式创建一个途经点

    var marker = new AMap.Marker({
      position: [project.longitude, project.latitude],
      offset: new AMap.Pixel(-90, -45),
      content: `<div>
            <div class="location_label status_bgColor_${
              project.type
            }" style="padding: 10px 20px;width:180px;display:flex;justify-content:space-around;">
              <div style="flex:1;color:#A5EBFF;font-size: 14px;font-weight: 600;margin-right: 10px; overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;">
                ${project.projectName}
              </div>
              <div style="color: #FFC35C;font-size: 14px;font-weight: 600;">
                ${project.buildCnt}套
              </div>
              <div style="
              position: absolute;
              bottom: -10px;
              display: flex;
              flex-direction: column;
              align-items: center;
          ">
              <div style="
            height: 10px;
            width: 10px;
            display: inline-block;
            background: ${
              project.type == 1
                ? "rgba(3, 73, 135, 0.95)"
                : project.type == 2
                  ? "#332172"
                  : "#006060"
            };
            transform: rotate(45deg);
           "></div>
            
            <img src=${
              project.type == 1
                ? circle_1
                : project.type == 2
                  ? circle_2
                  : circle_3
            } alt="" width='25px' />
              </div>
            </div>
            
          </div>`,
    });

    let infoWindow;
    marker.on("mouseover", async () => {
      let res = await projectInfo({ id: project.projectId });
      if (res?.code === 0) {
        infoWindow = addInfoWindow(res.data);
        infoWindow.open(mapObj, [project.longitude, project.latitude]); //经纬度，坐标
      }
    });
    // marker.on('click', async () => {
    //   if (history.location.pathname.includes('/dataPlatform/cockpit/common/gzf')) {
    //     aaa(key, '', 3, '公租房');
    //   } else if (history.location.pathname.includes('/dataPlatform/cockpit/common/rc')) {
    //     aaa(key, '', 3, '人才公寓');
    //   }
    // });

    marker.on("mouseout", async () => {
      setTimeout(() => {
        infoWindow?.close();
      }, 2000);
    });

    mapObj.add(marker);
    markList.push(marker);
  };

  //创建信息窗口
  const addInfoWindow = (project) => {
    console.log("mdddd", project);
    let infoWindow = new AMap.InfoWindow({
      isCustom: true,
      content: `<div class="info-window-container status_bgColor_${project.type}">
          <div class="info-window-container-top status_bgColor_${project.type}">
            <div class="info-window-container-top-statistic">
              <div class="info-window-container-top-text">${project.projectName || ""}</div>
              <div class="info-window-container-top-amount">${project.totalBuildCnt || "0"}套</div>
            </div>
            <div class="info-window-container-top-sub-statistic">
              <div class="info-window-container-top-sub-statistic-left">
                <div>总建筑面积</div>
                <div class="info-window-container-top-sub-statatistic-left-text">
                  ${project.totalBuildArea || "0"}m²
                </div>
              </div>
              <div class="info-window-container-top-sub-statistic-center">
                <div>已出租面积</div>
                <div class="info-window-container-top-sub-statatistic-center-text">
                  ${project.leasedArea || "0"}m²
                </div>
              </div>
              <div class="info-window-container-top-sub-statistic-right">
                <div>出租率</div>
                <div class="info-window-container-top-sub-statatistic-right-text">
                  ${(project.occupancyRate * 100).toFixed(2) || "0"}%
                </div>
              </div>
            </div>

            <div class="info-window-container-content">
              ${project?.projectHouseResponseVOS
                ?.map((v) => {
                  return `<div class="info-window-container-content-item">
                  <div class="info-window-container-content-item-middle">${v.tenantName || ""}</div>
                  <div class="info-window-container-content-item-right">${v.buildCnt || "0"}套</div>
                </div>`;
                })
                .join("")}
            </div>
          </div>
        </div>`,
      offset: new AMap.Pixel(0, -60),
    });
    return infoWindow;
  };

  const rightClick = () => {
    topRef.current.scrollBy({ left: 100, behavior: "smooth" });
  };
  const leftClick = () => {
    topRef.current.scrollBy({ left: -100, behavior: "smooth" });
  };

  return (
    <div className="lgmap" style={{ flex: 1, padding: "0 10px 10px" }}>
      <div className="map_nav_wrap">
        <div style={{ cursor: "pointer" }} onClick={() => leftClick()}>
          <img src={mapLeftIcon} alt="" />
        </div>
        <div style={{ flex: 1, overflow: "auto" }}>
          <div className="map_nav_container" ref={topRef}>
            <div
              className={
                activeFirst == "" ? "map_nav_item active" : "map_nav_item"
              }
              onClick={(e) => changeFirstPart("")}
            >
              全部
            </div>
            {firstPartLists.map((v) => (
              <div
                key={v.id}
                className={
                  activeFirst == v.id ? "map_nav_item active" : "map_nav_item"
                }
                onClick={(e) => changeFirstPart(v.id)}
                style={{ fontSize: 16 }}
              >
                {v.name}
              </div>
            ))}
          </div>
        </div>
        <div style={{ cursor: "pointer" }} onClick={() => rightClick()}>
          <img src={mapRightIcon} alt="" />
        </div>
      </div>
      <div style={{ height: "100%" }} id="mapContainer"></div>

      <div className="houseSituation">
        <div className="houseSituation-title">项目类型</div>
        <div className="houseSituation-item">
          <div className="houseSituation-item-1"></div>商业
        </div>
        <div className="houseSituation-item">
          <div className="houseSituation-item-2"></div>住宅
        </div>
        <div className="houseSituation-item">
          <div className="houseSituation-item-3"></div>楼宇
        </div>
      </div>
    </div>
  );
};

export default LGMap;
