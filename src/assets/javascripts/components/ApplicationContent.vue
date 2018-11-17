<template>
    <main class="application-content center layout-container-margin position-absolute">
        <disclaimer v-if="theDisclaimerShouldBeShown"></disclaimer>
    </main>
</template>

<script>
    import Disclaimer from './Disclaimer.vue';

    export default {
        components: {
            Disclaimer
        }
        , computed: {
            theDisclaimerShouldBeShown: function () {
                return this.$store.getters.theDisclaimerShouldBeShown;
            }
        }
    }
</script>
