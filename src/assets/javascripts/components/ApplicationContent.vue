<template>
    <main class="application-content center layout-container-margin position-absolute">
        <disclaimer v-if="theDisclaimerShouldBeShown"></disclaimer>
        <quests-by-level v-if="!theDisclaimerShouldBeShown"></quests-by-level>
    </main>
</template>

<script>
    import Disclaimer from './Disclaimer.vue';
    import QuestsByLevel from './questsDisplay/ByLevel.vue';

    export default {
        components: {
            Disclaimer
            , QuestsByLevel
        }
        , computed: {
            theDisclaimerShouldBeShown: function () {
                return this.$store.getters.theDisclaimerShouldBeShown;
            }
        }
    }
</script>
