<template>
    <header class="background-color-dark-gray-3 display-block font-color-white-0 max-width-100vw min-width-100vw position-bottom position-fixed z-index-200" aria-hidden="true">
        <nav>
            <ul class="font-size-0 max-width-100vw min-width-100vw no-list no-margin no-padding">
                <li class="layout-col-xs-1 line-height-3">
                    <i class="before-margin-left-2px layout-col-xs-12 background-color-dark-gray-8 font-size-xs-md icon icon-left-open"></i>
                </li>

                <li class="layout-col-xs-10 line-height-3 no-wrap overflow-x-auto vertical-align-bottom">
                    <div class="border-color-light-black-5 border-left-solid border-width-2px display-inline-block layout-col-xs-5 text-center font-size-xs-md" v-on:click="showAllQuests">All</div>
                    <div class="border-color-light-black-5 border-left-solid border-width-2px display-inline-block layout-col-xs-6 text-center font-size-xs-md" v-on:click="showHeroicQuests">Heroic</div>
                    <div class="border-color-light-black-5 border-left-solid border-width-2px display-inline-block layout-col-xs-5 text-center font-size-xs-md" v-on:click="showEpicQuests">Epic</div>
                    <div class="border-color-light-black-5 border-left-solid border-right-solid border-width-2px display-inline-block layout-col-xs-5 text-center font-size-xs-md" v-on:click="showSagas">Sagas</div>
                </li>

                <li class="layout-col-xs-1 line-height-3">
                    <i class="before-margin-left-4px:before layout-col-xs-12 background-color-dark-gray-8 font-size-xs-md icon icon-right-open"></i>
                </li>
            </ul>
        </nav>
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
