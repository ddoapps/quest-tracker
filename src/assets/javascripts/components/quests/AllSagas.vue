<template>
	<section>
		<saga sagaType="heroic" v-for="(saga, index) in filteredHeroicSagas" :key="saga.id +'heroic'" :saga="saga" :sagaIndex="index" :quests="heroicQuests"></saga>
		<saga sagaType="epic" v-for="(saga, index) in filteredEpicSagas" :key="saga.id +'epic'" :saga="saga" :sagaIndex="index" :quests="epicQuests"></saga>
	</section>
</template>

<script>
	import QuestsMixin from '../../mixins/QuestsMixin.js';
	import Saga from './questsDisplay/BySaga.vue';
	import SagasMixin from '../../mixins/SagasMixin.js';

	export default {
		mixins: [ QuestsMixin, SagasMixin ]
		, components: {
			Saga
		}
	}
</script>
