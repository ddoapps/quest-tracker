<template>
	<section>
		<listings-omni-search v-if="showOmniSearch"></listings-omni-search>
		<all-quests v-if="showAllQuests"></all-quests>
		<all-sagas v-if="showAllSagas"></all-sagas>
	</section>
</template>

<script>
	import AllQuests from '../components/quests/AllQuests.vue';
	import AllSagas from '../components/quests/AllSagas.vue';
	import ListingsOmniSearch from '../components/quests/ListingsOmniSearch.vue';

	export default {
		components: {
			AllQuests
			, AllSagas
			, ListingsOmniSearch
		}
		, computed: {
			questView () {
				return this.$store.getters.questView;
			}
			, showAllQuests () {
				return [ 'all', 'heroic', 'epic' ].contains( this.questView );
			}
			, showAllSagas () {
				return this.questView === 'sagas';
			}
			, showOmniSearch () {
				return this.questView != '';
			}
		}
	}
</script>
