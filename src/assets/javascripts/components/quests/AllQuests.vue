<template>
    <section class="all-quests">
        <h1 class="layout-col-xs-12 font-size-xs-md font-color-yellow">Heroic</h1>
        <quest v-for="quest in heroicQuests" :key="quest.id +'heroic'" :quest="quest" questType="heroic"></quest>
        <h1 class="layout-col-xs-12 font-size-xs-md font-color-yellow">Epic</h1>
        <quest v-for="quest in epicQuests" :key="quest.id +'epic'" :quest="quest" questType="epic"></quest>
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
