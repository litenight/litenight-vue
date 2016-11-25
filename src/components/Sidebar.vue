<template>
    <div class="ui sidebar vertical inverted menu">
        <a class="item">1</a>
        <a class="item">2</a>
        <a class="item">3</a>
    </div>
</template>

<script>
module.exports = {
    props: {},
    data: () => {
        return {

        };
    },
    methods: {
        show: function() {
            $('.ui.sidebar').sidebar('show');
        }
    }
}
</script>
