<template>
    <div id="app">
        <!-- <router-view /> -->
        <trade-section></trade-section>
    </div>
</template>

<script>
import tradeSection from './views/trade/trade.vue';
export default {
    name: 'App',
    components: { tradeSection }
};
</script>

<style lang="less" scoped>
#app {
    height: 100vh;
    background: #cfcfcf;
}
</style>

<style>
html,
body {
    padding: 0;
    margin: 0;
}
</style>
