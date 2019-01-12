<template>
    <main class="bottom-above-menu center display-inline-block margin-left-1vw max-width-98vw min-width-98vw overflow-y-auto position-absolute position-top z-index-100">
        <disclaimer v-if="theDisclaimerShouldBeShown"></disclaimer>
        <quests v-if="!theDisclaimerShouldBeShown"></quests>
    </main>
</template>

<script>
    import Disclaimer from './Disclaimer.vue';
    import Quests from '../controllers/Quests.vue';

    export default {
        components: {
            Disclaimer
            , Quests
        }
        , computed: {
            theDisclaimerShouldBeShown: function () {
                return this.$store.getters.theDisclaimerShouldBeShown;
            }
        }
    }
</script>
