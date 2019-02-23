<template>
	<section>
		<saga v-for="(saga, index) in heroicSagas" :key="saga.id +'heroic'" :saga="saga" :sagaIndex="index" sagaType="heroic"></saga>
		<saga v-for="(saga, index) in epicSagas" :key="saga.id +'epic'" :saga="saga" :sagaIndex="index" sagaType="epic"></saga>
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
			epicSagas: function () {
				var sagas = this.sortByName(
					this.$store.getters.sagas.filter( function ( saga ) {
						return saga.epic;
					} )
					, 'epic'
				);

				return this.filterSagasBySearch( sagas, 'epic', this.$store.getters.questListingsSearchValue.toLowerCase() );
			}
			, heroicSagas: function () {
				var sagas = this.sortByName(
					this.$store.getters.sagas.filter( function ( saga ) {
						return !!saga.heroic;
					} )
					, 'heroic'
				);

				return this.filterSagasBySearch( sagas, 'heroic', this.$store.getters.questListingsSearchValue.toLowerCase() );
			}
		}
		, methods: {
			filterSagasBySearch: function ( sagas, sagaType, searchValue ) {
				if ( searchValue ) {
					var quests = this.filterQuestsBySearch(
						this.filterQuestsByType( this.$store.getters.quests, sagaType )
						, sagaType, searchValue
					);
					var questIds = quests.map( function ( quest ) {
						return quest.id;
					} );

					sagas = sagas.filter( function ( saga ) {
						return (
							saga.name.toLowerCase().indexOf( searchValue ) > -1
							|| saga[ sagaType ].quests.containsAny( questIds )
						);
					} );
				}

				return sagas;
			}
			, sortByName: function ( sagas, sagaType ) {
				return sagas.sort( function ( a, b ) {
					return a.name.localeCompare( b.name );
				} );
			}
		}
	}
</script>
