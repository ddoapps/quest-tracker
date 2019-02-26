<template>
	<section>
		<saga v-for="(saga, index) in filteredHeroicSagas" :key="saga.id +'heroic'" :saga="saga" :sagaIndex="index" sagaType="heroic"></saga>
		<saga v-for="(saga, index) in filteredEpicSagas" :key="saga.id +'epic'" :saga="saga" :sagaIndex="index" sagaType="epic"></saga>
	</section>
</template>

<script>
	import QuestsMixin from '../../mixins/QuestsMixin.js';
	import Saga from './questsDisplay/BySaga.vue';

	export default {
		mixins: [ QuestsMixin ]
		, components: {
			Saga
		}
		, computed: {
			epicSagas () {
				return this.sortByName( this.$store.getters.sagas.filter( saga => saga.epic ), 'epic' );
			}
			, filteredEpicSagas () {
				return this.filterSagasBySearch( this.epicSagas, 'epic', this.$store.getters.questListingsSearchValue.toLowerCase() );
			}
			, filteredHeroicSagas: function () {
				return this.filterSagasBySearch( this.heroicSagas, 'heroic', this.$store.getters.questListingsSearchValue.toLowerCase() );
			}
			, heroicSagas () {
				return this.sortByName( this.$store.getters.sagas.filter( saga => saga.heroic ), 'heroic' );
			}
		}
		, methods: {
			filterSagasBySearch ( sagas, sagaType, searchValue ) {
				if ( searchValue ) {
					let quests = this.filterQuestsBySearch( this.filterQuestsByType( this.$store.getters.quests, sagaType ), sagaType, searchValue );
					let questIds = quests.map( quest => quest.id );

					sagas = sagas.filter( saga => {
						return ( saga.name.toLowerCase().indexOf( searchValue ) > -1 || saga[ sagaType ].quests.containsAny( questIds ) );
					} );
				}

				return sagas;
			}
			, sortByName ( sagas, sagaType ) {
				return sagas.sort( ( a, b ) => a.name.localeCompare( b.name ) );
			}
		}
	}
</script>
