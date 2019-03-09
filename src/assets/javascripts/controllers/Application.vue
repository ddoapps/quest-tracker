<template>
	<section aria-hidden="true" class="application display-none z-index-0">
		<application-header v-if="theHeaderShouldBeShown"></application-header>
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
			theHeaderShouldBeShown () {
				return (
					!this.$store.getters.theDisclaimerShouldBeShown
					&& !this.$store.getters.theQuestListingsOmniSearchShouldBeShown
				);
			}
		}
		, mounted () {
			if ( !this.$store.getters.quests.length ) {
				this.$http.get( './api/quests' ).then( xhr => this.$store.commit( 'updateTheQuests', xhr.body ) );
			}

			if ( !this.$store.getters.sagas.length ) {
				this.$http.get( './api/sagas' ).then( xhr => this.$store.commit( 'updateTheSagas', xhr.body ) );
			}

			window.addEventListener( 'resize', e => this.$store.commit( 'updateTheWindowWidth' ) );
		}
	}
</script>
