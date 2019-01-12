<template>
    <section>
        <quest v-for="(quest, index) in quests" :key="quest.id" :quest="quest" :questIndex="index" questType="epic"></quest>
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

            this.$http.get( './api/quests/type/epic' ).then( function ( xhr ) {
                this.$store.commit( 'updateTheQuests', xhr.body );
            } );
        }
        , computed: {
            quests: function () {
                try {
                    return this.sortByLevelAndName( this.$store.getters.quests );
                } catch ( e ) {
                    return [];
                }
            }
        }
        , methods: {
            sortByLevelAndName: function ( quests ) {
                return quests.sort( function ( a, b ) {
                    var aLevel = ( a.epic.normal || a.epic.casual ).level;
                    var bLevel = ( b.epic.normal || b.epic.casual ).level;

                    return aLevel - bLevel || a.name.localeCompare( b.name );
                } );
            }
        }
    }
</script>
