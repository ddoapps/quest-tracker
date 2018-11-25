<template>
    <div class="quest layout-col-xs-12">
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
</template>

<script>
    export default {
        props: [ 'quest' ]
    }
</script>
