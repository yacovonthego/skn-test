export default {
    state: {
        posts: [],
        extremePts: []
    },
    actions: {
        async fetchPosts(ctx) {
            const res = await fetch(
                "https://cors-anywhere.herokuapp.com/https://www.sknt.ru/job/frontend/data.json"
            );
            const posts = await res.json();

            ctx.commit('updatePosts', posts);

            let calcArray = [];

            for (let field in posts.tarifs) {
                for (let field1 in posts.tarifs[field].tarifs) {
                    calcArray.push(posts.tarifs[field].tarifs[field1].price);
                }
                ctx.commit('pushExtremePts', Math.min(...calcArray));
                ctx.commit('pushExtremePts', Math.max(...calcArray));
                calcArray.length = 0;
            }
        }
    },
    mutations: {
        updatePosts(state, posts) {
            state.posts = posts
        },
        pushExtremePts(state, item) {
            state.extremePts.push(item);
        }
    },
    getters: {
        allPosts(state) {
            return state.posts
        },
        allPostsTarifs(state) {
          return state.posts.tarifs
        },
        allExtremePts(state) {
            return state.extremePts
        }
    }
}