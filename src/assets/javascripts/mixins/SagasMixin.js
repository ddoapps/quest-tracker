import ListingsOmniSearchMixin from './ListingsOmniSearchMixin.js';
import QuestsMixin from './QuestsMixin.js';

export default {
	mixins: [ ListingsOmniSearchMixin, QuestsMixin ]
	, computed: {
		epicSagas () {
			return this.sortByName( this.sagas.filter( saga => saga.epic ) );
		}
		, filteredEpicSagas () {
			return this.filterSagasBySearch( this.epicSagas, this.filteredEpicQuests, 'epic', this.listingsSearchValue );
		}
		, filteredHeroicSagas () {
			return this.filterSagasBySearch( this.heroicSagas, this.filteredHeroicQuests, 'heroic', this.listingsSearchValue );
		}
		, heroicSagas () {
			return this.sortByName( this.sagas.filter( saga => saga.heroic ) );
		}
		, sagas () {
			return this.$store.getters.sagas;
		}
	}
	, methods: {
		filterSagasBySearch ( sagas, quests, sagaType, searchValue ) {
			if ( searchValue ) {
				let questIds = quests.map( quest => quest.id );

				sagas = sagas.filter( saga => {
					return ( saga.name.toLowerCase().indexOf( searchValue ) > -1 || saga[ sagaType ].quests.containsAny( questIds ) );
				} );
			}

			return sagas;
		}
		, sortByName ( sagas ) {
			return sagas.sort( ( a, b ) => a.name.localeCompare( b.name ) );
		}
	}
}
