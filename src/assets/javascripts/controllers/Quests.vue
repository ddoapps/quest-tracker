<template>
	<section>
		<listings-omni-search v-if="questView != ''"></listings-omni-search>
		<all-quests v-if="questView === 'all'"></all-quests>
		<heroic-quests v-if="questView === 'heroic'"></heroic-quests>
		<epic-quests v-if="questView === 'epic'"></epic-quests>
		<all-sagas v-if="questView === 'sagas'"></all-sagas>
	</section>
</template>

<script>
	import AllQuests from '../components/quests/AllQuests.vue';
	import AllSagas from '../components/quests/AllSagas.vue';
	import EpicQuests from '../components/quests/EpicQuests.vue';
	import HeroicQuests from '../components/quests/HeroicQuests.vue';
	import ListingsOmniSearch from '../components/quests/ListingsOmniSearch.vue';

	export default {
		components: {
			AllQuests
			, AllSagas
			, EpicQuests
			, HeroicQuests
			, ListingsOmniSearch
		}
		, computed: {
			questView () {
				return this.$store.getters.questView;
			}
		}
	}
</script>
