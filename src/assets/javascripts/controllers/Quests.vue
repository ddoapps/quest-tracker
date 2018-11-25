<template>
	<section class="quests">
        <all-quests v-if="questView() === 'all'"></all-quests>
	</section>
</template>

<script>
    import AllQuests from '../components/quests/AllQuests.vue';

	export default {
		components: {
            AllQuests
        }
        , methods: {
            questView: function () {
                return this.$store.getters.questView;
            }
        }
	}
</script>
