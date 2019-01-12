<template>
    <div class="font-color-white-0 font-size-0 layout-col-xs-12 margin-top-8px">
        <div class="font-size-100 font-weight-bold layout-col-xs-1 text-center" v-text="questType[ 0 ].toUpperCase()"></div>
        <div :class="questType +'-background-color-dark-red-8 '+ questType +'-background-color-dark-purple-8'" class="border-top-left-radius-4px border-top-right-radius-4px font-size-150 layout-col-xs-11 text-indent-4px" v-text="name()"></div>
        <div :class="questType +'-background-color-dark-red-8 '+ questType +'-background-color-dark-purple-8'" class="border-bottom-left-radius-4px border-top-left-radius-4px font-size-100 layout-col-xs-1 line-height-2-9 text-center vertical-align-top" v-text="level()"></div>

        <div class="layout-col-xs-11">
            <div :class="questType +'-background-color-dark-red-3 '+ questType +'-background-color-dark-purple-3'" class="font-size-100 font-weight-bold layout-col-xs-3 text-indent-4px">Casual</div>
            <div :class="questType +'-background-color-dark-red-0 '+ questType +'-background-color-dark-purple-0'" class="font-size-100 font-weight-bold layout-col-xs-3 text-indent-4px">Normal</div>
            <div :class="questType +'-background-color-dark-red-3 '+ questType +'-background-color-dark-purple-3'" class="font-size-100 font-weight-bold layout-col-xs-3 text-indent-4px">Hard</div>
            <div :class="questType +'-background-color-dark-red-0 '+ questType +'-background-color-dark-purple-0'" class="font-size-100 font-weight-bold layout-col-xs-3 text-indent-4px">Elite</div>

            <div :class="questType +'-background-color-dark-red-3 '+ questType +'-background-color-dark-purple-3'" class="font-size-100 layout-col-xs-3 text-indent-4px" v-html="casual().xp"></div>
            <div :class="questType +'-background-color-dark-red-0 '+ questType +'-background-color-dark-purple-0'" class="font-size-100 layout-col-xs-3 text-indent-4px" v-html="normal().xp"></div>
            <div :class="questType +'-background-color-dark-red-3 '+ questType +'-background-color-dark-purple-3'" class="font-size-100 layout-col-xs-3 text-indent-4px" v-html="hard().xp"></div>
            <div :class="questType +'-background-color-dark-red-0 '+ questType +'-background-color-dark-purple-0'" class="border-bottom-right-radius-4px font-size-100 layout-col-xs-3 text-indent-4px" v-html="elite().xp"></div>
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
