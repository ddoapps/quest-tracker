<template>
	<section class="quests">
        <all-quests v-if="questView() === 'all'"></all-quests>
        <heroic-quests v-if="questView() === 'heroic'"></heroic-quests>
        <epic-quests v-if="questView() === 'epic'"></epic-quests>
	</section>
</template>

<script>
    import AllQuests from '../components/quests/AllQuests.vue';
    import EpicQuests from '../components/quests/EpicQuests.vue';
    import HeroicQuests from '../components/quests/HeroicQuests.vue';

	export default {
		components: {
            AllQuests
            , EpicQuests
            , HeroicQuests
        }
        , methods: {
            questView: function () {
                return this.$store.getters.questView;
            }
        }
	}
</script>
