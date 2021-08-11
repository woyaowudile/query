<template>
    <div class="table-section">
        <div class="trade-table">
            <div class="btn">
                <el-button type="primary" @click="tableAdd">新增</el-button>
            </div>
        </div>
        <v-chart :options="options"></v-chart>

        <el-dialog :title="dialog.title" :visible.sync="dialog.visible" :width="dialog.width">
            <form-section :forms="forms"></form-section>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="dialogOk">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import services from '../../services/services';
export default {
    name: 'table-section',
    data() {
        return {
            options: {},
            forms: {},
            dialog: {
                title: '提示',
                width: '50%',
                visible: false
            }
        };
    },
    created() {
        setTimeout(() => {
            this.options = {
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [
                    {
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }
                ]
            };
            this.forms = {
                model: {},
                labelWidth: '80px',
                list: [
                    { label: 'code', key: 'code' },
                    { label: 'name', key: 'name' },
                    { label: 'buy_date', key: 'buy_date' },
                    { label: 'sale_date', key: 'sale_date' },
                    { label: 'stop_loss', key: 'stop_loss' },
                    { label: 'buy', key: 'buy' },
                    { label: 'sale', key: 'sale' },
                    { label: 'remark', key: 'remark' }
                ]
            };
        });
    },
    methods: {
        tableAdd() {
            this.dialog.visible = true;
        },
        async dialogOk() {
            console.log(this.forms?.model);
            const res = await services.add(this.forms?.model);
            this.$message.success(res.message);
            this.dialog.visible = false;
            this.forms.model = {};
        }
    }
};
</script>

<style lang="scss" scoped></style>
