
// 生成nav 生成select-content
function getHtmlList(className, data, itemClass) {
  let list = $(className)
  let dataList = data
  let str = ''
  dataList.forEach(item => {
    item.name ? str += `<div class=${itemClass}>${item.name}</div>` : str += `<div class=${itemClass}>${item}</div>`
  })
  list.append(str)
}

// nav的点击事件
$('.nav-list').on('click', '.list-item', function () {
  console.log($(this).text());
})

// 下拉框图标的点击事件
function select_icon_click() {
  let display = $('.select-content').css('display')
  let str = $('.select-title-icon').prop('class')
  let reg = RegExp(/down/);
  if (str.match(reg)) {
    $('.select-title-icon').removeClass('icon-down')
    $('.select-title-icon').addClass('icon-up')
  } else {
    $('.select-title-icon').removeClass('icon-up')
    $('.select-title-icon').addClass('icon-down')
  }
  display == 'none' ? $('.select-content').css({ "display": "block" }) : $('.select-content').css({ "display": "none" })
}
// 下拉框选项的点击事件
$('.select-content').on('click', '.select-item', function () {
  $('.select-text').html($(this).text())
  let display = $('.select-content').css('display')
  display == 'none' ? $('.select-content').css({ "display": "block" }) : $('.select-content').css({ "display": "none" })
  // 调用 echarts 实例的内置方法 让地图高亮 
  var top_centerCharts = echarts.init(document.querySelector("#top_center"))
  top_centerCharts.dispatchAction({
    type: 'downplay', // 取消高亮指定的数据图形
    seriesIndex: 0
  })
  top_centerCharts.dispatchAction({
    type: 'highlight', // 高亮指定的数据图形。通过seriesName或者seriesIndex指定系列。如果要再指定某个数据可以再指定dataIndex或者name。
    seriesIndex: 0,
    name: $(this).text()
  })

})

// 上左图表
function top_left_initChart() {
  var top_leftCharts = echarts.init(document.querySelector("#top_left"))
  top_leftCharts.setOption({})
  let top_leftOption = {
    grid: {
      left: "5%",
      right: "5%",
      bottom: "5%",
      top: "10%",
      containLabel: true,
    },
    title: { // 标题设置
      text: '窗口排名', // 标题文字
      textStyle: { // 标题文字样式设置
        color: '#fff'
      },
      left: 0, // 标题距离左边的距离
      top: 0 // 标题距离顶部的距离
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "none",
      },
      // formatter: function (params) {
      //   return (
      //     params[0].name +
      //     "<br/>" +
      //     "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
      //     params[0].seriesName +
      //     " : " +
      //     Number(
      //       (params[0].value.toFixed(4) / 10000).toFixed(2)
      //     ).toLocaleString() +
      //     " 万元<br/>"
      //   );
      // },
    },
    // backgroundColor: "rgb(20,28,52)",
    xAxis: {
      show: false,
      type: "value",
    },
    yAxis: [
      {
        type: "category",
        inverse: true,
        axisLabel: {
          show: true,
          textStyle: {
            color: "#fff",
          },
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        // data: ["窗口1", "窗口2", "窗口3", "窗口4", "窗口5"],
      },
      {
        type: "category",
        inverse: true,
        axisTick: "none",
        axisLine: "none",
        show: true,
        axisLabel: {
          textStyle: {
            color: "#ffffff",
            fontSize: "12",
          },
          //   formatter: function (value) {
          //     if (value >= 10000) {
          //       return (value / 10000).toLocaleString() + "万";
          //     } else {
          //       return value.toLocaleString();
          //     }
          //   },
        },
        // data: [500, 420, 330, 200, 180],
      },
    ],
    series: [
      {
        name: "金额",
        type: "bar",
        zlevel: 1,
        itemStyle: {
          normal: {
            barBorderRadius: 30,
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: "rgb(57,89,255,1)",
              },
              {
                offset: 1,
                color: "rgb(46,200,207,1)",
              },
            ]),
          },
        },
        barWidth: 20,
        data: [50000000, 22000000, 10000000, 5000000, 1],
      },
      {
        name: "背景",
        type: "bar",
        barWidth: 20,
        barGap: "-100%",
        data: [50000000, 50000000, 50000000, 50000000, 1],
        itemStyle: {
          normal: {
            color: "rgba(24,31,68,1)",
            barBorderRadius: 30,
          },
        },
      },
    ],
  };
  top_leftCharts.setOption(top_leftOption)
  top_left_getData()
}

// 获取图表数据
function top_left_getData() {
  const yAxis_data1 = ["窗口1", "窗口2", "窗口3", "窗口4", "窗口5"]
  const yAxis_data2 = [500, 420, 330, 200, 10]
  top_left_updateChart(yAxis_data1, yAxis_data2)
}

// 更新图表
function top_left_updateChart(yAxis_data1, yAxis_data2) {
  var top_leftCharts = echarts.init(document.querySelector("#top_left"))
  const dataOption = {
    yAxis: [
      {
        data: yAxis_data1
      },
      {
        data: yAxis_data2
      }
    ],
    series: [
      {
        data: yAxis_data2
      },
      {
        data: yAxis_data2
      }
    ]
  }
  top_leftCharts.setOption(dataOption)
}


// 上中图表 
function top_center_initChart() {
  var top_centerCharts = echarts.init(document.querySelector("#top_center"))
  $.get('js/neimenggu.json', function (res) {
    echarts.registerMap('top_centerCharts', res)
    let mapData = res.features.map((item, index) => {
      return {
        name: item.properties.name,
        value: index,
        level: item.properties.level,
        areaCode: item.properties.adcode,
      };
    });
    getHtmlList('.select-content', mapData, 'select-item')
    let top_centerOption = {
      dataRange: {
        show: false,
        splitList: [
          { start: 9, end: 12, color: "#5996B7" },
          { start: 6, end: 9, color: "#92C5DE " },
          { start: 3, end: 6, color: "#FCDBC7" },
          { start: 0, end: 3, color: "#F3A482" },
        ],
      },
      series: [
        {
          name: "地图",
          type: "map",
          map: 'top_centerCharts',
          aspectScale: 0.85, //地图长度比
          color: ["#5F85F6", "#F9C96B"],
          roam: true, // 设置允许缩放以及拖动的效果
          label: {
            show: true // 展示标签
          },
          zoom: 1.2, // 设置初始化的缩放比例
          itemStyle: {
            normal: {
              // areaColor: "#3a7fd5", //地图底色
              borderColor: "#0a53e9", //线
              shadowColor: "#092f8f", //外发光
              shadowBlur: 20,
            },
            emphasis: {
              areaColor: "#31C8DB", //悬浮区背景
              borderColor: "#f18355",
              borderWidth: "3",
            },
          },
          select: { //点击地图时的样式
            itemStyle: {
              areaColor: "#31C8DB",
              borderColor: "#f18355",
              borderWidth: "3"
            }
          },
          label: {
            normal: {
              show: true,
              textStyle: {
                color: "#000000", //省市区字体颜色
              },
            },
            textStyle: {
              color: "rgba(255,255,255,1)",
              fontSize: 30,
              opacity: 1,
              backgroundColor: "rgba(0,0,0,0.2)",
            },
          },
          data: mapData, // 上面添加了 name,value,level,cityCode的数据
        },
      ],
    }
    top_centerCharts.setOption(top_centerOption)
  })
  // 点击地图时触发
  top_centerCharts.on('click', function (params) {
    console.log(params);
    $.get('js/neimenggu.json', function (res) {
      console.log(res);
    })
  })
}

//上右图表
function top_right_initChart() {
  var top_rightCharts = echarts.init(document.querySelector("#top_right"))
  let fontColor = "#30eee9";
  let top_rightOption = {
    grid: {
      left: "1%",
      right: "5%",
      top: "15%",
      bottom: "5%",
      containLabel: true,
    },
    tooltip: {
      show: true,
      trigger: "item",
    },
    legend: {
      show: true,
      x: "center",
      y: "15",
      icon: "stack",
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: "#1bb4f6",
      },
      // data: ["已采纳", "已发布", "浏览量"],
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        axisLabel: {
          color: fontColor,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#397cbc",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#195384",
          },
        },
        // data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月",]
      },
    ],
    yAxis: [
      {
        type: "value",
        // name: "信息量",
        min: 0,
        max: 1000,
        axisLabel: {
          formatter: "{value}",
          textStyle: {
            color: "#2ad1d2",
          },
        },
        axisLine: {
          lineStyle: {
            color: "#27b4c2",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#11366e",
          },
        },
      },
      {
        type: "value",
        // name: "浏览量",
        min: 0,
        max: 1000,
        axisLabel: {
          formatter: "{value} 人",
          textStyle: {
            color: "#186afe",
          },
        },
        axisLine: {
          lineStyle: {
            color: "#186afe",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#11366e",
          },
        },
      },
    ],
    series: [
      {
        // name: "已采纳",
        type: "line",
        stack: "总量",
        symbol: "circle",
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: "#0092f6",
            lineStyle: {
              color: "#0092f6",
              width: 1,
            },
            areaStyle: {
              //color: '#94C9EC'
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "rgba(7,44,90,0.3)",
                },
                {
                  offset: 1,
                  color: "rgba(0,146,246,0.9)",
                },
              ]),
            },
          },
        },
        markPoint: {
          itemStyle: {
            normal: {
              color: "red",
            },
          },
        },
        // data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330],
      },
      {
        // name: "已发布",
        type: "line",
        stack: "总量",
        symbol: "circle",
        symbolSize: 8,

        itemStyle: {
          normal: {
            color: "#00d4c7",
            lineStyle: {
              color: "#00d4c7",
              width: 1,
            },
            areaStyle: {
              //color: '#94C9EC'
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "rgba(7,44,90,0.3)",
                },
                {
                  offset: 1,
                  color: "rgba(0,212,199,0.9)",
                },
              ]),
            },
          },
        },
        // data: [220, 182, 191, 234, 290, 330, 310, 201, 154, 190, 330, 410],
      },
      {
        // name: "浏览量",
        type: "line",
        stack: "总量",
        symbol: "circle",
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: "#aecb56",
            lineStyle: {
              color: "#aecb56",
              width: 1,
            },
            areaStyle: {
              //color: '#94C9EC'
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "rgba(7,44,90,0.3)",
                },
                {
                  offset: 1,
                  color: "rgba(114,144,89,0.9)",
                },
              ]),
            },
          },
        },
        // data: [150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190],
      },
    ],
  };
  top_rightCharts.setOption(top_rightOption)
  top_right_getData()
}

// 获取图表数据
function top_right_getData() {
  const legend = ["已采纳", "已发布", "浏览量"]
  const xAxis = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月",]
  const yAxis = [
    {
      name: "信息量",
    }, {
      name: "浏览量",
    }
  ]
  const series = [
    {
      name: "已采纳",
      data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330]
    },
    {
      name: "已发布",
      data: [220, 182, 191, 234, 290, 330, 310, 201, 154, 190, 330, 410]
    },
    {
      name: "浏览量",
      data: [150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190]
    }
  ]
  top_right_updateChart(legend, xAxis, yAxis, series)
}

// 更新图表
function top_right_updateChart(legendData, xAxisData, yAxisData, seriesData) {
  var top_rightCharts = echarts.init(document.querySelector("#top_right"))
  const dataOption = {
    legend: {
      data: legendData
    },
    xAxis: {
      data: xAxisData
    },
    yAxis: yAxisData,
    series: seriesData
  }
  top_rightCharts.setOption(dataOption)
}

// 下左图表1
function bottom_left1_initChart() {
  var bottom_left1Charts = echarts.init(document.querySelector("#bottom_left1"))
  let bottom_left1Option = {
    title: { // 标题设置
      text: '业务一', // 标题文字
      textStyle: { // 标题文字样式设置
        color: '#fff'
      },
      left: 0, // 标题距离左边的距离
      top: 0 // 标题距离顶部的距离
    },
    xAxis: {
      axisLine: {
        lineStyle: {
          color: "#0177d4",
        },
      },
      axisLabel: {
        interval: 0,
        margin: 5,
        color: "#fff",
        textStyle: {
          fontSize: 11,
        },
        rotate: "45",
      },
      axisTick: {
        //刻度
        show: false,
      },
      data: ["1", "2", "3", "4", "5", "6", "12",],
    },
    yAxis: {
      name: "（人）",
      nameTextStyle: {
        color: "#fff",
        fontSize: 12,
      },
      axisLine: {
        lineStyle: {
          color: "#0177d4",
        },
      },
      axisLabel: {
        color: "#fff",
        fontSize: 12,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#0177d4",
        },
      },
      interval: 100,
      max: 500,
    },
    series: [
      {
        type: "bar",
        barWidth: 10,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "#00b0ff",
                },
                {
                  offset: 0.8,
                  color: "#7052f4",
                },
              ],
              false
            ),
          },
        },
        label: {
          normal: {
            show: true,
            lineHeight: 10,
            formatter: "{c}",
            position: "top",
            textStyle: {
              color: "#fff",
              fontSize: 10,
            },
          },
        },
        data: [254, 254, 654, 454, 457, 211, 211],
      },
    ],
  }
  bottom_left1Charts.setOption(bottom_left1Option)
  bottom_left1_getData()
}

// 获取图表数据
function bottom_left1_getData() {
  const series = [
    {
      data: [254, 254, 654, 454, 457, 211, 211]
    },
  ]
  bottom_left1_updateChart(series)
}

// 更新图表
function bottom_left1_updateChart(seriesData) {
  var bottom_left1Charts = echarts.init(document.querySelector("#bottom_left1"))
  const dataOption = {
    series: seriesData
  }
  bottom_left1Charts.setOption(dataOption)
}

// 下左图表2
function bottom_left2_initChart() {
  var bottom_left2Charts = echarts.init(document.querySelector("#bottom_left2"))
  let colorArray = ["#ffa800", "#1ace4a", "#4bf3ff", "#4f9aff", "#b250ff"]
  let bottom_left2Option = {
    title: { // 标题设置
      text: '业务二', // 标题文字
      textStyle: { // 标题文字样式设置
        color: '#fff'
      },
      left: 5, // 标题距离左边的距离
      top: 5 // 标题距离顶部的距离
    },
    tooltip: {
      show: true,
      formatter: "{b}:{c}",
    },
    grid: {
      left: "5%",
      top: "12%",
      right: "1%",
      bottom: "8%",
      containLabel: true,
    },

    xAxis: {
      type: "value",
      show: false,
      position: "top",
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: "#fff",
        },
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: [
      {
        type: "category",
        axisTick: {
          show: false,
          alignWithLabel: false,
          length: 5,
        },
        splitLine: {
          //网格线
          show: false,
        },
        inverse: "true", //排序
        axisLine: {
          show: false,
          lineStyle: {
            color: "#fff",
          },
        },
        // data: ["first", "two", "three", "four", "five"],
      },
    ],
    series: [
      {
        name: "能耗值",
        type: "bar",
        label: {
          normal: {
            show: true,
            position: "right",
            formatter: "{c}",
            textStyle: {
              color: "white", //color of value
            },
          },
        },
        itemStyle: {
          normal: {
            show: true,
            color: function (params) {
              let num = colorArray.length;
              return colorArray[params.dataIndex % num]
            },
            borderWidth: 0,
            borderColor: "#333",
          },
        },
        barGap: "0%",
        // data: [60, 132, 89, 134, 60],
      },
    ],
  };
  bottom_left2Charts.setOption(bottom_left2Option)
  bottom_left2_getData()
}

// 获取图表数据
function bottom_left2_getData() {
  const yAxis = ["first", "two", "three", "four", "five"]
  const series = [
    {
      data: [60, 132, 89, 134, 60]
    },
  ]
  bottom_left2_updateChart(yAxis, series)
}

// 更新图表
function bottom_left2_updateChart(yAxisData, seriesData) {
  var bottom_left2Charts = echarts.init(document.querySelector("#bottom_left2"))
  const dataOption = {
    yAxis: yAxisData,
    series: seriesData
  }
  bottom_left2Charts.setOption(dataOption)
}

//下中图表
function bottom_center() {
  var bottom_centerCharts = echarts.init(document.querySelector("#bottom_center"))
  let dataAll = [389, 259, 262, 324, 232, 176];
  let yAxisData = [
    "原因1",
    "原因2",
    "原因3",
    "原因4",
    "原因5",
    "原因6",
  ];
  let bottom_centerOption = {
    title: [
      {
        text: "各渠道投诉占比",
        x: "2%",
        y: "2%",
        textStyle: { color: "#fff", fontSize: "14" },
      },
      {
        text: "投诉原因TOP10",
        x: "40%",
        y: "1%",
        textStyle: { color: "#fff", fontSize: "14" },
      },
    ],
    grid: [{ x: "50%", y: "7%", width: "45%", height: "90%" }],
    tooltip: {
      formatter: "{b} ({c})",
    },
    xAxis: [
      {
        gridIndex: 0,
        axisTick: { show: false },
        axisLabel: { show: false },
        splitLine: { show: false },
        axisLine: { show: false },
      },
    ],
    yAxis: [
      {
        gridIndex: 0,
        interval: 0,
        data: yAxisData.reverse(),
        axisTick: { show: false },
        axisLabel: { show: true },
        splitLine: { show: false },
        axisLine: { show: true, lineStyle: { color: "#fff" } },
      },
    ],
    series: [
      {
        name: "各渠道投诉占比",
        type: "pie",
        radius: "30%",
        center: ["22%", "55%"],
        color: ["#86c9f4", "#4da8ec", "#3a91d2", "#005fa6", "#315f97"],
        data: [
          { value: 335, name: "客服电话" },
          { value: 310, name: "奥迪官网" },
          { value: 234, name: "媒体曝光" },
          { value: 135, name: "质检总局" },
          { value: 105, name: "其他" },
        ],
        labelLine: { normal: { show: false } },
        itemStyle: {
          normal: {
            label: {
              show: true,
              formatter: "{b} \n ({d}%)",
              textStyle: { color: "#fff" },
            },
          },
        },
      },

      {
        name: "投诉原因TOP10",
        type: "bar",
        xAxisIndex: 0,
        yAxisIndex: 0,
        barWidth: "45%",
        itemStyle: { normal: { color: "#86c9f4" } },
        label: {
          normal: {
            show: true,
            position: "right",
            textStyle: { color: "#9EA7C4" },
          },
        },
        data: dataAll.sort(),
      },
    ],
  };


  bottom_centerCharts.setOption(bottom_centerOption)
}

//下右图表
function bottom_right_initChart() {
  var bottom_rightCharts = echarts.init(document.querySelector("#bottom_right"))
  let fontColor = "#fff";
  let bottom_rightOption = {
    color: [
      "#bf19ff",
      "#854cff",
      "#5f45ff",
      "#02cdff",
      "#0090ff",
      "#f9e264",
      "#f47a75",
      "#009db2",
      "#0780cf",
      "#765005",
    ],
    textStyle: {
      fontSize: 16,
    },
    title: {
      text: "各级财政投入扶贫专项资金",
      left: "left",
      top: 10,
      textStyle: {
        color: fontColor,
        align: "center",
      },
    },
    grid: {
      left: "10",
      right: "20",
      bottom: "10",
      top: "80",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        label: {
          show: true,
          backgroundColor: "#333",
        },
      },
    },
    legend: {
      show: true,
      x: "right",
      top: "20",
      textStyle: {
        color: fontColor,
      },
      data: ["中央", "自治区", "盟市"],
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        axisLabel: {
          color: fontColor,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#397cbc",
          },
        },
        data: ["2016年", "2017年", "2018年", "2019年", "2020年"],
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "亿元",
        axisLine: {
          lineStyle: {
            color: fontColor,
          },
        },
      },
    ],
    series: [
      {
        name: "中央",
        type: "line",
        stack: "总量",
        symbolSize: 8,
        label: {
          normal: {
            show: true,
            position: "top",
            color: "#fff"
          },
        },
        itemStyle: {
          normal: {
            areaStyle: {
              //color: '#94C9EC'
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "rgba(7,44,90,0.3)",
                },
                {
                  offset: 1,
                  color: "rgba(0,146,246,0.9)",
                },
              ]),
            },
          },
        },
        data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 260, 280],
      },
      {
        name: "自治区",
        type: "line",
        stack: "总量",
        symbol: "circle",
        symbolSize: 8,
        label: {
          normal: {
            show: true,
            position: "top",
            color: "#fff"
          },
        },
        itemStyle: {
          normal: {
            areaStyle: {
              //color: '#94C9EC'
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "rgba(7,44,90,0.3)",
                },
                {
                  offset: 1,
                  color: "rgba(0,212,199,0.9)",
                },
              ]),
            },
          },
        },
        data: [220, 182, 191, 210, 230, 270, 270, 201, 154, 140, 240, 250],
      },
      {
        name: "盟市",
        type: "line",
        stack: "总量",
        symbol: "circle",
        symbolSize: 8,
        label: {
          normal: {
            show: true,
            position: "top",
            color: "#fff"
          },
        },
        itemStyle: {
          normal: {
            areaStyle: {
              //color: '#94C9EC'
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "rgba(7,44,90,0.3)",
                },
                {
                  offset: 1,
                  color: "rgba(114,144,89,0.9)",
                },
              ]),
            },
          },
        },
        data: [150, 232, 201, 154, 190, 180, 210, 150, 182, 201, 154, 190],
      },
    ],
  };

  bottom_rightCharts.setOption(bottom_rightOption)
}

window.addEventListener('resize', function () {
  // top_left_initChart.resize();
  top_center_initChart.resize();
  // top_right_initChart.resize();
  // bottom_left1_initChart.resize();
  // bottom_left2_initChart.resize();
  // bottom_right_initChart.resize();
})