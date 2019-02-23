<template>
	<section>
		<quest v-for="(quest, index) in epicQuests" :key="quest.id" :quest="quest" :questIndex="index" questType="epic"></quest>
	</section>
</template>

<script>
	import EpicQuestsMixin from '../../mixins/EpicQuestsMixin.js';
	import Quest from './questsDisplay/ByLevel.vue';

	export default {
		mixins: [ EpicQuestsMixin ]
		, components: {
			Quest
		}
	}
</script>
