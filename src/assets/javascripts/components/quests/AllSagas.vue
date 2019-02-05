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
		, mounted: function () {
			this.$store.commit( 'updateThePacks', [] );
			this.$store.commit( 'updateTheQuests', [] );
			this.$store.commit( 'updateTheSagas', [] );

			this.$http.get( './api/packs' ).then( function ( xhr ) {
				var packs = xhr.body;

				this.$http.get( './api/sagas' ).then( function ( xhr ) {
					var sagas = xhr.body;

					this.$http.get( './api/quests' ).then( function ( xhr ) {
						var quests = xhr.body;

						sagas.forEach( function ( saga ) {
							var pack = packs.find( function ( pack ) {
								return ( pack.sagas || [] ).indexOf( saga.id ) > -1;
							} );

							if ( pack ) saga.pack = pack;
						} );

						this.$store.commit( 'updateThePacks', packs );
						this.$store.commit( 'updateTheQuests', quests );
						this.$store.commit( 'updateTheSagas', sagas );
					} );
				} );
			} );
		}
		, computed: {
			epicSagas: function () {
				return this.sortByName(
					this.$store.getters.sagas.filter(
						function ( saga ) {
							return !!saga.epic;
						}
					)
					, 'epic'
				);
			}
			, heroicSagas: function () {
				return this.sortByName(
					this.$store.getters.sagas.filter(
						function ( saga ) {
							return !!saga.heroic;
						}
					)
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
