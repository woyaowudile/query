<template>
    <div class="table">
        <el-table
            :row-class-name="datas.rowClassName"
            :data="datas.localData"
            :border="datas.border"
            :max-height="maxHeight || 200"
            style="width: 100%"
        >
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button
                        v-for="(item, index) in datas.btns"
                        :key="index"
                        @click="$emit(item.click, scope.row)"
                        :type="item.type || 'text'"
                        :size="item.size || 'small'"
                        >{{ item.label }}</el-button
                    >
                </template>
            </el-table-column>
            <el-table-column
                v-for="(item, index) in datas.list"
                :key="index"
                :prop="item.key"
                :label="item.label"
                :width="item.width || 120"
            >
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'table-comp',
    props: {
        datas: {
            type: Object,
            default: () => ({})
        }
    }
};
</script>

<style lang="scss" scoped></style>
