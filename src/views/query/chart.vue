<template>
    <div class="query-chart-section">
        <v-chart :id="getId()" :options="options1" :callback="callback"></v-chart>
    </div>
</template>

<script>
export default {
    name: 'queryChart',
    props: {
        item: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            modelOpts: [
                { label: '亢龙', value: '亢龙', profit: 10 },
                { label: '一箭双雕', value: '一箭双雕', profit: 10 },
                { label: '七星1', value: '七星1', profit: 20 },
                { label: '七星2', value: '七星2', profit: 30 },
                { label: '反客为主', value: '反客为主', profit: 10 },
                { label: '以逸待劳', value: '以逸待劳', profit: 10 },
                { label: '出水芙蓉', value: '出水芙蓉', profit: 10 },
                { label: '隔山打牛', value: '隔山打牛', profit: 10 },
                { label: '大有', value: '大有', profit: 10 },
                { label: '峰回路转', value: '峰回路转', profit: 10 },
                { label: '龙战与野', value: '龙战与野', profit: 10 },
                { label: '飞龙在天', value: '飞龙在天', profit: 10 },
                { label: '柳暗花明', value: '柳暗花明', profit: 10 },
                { label: '神0', value: '神0', profit: 10 },
                { label: '神1', value: '神1', profit: 10 },
                { label: '神2', value: '神2', profit: 10 },
                { label: '神3', value: '神3', profit: 10 },
                { label: '神4', value: '神4', profit: 10 },
                { label: '葛八', value: '葛八', profit: 10 }
            ],
            options1: {}
        };
    },
    mounted() {
        console.log('this.item', this.item);
        this.options1 = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: 'line'
                }
            ]
        };
        debugger;
        let data = this.splitData(this.item);
        this.options1 = {
            animation: false,
            legend: {
                bottom: 10,
                left: 'center',
                data: ['Dow-Jones index', 'MA5', 'MA10', 'MA20', 'MA30']
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                },
                borderWidth: 1,
                borderColor: '#ccc',
                padding: 10,
                textStyle: {
                    color: '#000'
                },
                position: function(pos, params, el, elRect, size) {
                    const obj = {
                        top: 10
                    };
                    obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                    return obj;
                }
                // extraCssText: 'width: 170px'
            },
            axisPointer: {
                link: [
                    {
                        xAxisIndex: 'all'
                    }
                ],
                label: {
                    backgroundColor: '#777'
                }
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: false
                    },
                    brush: {
                        type: ['lineX', 'clear']
                    }
                }
            },
            brush: {
                xAxisIndex: 'all',
                brushLink: 'all',
                outOfBrush: {
                    colorAlpha: 0.1
                }
            },
            visualMap: {
                show: false,
                seriesIndex: 5,
                dimension: 2,
                pieces: [
                    {
                        value: 1,
                        color: '#ec0000'
                    },
                    {
                        value: -1,
                        color: '#00da3c'
                    }
                ]
            },
            grid: [
                {
                    left: '10%',
                    right: '8%',
                    height: '50%'
                },
                {
                    left: '10%',
                    right: '8%',
                    top: '63%',
                    height: '16%'
                }
            ],
            xAxis: [
                {
                    type: 'category',
                    data: data.categoryData,
                    scale: true,
                    boundaryGap: false,
                    axisLine: { onZero: false },
                    splitLine: { show: false },
                    min: 'dataMin',
                    max: 'dataMax',
                    axisPointer: {
                        z: 100
                    }
                },
                {
                    type: 'category',
                    gridIndex: 1,
                    data: data.categoryData,
                    scale: true,
                    boundaryGap: false,
                    axisLine: { onZero: false },
                    axisTick: { show: false },
                    splitLine: { show: false },
                    axisLabel: { show: false },
                    min: 'dataMin',
                    max: 'dataMax'
                }
            ],
            yAxis: [
                {
                    scale: true,
                    splitArea: {
                        show: true
                    }
                },
                {
                    scale: true,
                    gridIndex: 1,
                    splitNumber: 2,
                    axisLabel: { show: false },
                    axisLine: { show: false },
                    axisTick: { show: false },
                    splitLine: { show: false }
                }
            ],
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: [0, 1],
                    start: 98,
                    end: 100
                },
                {
                    show: true,
                    xAxisIndex: [0, 1],
                    type: 'slider',
                    top: '85%',
                    start: 98,
                    end: 100
                }
            ],
            series: [
                {
                    name: 'Dow-Jones index',
                    type: 'candlestick',
                    data: data.values,
                    itemStyle: {
                        color: '#00da3c',
                        color0: '#ec0000',
                        borderColor: undefined,
                        borderColor0: undefined
                    },
                    tooltip: {
                        formatter: function(param) {
                            param = param[0];
                            return [
                                'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                                'Open: ' + param.data[0] + '<br/>',
                                'Close: ' + param.data[1] + '<br/>',
                                'Lowest: ' + param.data[2] + '<br/>',
                                'Highest: ' + param.data[3] + '<br/>'
                            ].join('');
                        }
                    }
                },
                {
                    name: 'MA10',
                    type: 'line',
                    data: this.calculateMA(10, data),
                    smooth: true,
                    lineStyle: {
                        opacity: 0.5
                    }
                },
                {
                    name: 'MA20',
                    type: 'line',
                    data: this.calculateMA(20, data),
                    smooth: true,
                    lineStyle: {
                        opacity: 0.5
                    }
                },
                {
                    name: 'MA60',
                    type: 'line',
                    data: this.calculateMA(60, data),
                    smooth: true,
                    lineStyle: {
                        opacity: 0.5
                    }
                },
                {
                    name: 'Volume',
                    type: 'bar',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: data.volumes
                }
            ]
        };
    },
    methods: {
        getId() {
            return `${new Date().getTime() * Math.random()}`;
        },
        splitData(rawData) {
            let categoryData = rawData.map(v => v.d);
            let values = rawData.map(v => [v.o, v.c, v.l, v.h, v.v]);
            let volumes = rawData.map((v, i) => [i, v, v, v.o > v.c ? 1 : -1]);
            let MA10 = rawData.map((v, i) => v.ma10);
            let MA20 = rawData.map((v, i) => v.ma20);
            let MA60 = rawData.map((v, i) => v.ma60);

            return {
                categoryData,
                values,
                volumes,
                MA10,
                MA20,
                MA60
            };
        },
        calculateMA(dayCount, data) {
            return data[`MA${dayCount}`];
        },
        callback(myChart) {
            myChart.dispatchAction({
                type: 'brush',
                areas: [
                    {
                        brushType: 'lineX',
                        coordRange: ['2021-07-01', '2021-07-20'],
                        xAxisIndex: 0
                    },
                    {
                        brushType: 'lineX',
                        coordRange: ['2021-08-13', '2021-09-20'],
                        xAxisIndex: 0
                    }
                ]
            });
            return myChart;
        }
    }
};
</script>

<style lang="scss" scoped>
.query-chart-section {
    height: 300px;
}
</style>
