<template>
  <div class="container">
    <div class="post" v-for="(post, index) in allPostsTarifs" v-if="index<3" :key="allPosts.id">
      <div class="post__title">
        Тариф: "{{ post.title }}"
        <hr>
      </div>
      <div class="post__wrap">
        <div class="post__wrap-text">
          <div class="post__wrap-text__speed" v-bind:class="{brown: isBrown(index), red: isRed(index), blue: isBlue(index)}">
            {{ post.speed }} Мбит/с
          </div>
          <div class="post__wrap-text__tariff">
            {{ allExtremePts[index*2] }} - {{ allExtremePts[index*2+1] }} &#8381/мес
          </div>
          <div class="post__wrap-text__info" v-if="post.free_options">
            <div v-for="item in post.free_options"> {{ item }} </div>
          </div>
        </div>
        <div class="arrow" @click="goTarif(index+1)"></div>
      </div>
      <div class="post__link">
        <hr>
        <a v-bind:href="post.link">узнать подробнее на sknt.ru</a>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {mapGetters, mapActions} from 'vuex'
  export default {
    name: "home",
    computed: mapGetters(['allPosts', 'allPostsTarifs','allExtremePts']),
    methods: {
      goTarif(id) {
        this.$router.push('/tarif/' + id);
      },
      isBrown(index) {
        return index === 0
      },
      isBlue(index) {
        return index === 1
      },
      isRed(index) {
        return index === 2
      },
      ...mapActions(['fetchPosts'])
    },
    async beforeMount() {
      await this.fetchPosts();
    }
  };
</script>

<style lang="sass">
  .brown
    background-color: #70603E
  .blue
    background-color: #0075D9
  .red
    background-color: #E74807
  .container
    justify-content: space-around
    display: flex
    flex-wrap: wrap
  .post
    width: 640px
    background-color: #fff
    border: 1px solid #ccc
    margin-bottom: 40px
    &__link
      padding-left: 35px
      padding-bottom: 25px
      hr
        margin-bottom: 25px
      a, a:hover, a:active, a:visited
        color: #449DFF
        font-size: 30px
        text-decoration: none
    &__title
      color: #82C12B
      font-size: 38px
      font-weight: bold
      padding-top: 20px
      padding-bottom: 20px
      padding-left: 35px
    &__wrap
      display: flex
      justify-content: space-between
      align-items: center
      &-text
        &__speed
          color: #fff
          width: 170px
          padding-left: 35px
          padding-top: 10px
          padding-bottom: 10px
          font-size: 30px
          font-weight: bold
        &__tariff
          color: #4E585E
          font-size: 30px
          padding-left: 35px
          padding-top: 15px
          padding-bottom: 15px
          font-weight: bold
        &__info
          color: #4E585E
          font-size: 30px
          padding-left: 35px
      .arrow
        cursor: pointer
        margin-right: 25px
        width: 32px
        height: 32px
        background-image: url('../images/arrow-right.png')
        background-size: contain


</style>
