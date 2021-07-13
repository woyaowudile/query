<template>
    <div>
        11111111111111
    </div>
</template>

<script>
import { getUrl, CODELIST } from './../../../core';
export default {
    name: 'tableSection',
    data() {
        return {
            historys: {},
            stash: {}
        };
    },
    created() {
        // 1. 获取当前日期
        let newDate = new Date().toLocaleDateString();
        // 2. 如果有缓存就赋值
        let list = localStorage.getItem('history') ?? '{}';
        this.historys = JSON.parse(list);
        // 3. 如果有缓存日期
        let date = localStorage.getItem('date');
        // console.log(this.getSliceList(-3));

        Promise.all(
            CODELIST.map(code => {
                // 4. 如果historys中没有 && 今日的日期和缓存的不一样
                if (!this.historys[code] && date !== newDate) {
                    return this.api(code);
                }
            })
        ).then(datas => {
            debugger;
            // 5. 如果调完成后，重新将 日期、所有数据 存储起来
            // localStorage.setItem('date', newDate)
            localStorage.setItem('history', JSON.stringify(this.historys));
        });
    },
    methods: {
        getSliceList(num) {
            return this.historys.slice(num);
        },
        isKlyh(data) {
            let [d1, d2, d3] = data;
            if (this.YingYang(d1) !== 2) return;
            if (this.YingYang(d2) !== 2) return;
            if (this.YingYang(d3) !== 1) return;
            if (this.entity(d1) >= this.entity(d2)) {
                // 怎么算小？怎么算大？
                return;
            }
            if (!this.lohc(d2, d3)) return;
        },
        entity(data) {
            // 实体
            let { o, c } = data;
            return Math.abs(o - c);
        },
        YingYang(data) {
            // yang1， ying2，shizixing3
            let { o, c } = data;
            if (c > o) {
                return 1;
            } else if (c < o) {
                return 2;
            } else {
                return 3;
            }
        },

        shadowLineTop(deviation) {
            // 上影线
        },
        shadowLineBottom(deviation) {
            // 下影线
        },
        lohc(d1, d2) {
            return d2.o < d1.c && d2.c > d1.c;
        },
        api(code) {
            return fetch(getUrl(code)).then(res => {
                return res.json();
            });
        }
    }
};
</script>

<style lang="scss" scoped></style>
