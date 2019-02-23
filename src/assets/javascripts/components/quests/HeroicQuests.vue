<template>
	<section>
		<quest v-for="(quest, index) in heroicQuests" :key="quest.id" :quest="quest" :questIndex="index" questType="heroic"></quest>
	</section>
</template>

<script>
	import HeroicQuestsMixin from '../../mixins/HeroicQuestsMixin.js';
	import Quest from './questsDisplay/ByLevel.vue';

	export default {
		mixins: [ HeroicQuestsMixin ]
		, components: {
			Quest
		}
	}
</script>
