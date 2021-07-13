<template>
    <div id="app">
        <!-- <router-view /> -->
        <table-section></table-section>
    </div>
</template>

<script>
import tableSection from './views/tableSection/tableSection.vue';
export default {
    name: 'App',
    components: { tableSection }
};
</script>

<style></style>
