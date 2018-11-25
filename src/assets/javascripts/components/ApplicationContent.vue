<template>
    <main class="application-content center layout-container-margin position-absolute position-top">
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
