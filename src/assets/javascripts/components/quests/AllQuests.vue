<template>
	<section>
		<quest v-for="(quest, index) in heroicQuests" :key="quest.id +'heroic'" :quest="quest" :questIndex="index" questType="heroic"></quest>
		<quest v-for="(quest, index) in epicQuests" :key="quest.id +'epic'" :quest="quest" :questIndex="index + heroicQuests.length" questType="epic"></quest>
	</section>
</template>

<script>
	import EpicQuestsMixin from '../../mixins/EpicQuestsMixin.js';
	import HeroicQuestsMixin from '../../mixins/HeroicQuestsMixin.js';
	import Quest from './questsDisplay/ByLevel.vue';

	export default {
		mixins: [ EpicQuestsMixin, HeroicQuestsMixin ]
		, components: {
			Quest
		}
	}
</script>
