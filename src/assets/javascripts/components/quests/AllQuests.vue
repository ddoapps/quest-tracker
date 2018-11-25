<template>
    <section class="all-quests">
        <quest v-for="quest in quests" :key="quest.id" :quest="quest"></quest>
    </section>
</template>

<script>
    import Quest from './questsDisplay/ByLevel.vue';

    export default {
        components: {
            Quest
        }
        , mounted: function () {
            this.$store.commit( 'updateTheQuests', [] );

            this.$http.get( './api/quests' ).then( function ( xhr ) {
                this.$store.commit( 'updateTheQuests', xhr.body );
            } );
        }
        , computed: {
            quests: function () {
                return this.$store.getters.quests;
            }
        }
    }
</script>
