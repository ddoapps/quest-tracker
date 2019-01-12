<template>
    <section class="disclaimer background-color-dark-gray-6 border-solid border-color-dark-gray-12 border-radius-4 border-width-2px display-block font-color-light-gray-25 font-size-0">
        <div class="padding-4px">
            <p class="font-size-150 no-margin">
                <em class="font-color-yellow-0 font-style-normal">DDO Quest Tracker</em> is a fan site for the MMORPG <a href="http://www.ddo.com/" target="_new" class="font-color-light-blue-0-hover font-weight-bold-hover no-wrap">Dungeons &amp; Dragons Online</a>.
            </p>

            <p class="font-size-150">
                <em class="font-color-yellow-0 font-style-normal">DDO Quest Tracker</em> claims no copyright with regard to the information provided within, nor any affiliation with any company holding a copyright of, or related to, the information provided within.  The accuracy, and completeness, of the information provided within is not guaranteed, and by interacting with <em class="font-color-yellow-0 font-style-normal">DDO Quest Tracker</em> the user agrees that <em class="font-color-yellow-0 font-style-normal">DDO Quest Tracker</em> is not responsible for any negative outcome that may result from using the information provided.
            </p>

            <div class="text-center">
                <button class="background-color-dark-gray-11-hover border-color-light-black-0 border-radius-4 border-solid border-width-1px font-color-inherit font-size-200 line-height-3 min-width-240px" aria-label="Continue.  Click this button to continue to the application." @click="closeTheDisclaimer">Continue</button>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        methods: {
            closeTheDisclaimer: function () {
                this.$store.commit( 'hideTheDisclaimer' );
            }
        }
    }
</script>
