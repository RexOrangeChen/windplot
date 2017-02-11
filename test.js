var myChart = echarts.init(document.getElementById('main'));
var uploadedDataURL = "hello.json";


$.getJSON(uploadedDataURL, function(data) {
    var nam = []
	var hStep = 300 / (data.length - 1);
    var windLines = [].concat.apply([], data.map(function (windLine, idx) {
        var prevPt;
        var points = [];
		var names = windLine[0];
        for (var i = 1; i < windLine.length; i += 2) {
            var pt = [parseFloat(windLine[i]), parseFloat(windLine[i + 1])];
            if (i > 1) {
                pt = [
                    prevPt[0] + pt[0],
                    prevPt[1] + pt[1]
                ];
            }
            prevPt = pt;
            points.push([pt[0]  , pt[1] ]);
			
		}
		nam.push(windLine[0])
        return {
			name: names,
            coords: points,
            lineStyle: {
                normal: {
                    color: echarts.color.modifyHSL('#5A94DF', Math.round(hStep * idx))
                }
            }
        };
		
    }));

    myChart.setOption(option = {
		backgroundColor: new echarts.graphic.RadialGradient(0.5, 0.5, 0.4, [{
        offset: 0,
        color: '#4b5769'
    }, {
        offset: 1,
        color: '#404a59'
    }]),
		title : {
        text: '台风数据可视化1949',
        left: 'center',
        textStyle : {
            color: '#fff'
        }
    },
		legend: {
        orient: 'vertical',
        top: 'bottom',
        left: 'right',
        data:nam,
		zlevel:2,
        textStyle: {
            color: '#fff'
        },
        selectedMode: 'multiple'
    },
        geo: {
            map: 'world',
			center: [126.40, 20.04],
            zoom: 5,
            roam: true,
            itemStyle: {
            normal: {
                areaColor: '#323c48',
                borderColor: '#404a59'
            },
            emphasis: {
                areaColor: '#2a333d'
            }
        }
        },
        series: [{
            type: 'lines',
            coordinateSystem: 'geo',
            polyline: true,
            data: windLines,
            silent: true,
            lineStyle: {
                normal: {
                    // color: '#c23531',
                    // color: 'rgb(200, 35, 45)',
                    opacity: 0.2,
                    width: 5
                }
            },
            progressiveThreshold: 500,
            progressive: 200
        }, {
            type: 'lines',
            coordinateSystem: 'geo',
            polyline: true,
            data: windLines,
            lineStyle: {
                normal: {
                    width: 0
                }
            },
            effect: {
                constantSpeed: 50,
                show: true,
                trailLength: 0.2,
                symbolSize: 4
            },
            zlevel: 1
        }]
    });
});
