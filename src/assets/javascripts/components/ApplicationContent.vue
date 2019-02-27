<template>
	<main :class="mainClasses" @scroll="updateTheMainScrollTop( $event )">
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
			mainClasses () {
				let classes = [
					'center'
					, 'display-inline-block'
					, 'margin-left-1vw'
					, 'max-width-98vw'
					, 'min-width-98vw'
					, 'overflow-y-auto'
					, 'position-absolute'
					, 'position-top'
					, 'z-index-100'
				];

				if ( this.theMainMenuIsShown ) {
					classes.push( 'bottom-above-menu' );
				} else {
					classes.push( 'position-bottom' );
				}

				return classes.join( ' ' );
			}
			, theDisclaimerShouldBeShown () {
				return this.$store.getters.theDisclaimerShouldBeShown;
			}
			, theMainMenuIsShown () {
				return !this.$store.getters.theQuestListingsOmniSearchShouldBeShown
			}
		}
		, methods: {
			updateTheMainScrollTop ( event ) {
				this.$store.commit( 'updateTheMainScrollTop', event.target.scrollTop );
			}
		}
	}
</script>
