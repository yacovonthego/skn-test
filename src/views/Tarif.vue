<template>
    <div>
        <upper v-bind:data="'Тариф: &quot;' + allPostsTarifs[$route.params.tarifId-1].title + '&quot;'"></upper>
        <div class="container">
            <div class="tarif" v-for="(tarif, index) in allTarifsSorted" :key="tarif.ID">
                <div class="tarif__title">
                    {{ (tarif.pay_period) }} месяц
                </div>
                <hr>
                <div class="tarif__price">
                    {{ allTarifsSorted[0].price - calculatePrice(allTarifsSorted[0], tarif) / (+tarif.pay_period) }} &#8381/мес <br>
                </div>
                <div class="tarif__cost">
                    разовый платеж &#8212 {{ tarif.price }} &#8381
                </div>
                <div class="solo" v-if="index==0"></div>
                <div class="tarif__diff" v-if="index > 0">
                    скидка &#8212 {{ calculatePrice(allTarifsSorted[0], tarif) }} &#8381
                </div>
                <div class="arrow" @click="goOption(index+1)"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import upper from '../components/Upper'
    export default {
        name: "Tarif",
        data() {
            return {
                allTarifsSorted: [],
                isSolo: false
            }
        },
        components: {
            'upper': upper
        },
        computed: mapGetters(['allPostsTarifs']),
        methods: {
            ...mapActions(['fetchPosts']),
            compareIds(a,b) {
                if (a.ID > b.ID) return 1;
                if (a.ID == b.ID) return 0;
                if (a.ID < b.ID) return -1;
            },
            calculatePrice(tarifA, tarifCalc) {
                let dif = (tarifA.price * (+tarifCalc.pay_period)) - tarifCalc.price;
                if (dif > 0) return dif;
                else return 0;
            },
            goOption(id) {
                this.$router.push('/tarif/' + this.$route.params.tarifId + '/type/' + id);
            }
        },
        async beforeMount() {
            await this.fetchPosts();
            this.allTarifsSorted = await this.$store.getters.allPostsTarifs[this.$route.params.tarifId-1].tarifs.sort(this.compareIds);
        }
    }
</script>

<style scoped lang="sass">
    .solo
        padding-bottom: 20px
    .arrow
        right: 0
        top: 85px
        position: absolute
        cursor: pointer
        margin-right: 25px
        width: 32px
        height: 32px
        background-image: url('../images/arrow-right.png')
        background-size: contain
    hr
        margin: 0
    .container
        justify-content: space-around
        display: flex
        flex-wrap: wrap
    .tarif
        position: relative
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
        &__price
            color: #4D575D
            font-size: 24px
            font-weight: bold
            padding-top: 15px
            padding-bottom: 15px
        &__cost, &__diff
            color: #4D575D
            font-size: 20px
        &__diff
            padding-top: 5px
            padding-bottom: 20px
    

</style>