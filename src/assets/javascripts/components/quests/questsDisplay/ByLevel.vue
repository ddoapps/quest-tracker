<template>
    <div class="by-level" :class="questType">
        <div class="quest layout-row">
            <div class="layout-col-xs-12">
                <div class="layout-col-xs-1">&nbsp;</div>
                <div class="layout-col-xs-11"><span class="quest-name border-radius-4 display-inline-block font-size-xs-sm" v-text="name()"></span></div>
            </div>

            <div class="layout-col-xs-12">
                <div class="layout-col-xs-1 vertical-align-top"><span class="quest-level display-block font-size-xs-sm" v-text="level()"></span></div>

                <div class="layout-col-xs-11">
                    <div class="layout-row">
                        <div class="layout-col-xs-3">
                            <div class="quest-difficulty font-size-xs-sm">Casual</div>
                        </div>

                        <div class="layout-col-xs-3">
                            <div class="quest-difficulty font-size-xs-sm">Normal</div>
                        </div>

                        <div class="layout-col-xs-3">
                            <div class="quest-difficulty font-size-xs-sm">Hard</div>
                        </div>

                        <div class="layout-col-xs-3">
                            <div class="quest-difficulty font-size-xs-sm last">Elite</div>
                        </div>
                    </div>

                    <div class="layout-row">
                        <div class="layout-col-xs-3">
                            <div class="quest-xp font-size-xs-sm" v-html="casual().xp"></div>
                        </div>

                        <div class="layout-col-xs-3">
                            <div class="quest-xp font-size-xs-sm" v-html="normal().xp"></div>
                        </div>

                        <div class="layout-col-xs-3">
                            <div class="quest-xp font-size-xs-sm" v-html="hard().xp"></div>
                        </div>

                        <div class="layout-col-xs-3">
                            <div class="quest-xp font-size-xs-sm last" v-html="elite().xp"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [ 'quest', 'questType' ]
        , methods: {
            casual: function () {
                return this.questByType().casual || { xp: '&nbsp;' };
            }
            , elite: function () {
                return this.questByType().elite || { xp: '&nbsp;' };
            }
            , hard: function () {
                return this.questByType().hard || { xp: '&nbsp;' };
            }
            , level: function () {
                var questByType = this.questByType();

                return ( questByType.normal || questByType.casual ).level;
            }
            , name: function () {
                return this.$options.propsData.quest.name;
            }
            , normal: function () {
                return this.questByType().normal || { xp: '&nbsp;' };
            }
            , questByType: function () {
                var props = this.$options.propsData;
                
                return props.quest[ props.questType ];
            }
        }
    }
</script>
