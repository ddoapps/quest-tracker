<template>
	<section>
		<saga v-for="(saga, index) in filteredHeroicSagas" :key="saga.id +'heroic'" :saga="saga" :sagaIndex="index" sagaType="heroic"></saga>
		<saga v-for="(saga, index) in filteredEpicSagas" :key="saga.id +'epic'" :saga="saga" :sagaIndex="index" sagaType="epic"></saga>
	</section>
</template>

<script>
	import Saga from './questsDisplay/BySaga.vue';
	import SagasMixin from '../../mixins/SagasMixin.js';

	export default {
		mixins: [ SagasMixin ]
		, components: {
			Saga
		}
	}
</script>
