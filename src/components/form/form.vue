<template>
    <div class="form-section">
        <el-form ref="form" :model="forms.model" :label-width="forms.labelWidth">
            <el-form-item v-for="(item, index) in forms.list" :key="index" :label="item.label">
                <el-input v-if="item.type === 'text'" v-model="forms.model[item.key]"></el-input>
                <el-input
                    v-else-if="item.type === 'area'"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="forms.model[item.key]"
                    @change="change($event, item, item.key)"
                >
                </el-input>
                <el-input-number
                    v-else-if="item.type === 'number'"
                    v-model="forms.model[item.key]"
                    :precision="2"
                    :step="0.1"
                    @change="change($event, item, item.key)"
                ></el-input-number>
                <el-date-picker
                    v-else-if="item.type === 'date'"
                    v-model="forms.model[item.key]"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期"
                    @change="change($event, item, item.key)"
                >
                </el-date-picker>
                <el-select
                    v-else-if="item.type === 'select'"
                    v-model="forms.model[item.key]"
                    placeholder="请选择"
                    @change="change($event, item, item.key)"
                >
                    <el-option
                        v-for="level2 in item.options"
                        :key="level2.value"
                        :label="level2.label"
                        :value="level2.value"
                    >
                    </el-option>
                </el-select>
                <el-radio-group v-else-if="item.type === 'radio'" v-model="forms.model[item.key]">
                    <el-radio v-for="(level2, index2) in item.options" :key="index2" :label="level2.value">{{
                        level2.label
                    }}</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'form-section',
    props: {
        forms: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        getModel() {
            return this.forms?.model;
        },
        change(value, item, key) {
            this.$emit('on-change', { value, item, key });
        }
    }
};
</script>

<style lang="scss" scoped></style>
