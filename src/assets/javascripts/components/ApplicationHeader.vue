<template>
    <header class="background-color-dark-gray-3 display-block font-color-white-0 font-size-0 max-width-100vw min-width-100vw position-bottom position-fixed z-index-200">
        <div class="layout-col-xs-1 line-height-3">
            <i class="before-margin-left-2px layout-col-xs-12 background-color-dark-gray-8 font-size-xs-md icon icon-left-open"></i>
        </div>

        <nav class="font-size-0 layout-col-xs-10 vertical-align-bottom" aria-label="Main Menu; list quests or sagas">
            <ul class="layout-col-xs-12 line-height-3 no-list no-margin no-padding no-wrap overflow-x-auto">
                <li class="border-color-light-black-5 border-left-solid font-size-xs-md layout-col-xs-5 text-center"
                    tabindex="0" v-on:click="showAllQuests">All</li>
                <li class="border-color-light-black-5 border-left-solid font-size-xs-md layout-col-xs-6 text-center"
                    tabindex="0" v-on:click="showHeroicQuests">Heroic</li>
                <li class="border-color-light-black-5 border-left-solid font-size-xs-md layout-col-xs-5 text-center"
                    tabindex="0" v-on:click="showEpicQuests">Epic</li>
                <li class="border-color-light-black-5 border-left-solid border-right-solid font-size-xs-md layout-col-xs-5 text-center"
                    tabindex="0" v-on:click="showSagas">Sagas</li>
            </ul>
        </nav>

        <div class="layout-col-xs-1 line-height-3">
            <i class="before-margin-left-4px:before layout-col-xs-12 background-color-dark-gray-8 font-size-xs-md icon icon-right-open"></i>
        </div>
    </header>
</template>

<script>
    export default {
        methods: {
            showAllQuests: function () {
                this.$store.commit( 'changeTheQuestView', 'all' );
            }
            , showEpicQuests: function () {
                this.$store.commit( 'changeTheQuestView', 'epic' );
            }
            , showHeroicQuests: function () {
                this.$store.commit( 'changeTheQuestView', 'heroic' );
            }
            , showSagas: function () {
                this.$store.commit( 'changeTheQuestView', 'sagas' );
            }
        }
    }
</script>
