// 上左图表
function top_left() {
    var top_leftCharts = echarts.init(document.querySelector("#top_left"))
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
        formatter: function (params) {
          return (
            params[0].name +
            "<br/>" +
            "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
            params[0].seriesName +
            " : " +
            Number(
              (params[0].value.toFixed(4) / 10000).toFixed(2)
            ).toLocaleString() +
            " 万元<br/>"
          );
        },
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
          data: ["窗口1", "窗口2", "窗口3", "窗口4", "窗口5"],
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
          data: [500, 420, 330, 200, 180],
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
  
  }