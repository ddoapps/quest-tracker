<template>
    <section>
        <quest v-for="(quest, index) in heroicQuests" :key="quest.id +'heroic'" :quest="quest" :questIndex="index" questType="heroic"></quest>
        <quest v-for="(quest, index) in epicQuests" :key="quest.id +'epic'" :quest="quest" :questIndex="index + heroicQuests.length" questType="epic"></quest>
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
            epicQuests: function () {
                return this.sortByLevelAndName(
                    this.$store.getters.quests.filter(
                        function ( quest ) {
                            return !!quest.epic;
                        }
                    )
                    , 'epic'
                );
            }
            , heroicQuests: function () {
                return this.sortByLevelAndName(
                    this.$store.getters.quests.filter(
                        function ( quest ) {
                            return !!quest.heroic;
                        }
                    )
                    , 'heroic'
                );
            }
        }
        , methods: {
            sortByLevelAndName: function ( quests, questType ) {
                return quests.sort( function ( a, b ) {
                    var aLevel = ( a[ questType ].normal || a[ questType ].casual ).level;
                    var bLevel = ( b[ questType ].normal || b[ questType ].casual ).level;

                    return aLevel - bLevel || a.name.localeCompare( b.name );
                } );
            }
        }
    }
</script>
