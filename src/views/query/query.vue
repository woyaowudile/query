<template>
    <div class="query-section">
        <div class="search">11111</div>
        <div class="body">
            <div v-for="(item, i) in historyRes.data" :key="i">
                <div>{{ getItem(item, i, 'keys') }}</div>
                <query-chart :item="getItem(item, i, 'values')"></query-chart>
            </div>
        </div>
    </div>
</template>

<script>
import queryChart from './chart';
import services from '../../services/services';
export default {
    name: 'query',
    components: { queryChart },
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
            historyRes: []
        };
    },
    async created() {
        this.historyRes = await services.getquery({
            days: 1000,
            page: 1
        });
    },
    computed: {
        getItem() {
            return (item, i, name) => {
                return Object[name](item)[i];
            };
        }
    }
};
</script>

<style lang="scss" scoped>
.query-section {
    .body {
        height: 300px;
    }
}
</style>
