<template>
	<section>
		<quest v-for="(quest, index) in heroicQuests" :key="quest.id +'heroic'" :quest="quest" :questIndex="index" questType="heroic"></quest>
		<quest v-for="(quest, index) in epicQuests" :key="quest.id +'epic'" :quest="quest" :questIndex="index + heroicQuests.length" questType="epic"></quest>
	</section>
</template>

<script>
	import Quest from './questsDisplay/ByLevel.vue';

	export default {
		components: {
			Quest
		}
		, mounted: function () {
			this.$store.commit( 'updateThePacks', [] );
			this.$store.commit( 'updateTheQuests', [] );

			this.$http.get( './api/packs' ).then( function ( xhr ) {
				var packs = xhr.body;

				this.$http.get( './api/quests' ).then( function ( xhr ) {
					var quests = xhr.body;

					quests.forEach( function ( quest ) {
						var pack = packs.find( function ( pack ) {
							return pack.quests.indexOf( quest.id ) > -1;
						} );

						if ( pack ) quest.pack = pack;
					} );
					
					this.$store.commit( 'updateThePacks', packs );
					this.$store.commit( 'updateTheQuests', quests );
				} );
			} );
		}
		, computed: {
			epicQuests: function () {
				return this.sortByLevelAndName(
					this.$store.getters.quests.filter(
						function ( quest ) {
							return !!quest.epic;
						}
					)
					, 'epic'
				);
			}
			, heroicQuests: function () {
				return this.sortByLevelAndName(
					this.$store.getters.quests.filter(
						function ( quest ) {
							return !!quest.heroic;
						}
					)
					, 'heroic'
				);
			}
		}
		, methods: {
			sortByLevelAndName: function ( quests, questType ) {
				return quests.sort( function ( a, b ) {
					var aLevel = ( a[ questType ].normal || a[ questType ].casual ).level;
					var bLevel = ( b[ questType ].normal || b[ questType ].casual ).level;

					return aLevel - bLevel || a.name.localeCompare( b.name );
				} );
			}
		}
	}
</script>
