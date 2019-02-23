<template>
	<main	class="center display-inline-block margin-left-1vw max-width-98vw min-width-98vw overflow-y-auto position-absolute position-top z-index-100"
			:class="ifTheMainMenuIsShown() ? 'bottom-above-menu' : 'position-bottom'"
		@scroll="updateTheMainScrollTop($event)">
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
		, methods: {
			ifTheMainMenuIsShown: function () {
				return !this.$store.getters.theQuestListingsOmniSearchShouldBeShown
			}
			, updateTheMainScrollTop: function ( event ) {
				this.$store.commit( 'updateTheMainScrollTop', event.target.scrollTop );
			}
		}
	}
</script>
