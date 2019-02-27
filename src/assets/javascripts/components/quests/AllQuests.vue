<template>
	<section>
		<template v-if="showHeroicQuests">
			<quest v-for="(quest, index) in filteredHeroicQuests" :key="quest.id +'heroic'" :quest="quest" :questIndex="index" questType="heroic"></quest>
		</template>

		<template v-if="showEpicQuests">
			<quest v-for="(quest, index) in filteredEpicQuests" :key="quest.id +'epic'" :quest="quest" :questIndex="index + displayedHeroicQuestsCount" questType="epic"></quest>
		</template>
	</section>
</template>

<script>
	import Quest from './questsDisplay/ByLevel.vue';
	import QuestsMixin from '../../mixins/QuestsMixin.js';

	export default {
		mixins: [ QuestsMixin ]
		, components: {
			Quest
		}
		, computed: {
			displayedHeroicQuestsCount () {
				if ( this.showHeroicQuests ) return this.filteredHeroicQuests.length;

				return 0;
			}
			, questView () {
				return this.$store.getters.questView;
			}
			, showEpicQuests () {
				return [ 'all', 'epic' ].contains( this.questView );
			}
			, showHeroicQuests () {
				return [ 'all', 'heroic' ].contains( this.questView );
			}
		}
	}
</script>
