<template>
    <div class="v-cahrt" style="height:100%">
        <!-- <chart :options="options"></chart> -->
        <div :id="id" style="width: 100%;height:100%;"></div>
    </div>
</template>

<script>
// import chart from 'vue-echarts';
import * as echarts from 'echarts';
export default {
    name: 'v-chart',
    // components: { chart },
    props: {
        options: {
            type: Object,
            default: () => ({})
        },
        id: [Number, String],
        callback: Function
    },
    data() {
        return {
            myChart: null
        };
    },
    watch: {
        options: {
            handler(val) {
                this.myChart.setOption(val);
                this.myChart.resize();
            },
            deep: true
        }
    },
    mounted() {
        // 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(document.getElementById(this.id));
        this.myChart = this.callback && this.callback(this.myChart);
    },
    methods: {
        getChart() {
            this.$emit('on-get-chart', this.myChart);
        }
    }
};
</script>

<style lang="scss">
.v-chart {
    height: 100%;
}
</style>
