<template>
	<section>
		<saga v-for="(saga, index) in heroicSagas" :key="saga.id +'heroic'" :saga="saga" :sagaIndex="index" sagaType="heroic"></saga>
		<saga v-for="(saga, index) in epicSagas" :key="saga.id +'epic'" :saga="saga" :sagaIndex="index" sagaType="epic"></saga>
	</section>
</template>

<script>
	import Saga from './questsDisplay/BySaga.vue';

	export default {
		components: {
			Saga
		}
		, computed: {
			epicSagas: function () {
				return this.sortByName(
					this.$store.getters.sagas.filter( function ( saga ) {
						return saga.epic;
					} )
					, 'epic'
				);
			}
			, heroicSagas: function () {
				return this.sortByName(
					this.$store.getters.sagas.filter( function ( saga ) {
						return !!saga.heroic;
					} )
					, 'heroic'
				);
			}
		}
		, methods: {
			sortByName: function ( sagas, sagaType ) {
				return sagas.sort( function ( a, b ) {
					return a.name.localeCompare( b.name );
				} );
			}
		}
	}
</script>
