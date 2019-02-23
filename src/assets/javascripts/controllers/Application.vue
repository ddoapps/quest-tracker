<template>
	<section class="application display-none z-index-0" aria-hidden="true">
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
				return (
					!this.$store.getters.theDisclaimerShouldBeShown
					&& !this.$store.getters.theQuestListingsOmniSearchShouldBeShown
				);
			}
		}
		, mounted: function () {
			if ( !this.$store.getters.quests.length ) {
				this.$http.get( './api/quests' ).then( function ( xhr ) {
					this.$store.commit( 'updateTheQuests', xhr.body );
				} );
			}

			if ( !this.$store.getters.sagas.length ) {
				this.$http.get( './api/sagas' ).then( function ( xhr ) {
					this.$store.commit( 'updateTheSagas', xhr.body );
				} );
			}
		}
	}
</script>
