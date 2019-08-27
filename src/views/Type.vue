<template>
    <div>
        <upper v-bind:data="'Выбор тарифа'"></upper>
        <div class="container">
            <div class="type">
                <div class="type__title">
                    Тариф: "{{ allPostsTarifs[$route.params.tarifId-1].title }}"
                </div>
                <hr>
                <div class="type__period">
                    Период оплаты &#8212 {{ allTarifsSorted[$route.params.typeId-1].pay_period }}
                    <span v-if="(+$route.params.typeId) === 1">месяц</span>
                    <span v-else-if="(+$route.params.typeId) === 2">месяца</span>
                    <span v-else="(+$route.params.typeId) === 3">месяцев</span>
                    <br>
                    {{ allTarifsSorted[$route.params.typeId-1].price / (+allTarifsSorted[$route.params.typeId-1].pay_period) }} &#8381/мес
                </div>
                <div class="type__cost">
                    разовый платеж &#8212 {{ allTarifsSorted[$route.params.typeId-1].price }} &#8381
                    <br>
                    со счета спишется &#8212 {{ allTarifsSorted[$route.params.typeId-1].price }} &#8381
                </div>
                <div class="type__payment">
                    вступит в силу &#8212 сегодня
                    <br>
                    активно до &#8212 {{ computeTime(allTarifsSorted[$route.params.typeId-1].new_payday) }}
                </div>
                <hr>
                <button class="type__button">Выбрать</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import upper from '../components/Upper'
    export default {
        name: "type",
        data() {
            return {
                allTarifsSorted: []
            }
        },
        components: {
            'upper': upper
        },
        methods: {
            ...mapActions(['fetchPosts']),
            computeTime(tpWTz) {
                let a = tpWTz.split('+'),
                    b = new Date(+a[0]*1000 + (parseInt(a[1])*60*60*1000));
                return '' + b.getDate() + '.' + b.getMonth() + '.' + b.getFullYear()
            },
            compareIds(a,b) {
                if (a.ID > b.ID) return 1;
                if (a.ID == b.ID) return 0;
                if (a.ID < b.ID) return -1;
            }
        },
        computed: mapGetters(['allPostsTarifs']),
        async beforeMount() {
            await this.fetchPosts();
            this.allTarifsSorted = await this.$store.getters.allPostsTarifs[this.$route.params.tarifId-1].tarifs.sort(this.compareIds);
        }
    }
</script>

<style scoped lang="sass">
    button, input, optgroup, select, textarea
        font-family: inherit
        font-size: 100%
        line-height: 1.15
        margin: 0
    button, input
        overflow: visible
    button, select
        text-transform: none
    button, [type="button"], [type="reset"], [type="submit"]
        -webkit-appearance: button
    button::-moz-focus-inner, [type="button"]::-moz-focus-inner, [type="reset"]::-moz-focus-inner, [type="submit"]::-moz-focus-inner
        border-style: none
        padding: 0
    button:-moz-focusring, [type="button"]:-moz-focusring, [type="reset"]:-moz-focusring, [type="submit"]:-moz-focusring
        outline: 1px dotted ButtonText
    hr
        margin: 0
    button::-moz-focus-inner
        border: none !important
    button:active
        outline: none
        border: none
    button:focus
        outline: none
        border: none
    .container
        width: 100%
        display: flex
        justify-content: space-around
    .type
        width: 598px
        background-color: #fff
        border: 1px solid #ccc
        margin-bottom: 25px
        padding-left: 35px
        &__title
            color: #85C230
            font-size: 24px
            font-weight: bold
            padding-top: 15px
            padding-bottom: 15px
        &__period
            color: #4D575D
            font-size: 24px
            font-weight: bold
            padding-top: 15px
            padding-bottom: 15px
        &__cost
            color: #4D575D
            font-size: 20px
            margin-bottom: 15px
        &__payment
            color: #BDBDBD
            font-size: 20px
            margin-bottom: 5px
        &__button
            color: #fff
            font-weight: bold
            font-size: 20px
            margin-top: 10px
            margin-bottom: 10px
            background-color: #82C12B
            width: 94%
            height: 3rem

</style>