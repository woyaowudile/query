<template>
    <div class="trade-section">
        <div>
            <el-collapse v-model="collapseNames">
                <el-collapse-item name="1">
                    <template slot="title">
                        <span style="fontSize: 16px; paddingLeft: 10px">表格</span>
                    </template>
                    <div class="trade-btn">
                        <el-button type="primary" @click="tableAdd">新增</el-button>
                        <el-button type="primary" @click="chooseModel">筛选模型</el-button>
                        <el-button type="primary" @click="modelDownload">下载</el-button>
                        <!-- <a href="http://127.0.0.1:3333/api/before/download?d=15">筛选模型</a>
                        <a href="http://127.0.0.1:3333/api/download?d=today">下载</a> -->
                    </div>
                    <table-comp
                        class="trade-table"
                        :datas="tableOptions"
                        @on-edit="tableEdit"
                        @on-del="tableDel"
                    ></table-comp>
                </el-collapse-item>
                <el-collapse-item name="2">
                    <template slot="title">
                        <span style="fontSize: 16px; paddingLeft: 10px">图表</span>
                    </template>
                    <v-chart :id="getId()" class="trade-chart" :options="options1"></v-chart>
                    <el-row>
                        <el-col :span="12">
                            <v-chart :id="getId()" class="trade-chart" :options="options2"></v-chart>
                        </el-col>
                        <el-col :span="12">
                            <v-chart :id="getId()" class="trade-chart" :options="options3"></v-chart>
                        </el-col>
                    </el-row>
                </el-collapse-item>
            </el-collapse>
        </div>

        <el-dialog :title="dialog.title" :visible.sync="dialog.visible" :width="dialog.width">
            <form-section :forms="forms"></form-section>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogCancel">取 消</el-button>
                <el-button type="primary" @click="dialogOk">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog :title="model.title" :visible.sync="model.visible" :width="model.width">
            <div>
                <el-row>
                    <el-col :span="12">
                        <el-input v-model="model.type" placeholder="请输入type"></el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input v-model="model.d" placeholder="请输入d"></el-input>
                    </el-col>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="model.visible = false">取 消</el-button>
                <el-button type="primary" @click="modelOk">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import services from '../../services/services';
export default {
    name: 'trade-section',
    data() {
        return {
            collapseNames: ['1', '2'],
            options1: {},
            options2: {},
            options3: {},
            forms: {
                model: {},
                labelWidth: '80px',
                list: [
                    { label: 'code', key: 'code', type: 'text' },
                    { label: 'name', key: 'name', type: 'text' },
                    { label: 'model', key: 'model', type: 'text' },
                    { label: 'buy_date', key: 'buy_date', type: 'date' },
                    { label: 'sale_date', key: 'sale_date', type: 'date' },
                    { label: 'stop_loss', key: 'stop_loss', type: 'number' },
                    { label: 'stop_buy', key: 'stop_buy', type: 'number' },
                    { label: 'buy', key: 'buy', type: 'number' },
                    { label: 'num', key: 'num', type: 'number' },
                    { label: 'sale', key: 'sale', type: 'number' },
                    {
                        label: 'dwm',
                        key: 'dwm',
                        type: 'radio',
                        options: [
                            { label: '日', value: 'day' },
                            { label: '周', value: 'week' },
                            { label: '月', value: 'month' }
                        ]
                    },
                    {
                        label: 'is_buy',
                        key: 'is_buy',
                        type: 'radio',
                        options: [
                            { label: '是', value: '1' },
                            { label: '否', value: '0' }
                        ]
                    },
                    {
                        label: 'is_sale',
                        key: 'is_sale',
                        type: 'radio',
                        options: [
                            { label: '是', value: '1' },
                            { label: '否', value: '0' }
                        ]
                    },
                    { label: 'remark', key: 'remark', type: 'area' }
                ]
            },
            tableOptions: {
                rowClassName: ({ row, index }) => {
                    if (row.is_sale === '1') {
                        return 'sale';
                    } else if (row.is_buy === '1') {
                        return 'buy';
                    } else {
                        return 'other';
                    }
                },
                border: true,
                localData: [],
                btns: [
                    { label: '编辑', click: 'on-edit' },
                    { label: '删除', click: 'on-del' }
                ],
                list: [
                    { label: '代码', key: 'code' },
                    { label: '名称', key: 'name' },
                    { label: '买入', key: 'buy' },
                    { label: '仓位', key: 'num' },
                    { label: '卖出', key: 'sale' },
                    { label: '止损', key: 'stop_loss' },
                    { label: '止盈', key: 'stop_buy' },
                    { label: '买入日期', key: 'buy_date' },
                    { label: '卖出日期', key: 'sale_date' },
                    { label: '是否买入', key: 'is_buy' },
                    { label: '是否卖出', key: 'is_sale' },
                    { label: '模型', key: 'model' },
                    { label: '周期', key: 'dwm' },
                    { label: '备注', key: 'remark' }
                ]
            },
            dialog: {
                title: '提示',
                width: '80%',
                visible: false
            },
            model: {
                title: '提示',
                width: '80%',
                visible: false,
                type: 'day',
                d: 15
            }
        };
    },
    async created() {
        this.tableQuery();
    },
    methods: {
        getId() {
            return `${new Date().getTime() * Math.random()}`;
        },
        async tableQuery() {
            const res = await services.query();
            this.tableOptions.localData = res.data;
            // 根据数据去 组成echart
            let list = res.data.filter(level1 => level1.is_sale === '0' && level1.is_buy === '1');
            Promise.all(
                list
                    .map(async level1 => {
                        let { code, buy_date, sale_date, is_sale } = level1;
                        return services.echartQuery({ code, buy_date, sale_date });
                    })
                    .filter(level1 => level1)
            ).then(datas => {
                if (!datas.length) return;
                // 1. 找出所有的 日期
                let dates = datas
                    .map(level1 => {
                        let { data } = level1;
                        if (!data.length) {
                            return [this.today()];
                        }
                        return data.map(level2 => level2.d);
                    })
                    ?.flat();
                dates = this.sortDate([...new Set(dates)]);
                // 2. 排序、去重
                // 3. 组装数据，将值放入对应的日期位置
                let series = [],
                    pieData = [],
                    barData = [];
                datas.map((level1, index1) => {
                    let { name, buy_date, buy, sale_date, sale, is_sale, num, stop_loss, stop_buy } = list[index1];
                    let data = [],
                        arr = level1.data;
                    if (!arr.length) arr = [{ d: buy_date, c: buy }];

                    // 饼图
                    pieData.push({ value: buy * num, name });
                    // 柱状图
                    let barC = arr[arr.length - 1].c;
                    let bar = {
                        buy: barC - buy,
                        stop_loss: barC <= stop_loss,
                        stop_buy: barC >= stop_buy
                    };
                    // this.tableOptions.rowClassName = ({row, index}) => {
                    //     debugger
                    // }
                    if (bar.stop_loss) {
                        this.showNitice('error', '止损', `${name} 已到达止损位`, 0, 'top-right');
                    } else if (bar.stop_buy) {
                        this.showNitice('success', '止盈', `${name} 已到达止盈位`, 4500, 'bottom-right');
                    } else if (bar.buy < 0 && is_sale === '0') {
                        this.showNitice('warning', '亏损', `${name} 盈利负增长`, 2500, 'bottom-left');
                    }
                    barData.push((bar.buy * num).toFixed(2));
                    // 折线
                    arr.forEach(level2 => {
                        let { d, c } = level2;
                        let index = dates.findIndex(level3 => level3 === d);
                        if (buy_date === d) {
                            data[index] = buy;
                        } else if (sale_date === d) {
                            data[index] = sale;
                        } else {
                            data[index] = c;
                        }
                    });
                    series.push({
                        name,
                        type: 'line',
                        // stack: '总量',
                        data
                    });
                });

                let legend = {
                    type: 'scroll',
                    bottom: '0',
                    data: list.map(level1 => level1.name)
                };
                this.options1 = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend,
                    grid: {
                        top: '5%',
                        left: '3%',
                        right: '4%',
                        bottom: '12%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: dates
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series
                };
                this.options2 = {
                    tooltip: {
                        trigger: 'item'
                    },
                    legend,
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '50%',
                            data: pieData
                        }
                    ]
                };
                this.options3 = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend,
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    yAxis: {
                        type: 'value'
                    },
                    xAxis: {
                        type: 'category',
                        data: list.map(level1 => level1.name)
                    },
                    series: [
                        {
                            name: new Date().toLocaleDateString().replace(/\//g, '-'),
                            type: 'bar',
                            data: barData
                        }
                    ]
                };
            });
        },
        tableAdd() {
            this.dialog.title = '新增';
            this.forms.model.is_sale = '0';
            this.forms.model.is_buy = '0';
            this.forms.model.dwm = 'day';
            this.forms.model.num = 100;
            this.dialog.visible = true;
        },
        tableEdit(row) {
            this.dialog.title = '编辑';
            this.forms.model = {
                ...row
            };
            this.dialog.visible = true;
        },
        tableDel({ id }) {
            this.$confirm('确认删除该条数据吗？', '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const res = await services.del(id);
                this.$message.success(res.message);
                this.tableQuery();
            });
        },
        dialogCancel() {
            this.forms.model = {};
            this.dialog.visible = false;
        },
        async dialogOk() {
            let res = null;
            if (this.dialog.title === '新增') {
                res = await services.add(this.forms?.model);
            } else {
                res = await services.update(this.forms?.model);
            }
            this.$message.success(res.message);
            this.dialog.visible = false;
            this.forms.model = {};
            this.tableQuery();
        },
        today(days) {
            let today = new Date();
            let year = today.getFullYear();
            let month = today.getMonth() + 1 + '';
            let date = today.getDate() + '';
            return `${year}-${month.padStart(2, 0)}-${date.padStart(2, 0)}`;
        },
        sortDate(dates) {
            return dates.sort((x, y) => {
                let x1 = x.split('-');
                let y1 = y.split('-');
                if (x1[0] === y1[0]) {
                    if (x1[1] === y1[1]) {
                        return x1[2] - y1[2];
                    } else {
                        return x1[1] - y1[1];
                    }
                } else {
                    return x1[0] - y1[0];
                }
            });
        },
        showNitice(type, title, message, duration = 0, position = 'bottom-right') {
            this.$notify[type]({
                title,
                message,
                duration,
                position
            });
        },
        getBox() {
            return <div>{}</div>;
        },
        chooseModel() {
            this.model.visible = true;
        },
        async modelOk() {
            this.model.visible = false;
            let { type, d } = this.model;
            if (type) {
                const res = await services.beforeDownload({ type, d });
                this.$message.success(res.message);
            } else {
                let url = `http://40c1e1467e59.ngrok.io/api/download?d=${d}`;
                let a = document.createElement('a');
                document.body.appendChild(a);
                a.href = url;
                a.download = '汇总_today.xlsx';
                a.click();
                window.URL.revokeObjectURL(url);
            }
        },
        modelDownload() {
            this.model.visible = true;
        }
    }
};
</script>

<style lang="scss" scoped>
.trade-section {
    padding: 5px;
    .trade-table {
        margin: 5px;
        box-shadow: 0 0 3px 1px #82c1f0;
        /deep/ .el-table {
            .sale {
                background: #ffe6e6;
            }
            .buy {
                background: #f8fff5;
            }
            .other {
                background: #f4f4f4;
            }
        }
    }
    .trade-btn {
        margin: 5px;
        text-align: right;
    }
    .trade-chart {
        height: 300px;
        min-height: 200px;
        margin: 10px;
        border-radius: 5px;
        box-shadow: 0px 0px 5px 3px #bc9e9e;
    }
}
</style>
