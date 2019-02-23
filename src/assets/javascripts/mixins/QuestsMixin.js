export default {
	methods: {
		filterQuestsBySearch: function ( quests, questType, searchValue ) {
			if ( searchValue ) {
				var thiz = this;

				quests = quests.filter( function ( quest ) {
					return (
						quest.name.toLowerCase().indexOf( searchValue ) > -1
						|| thiz.getQuestMinimumLevel( quest, questType ) == searchValue
						|| thiz.questBelongsToThePack( quest, searchValue )
					);
				} );
			}

			return quests;
		}
		, filterQuestsByType: function ( quests, questType ) {
			return quests.filter( function ( quest ) {
				return !!quest[ questType ];
			} );
		}
		, getQuestMinimumLevel: function ( quest, questType ) {
			return ( quest[ questType ].normal || quest[ questType ].casual ).level;
		}
		, questBelongsToThePack: function ( quest, searchValue ) {
			return ( ( quest.pack || {} ).name || 'free to play' ).toLowerCase().indexOf( searchValue ) > -1;
		}
		, sortByLevelAndName: function ( quests, questType ) {
			var thiz = this;

			return quests.sort( function ( a, b ) {
				var aLevel = thiz.getQuestMinimumLevel( a, questType );
				var bLevel = thiz.getQuestMinimumLevel( b, questType );

				return aLevel - bLevel || a.name.localeCompare( b.name );
			} );
		}
	}
}
