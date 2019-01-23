<template>
    <div class="margin-bottom-4px-last-child margin-top-4px">
        <div class="font-color-white-0 font-size-0 layout-col-xs-12">
            <div class="font-size-100 font-weight-bold layout-col-xs-1 text-center vertical-align-bottom"
                v-text="sagaType[ 0 ].toUpperCase()"></div>
            <div :class="sagaType +'-background-color-dark-red-8 '+ sagaType +'-background-color-dark-purple-8'"
                class="border-top-left-radius-4px border-top-right-radius-4px font-size-130 height-44px layout-col-xs-11">
                <span class="display-block margin-left-4px" v-text="saga.name"></span>
            </div>

            <div class="height-22px layout-col-xs-1 vertical-align-top"></div>
            <div class="layout-col-xs-11">
                <div :class="sagaType +'-background-color-dark-red-3 '+ sagaType +'-background-color-dark-purple-3'"
                    class="font-size-100 font-weight-bold height-22px layout-col-xs-3 text-indent-4px">Normal</div>
                <div :class="sagaType +'-background-color-dark-red-0 '+ sagaType +'-background-color-dark-purple-0'"
                    class="font-size-100 font-weight-bold height-22px layout-col-xs-3 text-indent-4px">Hard</div>
                <div :class="sagaType +'-background-color-dark-red-3 '+ sagaType +'-background-color-dark-purple-3'"
                    class="font-size-100 font-weight-bold height-22px layout-col-xs-3 text-indent-4px">Elite</div>
                <div :class="sagaType +'-background-color-dark-red-0 '+ sagaType +'-background-color-dark-purple-0'"
                    class="font-size-100 font-weight-bold height-22px layout-col-xs-3 text-indent-4px">True Elite</div>
            </div>

            <div class="height-22px layout-col-xs-1 vertical-align-top"></div>
            <div class="layout-col-xs-11">
                <div :class="sagaType +'-background-color-dark-red-3 '+ sagaType +'-background-color-dark-purple-3'"
                    class="font-size-100 height-22px layout-col-xs-3 text-indent-4px"
                    v-html="saga[ sagaType ].normal.xp"></div>
                <div :class="sagaType +'-background-color-dark-red-0 '+ sagaType +'-background-color-dark-purple-0'"
                    class="font-size-100 height-22px layout-col-xs-3 text-indent-4px"
                    v-html="saga[ sagaType ].hard.xp"></div>
                <div :class="sagaType +'-background-color-dark-red-3 '+ sagaType +'-background-color-dark-purple-3'"
                    class="font-size-100 height-22px layout-col-xs-3 text-indent-4px"
                    v-html="saga[ sagaType ].elite.xp"></div>
                <div :class="sagaType +'-background-color-dark-red-0 '+ sagaType +'-background-color-dark-purple-0'"
                    class="font-size-100 height-22px layout-col-xs-3 text-indent-4px"
                    v-html="saga[ sagaType ].true_elite.xp"></div>
            </div>

            <template v-for="(quest, index) in quests">
                <div :key="quest.id + sagaType +'level'"
                     :class="questClasses +' '+ (index % 2 ? 'even' : 'odd') +' '+ (!index ? 'border-top-left-radius-4px' : '') +' '+ (index == quests.length - 1 ? 'border-bottom-left-radius-4px' : '')"
                     class="font-size-100 height-22px layout-col-xs-1 text-center"
                     v-text="quest.level"></div>
                <div :key="quest.id + sagaType +'name'"
                     :class="questClasses +' '+ (index % 2 ? 'even' : 'odd') +' '+ (index == quests.length - 1 ? 'border-bottom-right-radius-4px' : '')"
                     class="font-size-100 height-22px layout-col-xs-11 text-indent-4px"
                     v-text="quest.name"></div>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        props: [ 'saga', 'sagaIndex', 'sagaType' ]
        , computed: {
            questClasses: function () {
                var sagaType = this.$options.propsData.sagaType;
                var classes = [
                    sagaType +'-background-color-dark-red-8'
                    , sagaType +'-background-color-dark-purple-8'
                ];

                return classes.join( ' ' );
            }
            , quests: function () {
                var sagaType = this.$options.propsData.sagaType;
                var questIds = this.$options.propsData.saga[ sagaType ].quests;
                
                var quests = this.$store.getters.quests.filter(
                    function ( quest ) {
                        return questIds.indexOf( quest.id ) > -1;
                    }
                ).sort(
                    function ( a, b ) {
                        return questIds.indexOf( a.id ) - questIds.indexOf( b.id );
                    }
                );

                return quests.map(
                    function ( quest ) {
                        return { id: quest.id, name: quest.name, level: quest[ sagaType ].normal.level };
                    }
                );
            }
        }
        , methods: {
        }
    }
</script>
