<template>
    <section class="by-level layout-row">
        <h1 class="heroic font-size-xs-sm layout-col-xs-12" aria-label="List of heroic quests">Heroic Quests</h1>

        <div class="quest layout-col-xs-12" v-for="quest in heroicQuests" :key="quest.id">
            <div class="quest-level layout-col-xs-2 font-size-xs-sm" v-text="quest.level"></div>
            <div class="quest-name layout-col-xs-10 font-size-xs-sm" v-text="quest.name"></div>

            <div class="layout-col-xs-10">
                <div class="quest-difficulty layout-col-xs-3" v-if="quest.casual">
                    <div class="font-size-xs-sm">Casual</div>
                    <div class="font-size-xs-sm" v-text="quest.casual.experience"></div>
                </div>
                <div class="quest-difficulty layout-col-xs-3" v-if="quest.normal">
                    <div class="font-size-xs-sm">Normal</div>
                    <div class="font-size-xs-sm" v-text="quest.normal.experience"></div>
                </div>
                <div class="quest-difficulty layout-col-xs-3" v-if="quest.hard">
                    <div class="font-size-xs-sm">Hard</div>
                    <div class="font-size-xs-sm" v-text="quest.hard.experience"></div>
                </div>
                <div class="quest-difficulty layout-col-xs-3" v-if="quest.elite">
                    <div class="font-size-xs-sm">Elite</div>
                    <div class="font-size-xs-sm" v-text="quest.elite.experience"></div>
                </div>
            </div>
        </div>

        <h1 class="epic font-size-xs-sm layout-col-xs-12" aria-label="List of epic quests">Epic Quests</h1>

        <div class="quest layout-col-xs-12" v-for="quest in epicQuests" :key="quest.id">
            <div class="quest-level layout-col-xs-2 font-size-xs-sm" v-text="quest.level"></div>
            <div class="quest-name layout-col-xs-10 font-size-xs-sm" v-text="quest.name"></div>

            <div class="layout-col-xs-10">
                <div class="quest-difficulty layout-col-xs-3" v-if="quest.casual">
                    <div class="font-size-xs-sm">Casual</div>
                    <div class="font-size-xs-sm" v-text="quest.casual.experience"></div>
                </div>
                <div class="quest-difficulty layout-col-xs-3" v-if="quest.normal">
                    <div class="font-size-xs-sm">Normal</div>
                    <div class="font-size-xs-sm" v-text="quest.normal.experience"></div>
                </div>
                <div class="quest-difficulty layout-col-xs-3" v-if="quest.hard">
                    <div class="font-size-xs-sm">Hard</div>
                    <div class="font-size-xs-sm" v-text="quest.hard.experience"></div>
                </div>
                <div class="quest-difficulty layout-col-xs-3" v-if="quest.elite">
                    <div class="font-size-xs-sm">Elite</div>
                    <div class="font-size-xs-sm" v-text="quest.elite.experience"></div>
                </div>
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
                console.log( 'computing' );
                return this.quests( this.$store.getters.quests, 'epic' );
            }
            , heroicQuests: function () {
                console.log( 'computing' );
                return this.quests( this.$store.getters.quests, 'heroic' );
            }
        }
        , methods: {
            quests: function ( quests, heroicOrEpic ) {
                var results = [];

                Object.keys( quests ).forEach( function ( questKey ) {
                    var quest = quests[ questKey ];
                    var questType = quest[ heroicOrEpic ] || {};

                    if ( Object.values( questType ).length ) {
                        var result = {
                            id: questKey + heroicOrEpic
                            , name: quest.name
                            , level: ( questType.normal || questType.casual ).level
                        };

                        Object.keys( questType ).forEach( function ( difficultyKey, index ) {
                            var difficulty = questType[ difficultyKey ];

                            result[ difficultyKey ] = {
                                experience: difficulty.xp
                            };
                        } );

                        results.push( result );
                    }
                } );

                results.sort( function ( a, b ) {
                    return a.level - b.level || a.name.localeCompare( b.name );
                } );

                return results;
            }
        }
    }
</script>
