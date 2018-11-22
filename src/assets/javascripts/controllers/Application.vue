<template>
	<section class="application display-none" aria-hidden="true">
		<application-header v-if="showTheHeader"></application-header>
		<application-content></application-content>
	</section>
</template>

<script>
	import ApplicationContent from '../components/ApplicationContent.vue';
	import ApplicationHeader from '../components/ApplicationHeader.vue';

	export default {
		components: {
			ApplicationHeader
			, ApplicationContent
		}
		, computed: {
			showTheHeader: function () {
				return !this.$store.getters.theDisclaimerShouldBeShown;
			}
		}
	}
</script>
