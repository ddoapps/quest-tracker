export default {
	methods: {
		filterQuestsBySearch ( quests, questType, searchValue ) {
			if ( searchValue ) {
				let self = this;

				quests = quests.filter( quest => {
					return (
						quest.name.toLowerCase().indexOf( searchValue ) > -1
						|| self.getQuestMinimumLevel( quest, questType ) == searchValue
						|| self.questBelongsToThePack( quest, searchValue )
					);
				} );
			}

			return quests;
		}
		, filterQuestsByType ( quests, questType ) {
			return quests.filter( quest => quest[ questType ] );
		}
		, getQuestMinimumLevel ( quest, questType ) {
			return ( quest[ questType ].normal || quest[ questType ].casual ).level;
		}
		, questBelongsToThePack ( quest, searchValue ) {
			return ( ( quest.pack || {} ).name || 'free to play' ).toLowerCase().indexOf( searchValue ) > -1;
		}
		, sortByLevelAndName ( quests, questType ) {
			let self = this;

			return quests.sort( ( a, b ) => {
				let aLevel = self.getQuestMinimumLevel( a, questType );
				let bLevel = self.getQuestMinimumLevel( b, questType );

				return aLevel - bLevel || a.name.localeCompare( b.name );
			} );
		}
	}
}
