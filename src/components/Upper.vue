<template>
    <div class="title">
        {{ data }}
        <div class="title-arrow" @click="$router.go(-1)"></div>
    </div>
</template>

<script>
    export default {
        name: "upper",
        props: ['data']
    }
</script>

<style scoped lang="sass">
    .title
        text-align: center
        font-size: 35px
        font-weight: bold
        padding: 20px 0
        border: 1px solid #ccc
        background-color: #F7F7F8
        position: relative
        margin-bottom: 40px
        &-arrow
            cursor: pointer
            position: absolute
            left: 25px
            top: 20px
            width: 40px
            height: 40px
            background-image: url('../images/arrow-left.png')
            background-size: contain
</style>