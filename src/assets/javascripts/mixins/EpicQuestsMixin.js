import QuestsMixin from './QuestsMixin.js';

export default {
	mixins: [ QuestsMixin ]
	, computed: {
		epicQuests: function () {
			var questType = 'epic';

			var quests = this.sortByLevelAndName(
				this.filterQuestsByType( this.$store.getters.quests, questType ), questType
			);

			return this.filterQuestsBySearch( quests, questType, this.$store.getters.questListingsSearchValue.trim().toLowerCase() );
		}
	}
}
