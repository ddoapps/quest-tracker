<template>
    <header class="application-header background-color-dark-gray-1 font-color-white layout-container position-bottom position-fixed" aria-hidden="true">
        <nav class="layout-row">
            <div class="layout-col-xs-12">
                <div class="main-menu-prev layout-col-xs-1 line-height-3">
                    <i class="layout-col-xs-12 background-color-dark-gray-2 font-size-xs-md icon icon-left-open"></i>
                </div>

                <ul class="main-menu layout-col-xs-10 line-height-3 no-list no-padding no-wrap overflow-x-auto">
                    <li class="item layout-col-xs-5 text-center font-size-xs-md no-float" v-on:click="showAllQuests">All</li>
                    <li class="item layout-col-xs-6 text-center font-size-xs-md no-float" v-on:click="showHeroicQuests">Heroic</li>
                    <li class="item layout-col-xs-5 text-center font-size-xs-md no-float" v-on:click="showEpicQuests">Epic</li>
                    <li class="item layout-col-xs-5 text-center font-size-xs-md no-float" v-on:click="showSagas">Sagas</li>
                    <li class="item layout-col-xs-8 text-center font-size-xs-md no-float" v-on:click="showCharacters">Characters</li>
                </ul>

                <div class="main-menu-next layout-col-xs-1 line-height-3">
                    <i class="layout-col-xs-12 background-color-dark-gray-2 font-size-xs-md icon-right-open"></i>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
    export default {
        methods: {
            showAllQuests: function () {
                this.$store.commit( 'changeTheQuestView', 'all' );
            }
            , showCharacters: function () {
                this.$store.commit( 'changeTheQuestView', 'characters' );
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
