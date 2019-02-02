<template>
    <div class="height-88px margin-bottom-4px-last-child margin-top-4px">
        <div class="font-color-white-0 font-size-0 layout-col-xs-12" role="table" v-if="questIsAlmostInView">
            <div class="font-size-100 font-weight-bold layout-col-xs-1 text-center vertical-align-bottom" role="cell" aria-hidden="true"
                 v-text="questType[ 0 ].toUpperCase()"></div>
            <div :class="questType +'-background-color-dark-red-8 '+ questType +'-background-color-dark-purple-8'"
                 class="border-top-left-radius-4px border-top-right-radius-4px font-size-130 height-44px layout-col-xs-11"
                 role="cell" tabindex="0" :aria-label="questType+ ' level '+ level() +' quest, '+ name()">
                <span class="display-block margin-left-4px" v-text="name()"></span>
            </div>
            <div :class="questType +'-background-color-dark-red-8 '+ questType +'-background-color-dark-purple-8'"
                class="border-bottom-left-radius-4px border-top-left-radius-4px font-size-100 height-44px layout-col-xs-1 line-height-3-5 text-center vertical-align-top"
                aria-hidden="true"
                v-text="level()"></div>

            <div class="layout-col-xs-11">
                <div :class="questType +'-background-color-dark-red-3 '+ questType +'-background-color-dark-purple-3'"
                    class="font-size-100 font-weight-bold height-22px layout-col-xs-3 text-indent-4px" aria-hidden="true">Casual</div>
                <div :class="questType +'-background-color-dark-red-0 '+ questType +'-background-color-dark-purple-0'"
                    class="font-size-100 font-weight-bold height-22px layout-col-xs-3 text-indent-4px" aria-hidden="true">Normal</div>
                <div :class="questType +'-background-color-dark-red-3 '+ questType +'-background-color-dark-purple-3'"
                    class="font-size-100 font-weight-bold height-22px layout-col-xs-3 text-indent-4px" aria-hidden="true">Hard</div>
                <div :class="questType +'-background-color-dark-red-0 '+ questType +'-background-color-dark-purple-0'"
                    class="font-size-100 font-weight-bold height-22px layout-col-xs-3 text-indent-4px" aria-hidden="true">Elite</div>

                <div :class="questType +'-background-color-dark-red-3 '+ questType +'-background-color-dark-purple-3'"
                    class="font-size-100 height-22px layout-col-xs-3 text-indent-4px" role="cell"
                    :aria-label="'Casual Experience: '+ casual().xp"
                    :aria-hidden="casual().xp === '&nbsp;'"
                    :tabindex="casual().xp != '&nbsp;' ? 0 : -1"
                    v-html="casual().xp"></div>
                <div :class="questType +'-background-color-dark-red-0 '+ questType +'-background-color-dark-purple-0'"
                    class="font-size-100 height-22px layout-col-xs-3 text-indent-4px" role="cell"
                    :aria-label="'Normal Experience: '+ normal().xp"
                    :aria-hidden="normal().xp === '&nbsp;'"
                    :tabindex="normal().xp != '&nbsp;' ? 0 : -1"
                    v-html="normal().xp"></div>
                <div :class="questType +'-background-color-dark-red-3 '+ questType +'-background-color-dark-purple-3'"
                    class="font-size-100 height-22px layout-col-xs-3 text-indent-4px" role="cell"
                    :aria-label="'Hard Experience: '+ hard().xp"
                    :aria-hidden="hard().xp === '&nbsp;'"
                    :tabindex="hard().xp != '&nbsp;' ? 0 : -1"
                    v-html="hard().xp"></div>
                <div :class="questType +'-background-color-dark-red-0 '+ questType +'-background-color-dark-purple-0'"
                    class="border-bottom-right-radius-4px font-size-100 height-22px layout-col-xs-3 text-indent-4px" role="cell"
                    :aria-label="'Elite Experience: '+ elite().xp"
                    :aria-hidden="elite().xp === '&nbsp;'"
                    :tabindex="elite().xp != '&nbsp;' ? 0 : -1"
                    v-html="elite().xp"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [ 'quest', 'questIndex', 'questType' ]
        , computed: {
            questIsAlmostInView: function () {
                let questDisplayHeight = 92;
                let scrollDistance = this.$store.getters.mainScrollTop;
                let offsetTop = this.questIndex * questDisplayHeight;
                let adjustedOffsetTop = offsetTop - scrollDistance;

                return (
                    ( questDisplayHeight * -5 ) < adjustedOffsetTop
                    && adjustedOffsetTop < ( document.getElementsByTagName( 'main' )[ 0 ].offsetHeight + ( questDisplayHeight * 5 ) )
                );
            }
        }
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
                let questByType = this.questByType();

                return ( questByType.normal || questByType.casual ).level;
            }
            , name: function () {
                return this.$options.propsData.quest.name;
            }
            , normal: function () {
                return this.questByType().normal || { xp: '&nbsp;' };
            }
            , questByType: function () {
                let props = this.$options.propsData;
                
                return props.quest[ props.questType ];
            }
        }
    }
</script>
