<template>
    <div class="quest layout-col-xs-12">
        <div class="quest-level layout-col-xs-2 font-size-xs-sm" v-text="level()"></div>
        <div class="quest-name layout-col-xs-10 font-size-xs-sm" v-text="name()"></div>

        <div class="layout-col-xs-10">
            <div class="quest-difficulty layout-col-xs-3" v-if="casual()">
                <div class="font-size-xs-sm">Casual</div>
                <div class="font-size-xs-sm" v-text="casual().xp"></div>
            </div>

            <div class="quest-difficulty layout-col-xs-3" v-if="normal()">
                <div class="font-size-xs-sm">Normal</div>
                <div class="font-size-xs-sm" v-text="normal().xp"></div>
            </div>

            <div class="quest-difficulty layout-col-xs-3" v-if="hard()">
                <div class="font-size-xs-sm">Hard</div>
                <div class="font-size-xs-sm" v-text="hard().xp"></div>
            </div>

            <div class="quest-difficulty layout-col-xs-3" v-if="elite()">
                <div class="font-size-xs-sm">Elite</div>
                <div class="font-size-xs-sm" v-text="elite().xp"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [ 'quest', 'questType' ]
        , methods: {
            casual: function () {
                return this.questByType().casual;
            }
            , elite: function () {
                return this.questByType().elite;
            }
            , hard: function () {
                return this.questByType().hard;
            }
            , level: function () {
                var questByType = this.questByType();

                return ( questByType.normal || questByType.casual ).level;
            }
            , name: function () {
                return this.$options.propsData.quest.name;
            }
            , normal: function () {
                return this.questByType().normal;
            }
            , questByType: function () {
                var props = this.$options.propsData;
                
                return props.quest[ props.questType ];
            }
        }
    }
</script>
