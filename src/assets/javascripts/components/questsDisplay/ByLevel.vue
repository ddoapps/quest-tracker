<template>
    <section class="by-level layout-row">
        <h1 class="heroic font-size-xs-sm layout-col-xs-12" aria-label="List of heroic quests">Heroic Quests</h1>

        <div class="quest layout-col-xs-12" v-for="quest in heroicQuests" :key="quest.id">
            <div class="quest-level layout-col-xs-2 font-size-xs-sm" v-text="quest.level"></div>
            <div class="quest-name layout-col-xs-10 font-size-xs-sm" v-text="quest.name"></div>

            <div class="layout-col-xs-10">
                <div class="quest-difficulty layout-col-xs-6 font-size-xs-sm" v-text="quest.difficulty"></div>
                <div class="quest-experience layout-col-xs-6 font-size-xs-sm" v-text="quest.experience"></div>
            </div>
        </div>

        <h1 class="epic font-size-xs-sm layout-col-xs-12" aria-label="List of epic quests">Epic Quests</h1>

        <div class="quest layout-col-xs-12" v-for="quest in epicQuests" :key="quest.id">
            <div class="quest-level layout-col-xs-2 font-size-xs-sm" v-text="quest.level"></div>
            <div class="quest-name layout-col-xs-10 font-size-xs-sm" v-text="quest.name"></div>

            <div class="layout-col-xs-10">
                <div class="quest-difficulty layout-col-xs-6 font-size-xs-sm" v-text="quest.difficulty"></div>
                <div class="quest-experience layout-col-xs-6 font-size-xs-sm" v-text="quest.experience"></div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        beforeMount: function () {
            this.$http.get( './assets/jsons/quests.json' ).then( function ( xhr ) {
                this.$store.commit( 'quests', xhr.body );
            } );
        }
        , computed: {
            epicQuests: function () {
                return this.quests( this.$store.getters.quests, 'epic' );
            }
            , heroicQuests: function () {
                return this.quests( this.$store.getters.quests, 'heroic' );
            }
        }
        , methods: {
            quests: function ( quests, type ) {
                var results = [];

                Object.keys( quests ).forEach( function ( questKey ) {
                    var quest = quests[ questKey ];
                    var questType = quest[ type ] || {};

                    Object.keys( questType ).forEach( function ( difficulty ) {
                        var questTypeDifficulty = questType[ difficulty ];

                        results.push( {
                            id: questKey + type + difficulty
                            , type: type.capitalize()
                            , level: questTypeDifficulty.level
                            , name: quest.name
                            , difficulty: difficulty.capitalize()
                            , experience: questTypeDifficulty.xp
                        } );
                    } );
                } );

                results.sort( function ( a, b ) {
                    return a.level - b.level || a.name.localeCompare( b.name );
                } );

                return results;
            }
        }
    }
</script>
