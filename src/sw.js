workbox.skipWaiting();
workbox.clientsClaim();

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/^http[s]?:\/\/fonts.googleapis.com\/(.*)/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^http[s]?:\/\/fonts.gstatic.com\/(.*)/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/\/(.*).json/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/\/assets\/images\/(.*)/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/\/assets\/styles\/(.*)/, workbox.strategies.staleWhileRevalidate(), 'GET');

( function () {
	function DBCollection ( databasePromise, collectionName ) {
		var self = this;
		var collectionPromise = new Promise( function ( resolve, reject ) {
			databasePromise.then(
				function ( database ) {
					if ( database.objectStoreNames.contains( collectionName ) ) {
						resolve( database );
					} else {
						reject( 'collection.does.not.exist' );
					}
				}, reject
			);
		} );
	
		self.findAll = function () {
			return new Promise( function ( resolve, reject ) {
				collectionPromise.then(
					function ( database ) {
						var transaction = database.transaction( collectionName, IDBTransaction.READ_ONLY );
						var store = transaction.objectStore( collectionName );
						var request = store.getAll();
	
						request.onsuccess = function () {
							resolve( request.result );
						};
	
						request.onerror = function () {
							reject( 'collection.operation.error' );
						};
					}, reject
				);
			} );
		}
	}
	
	function DBConnection ( databaseName, version, collections ) {
		var self = this;
		var dbPromise = new Promise( function ( resolve, reject ) {
			if ( indexedDB ) {
				var request = indexedDB.open( databaseName, version );
	
				request.onupgradeneeded = function () {
					var database = request.result;
	
					if ( collections ) {
						collections.forEach( function ( collection ) {
							database.createObjectStore( collection.name, { keyPath: collection.id } );
						} );
					}
				};
	
				request.onsuccess = function () {
					resolve( request.result );
				};
	
				request.onerror = function () {
					reject( 'database.error' );
				};
			} else {
				reject( 'database.not.supported' );
			}
		} );
	
		self.getCollection = function ( collectionName ) {
			return new DBCollection( dbPromise, collectionName );
		};
	}
	
	let QuestTracker = ( function () {
		var database;
	
		var functions = {
			retrieveQuests: function () {
				return new Promise( function ( resolve, reject ) {
					fetch( '/assets/jsons/quests.json' ).then( function ( response ) {
						response.json().then( function ( json ) {
							resolve( json );
						}, function () {
							reject();
						} );
					}, function () {
						reject();
					} );
				} );
			}
			, respondWith: function ( data, status ) {
				if ( status == 204 ) {
					return new Response( null, { status: status } );
				} else {
					return new Response( JSON.stringify( data ), { status: status } );
				}
			}
		};
	
		let api = {
			initialize: function () {
				return new Promise( function ( resolve, reject ) {
					try {
						database = new DBConnection( 'ddoQuestTracker', 1, [ { name: 'characters', id: 'id' } ] );

						resolve( functions.respondWith( {}, 200 ) );
					} catch ( e ) {
						reject( functions.respondWith( {}, 500 ) );
					}
				} );
			}
			, registered: function () {
				return new Promise( function ( resolve, reject ) {
					resolve( functions.respondWith( {}, 200 ) );
				} );
			}
			, retrieveCharacters: function () {
				return new Promise( function ( resolve, reject ) {
					database.getCollection( 'characters' ).findAll().then(
						function ( characters ) {
							let status = ( characters || [] ).length ? 200 : 204;

							resolve( functions.respondWith( characters, status ) );
						}
						, function () {
							reject( functions.respondWith( {}, 500 ) );
						}
					);
				} );
			}
			, retrieveAllQuests: function () {
				return new Promise( function ( resolve, reject ) {
					functions.retrieveQuests().then(
						function ( quests ) {
							var results = [];

							[ 'heroic', 'epic' ].forEach( function ( typeKey ) {
								Object.keys( quests ).forEach( function ( questKey ) {
									var quest = quests[ questKey ];
									var questType = quest[ typeKey ] || {};
				
									if ( Object.values( questType ).length ) {
										var result = {
											id: questKey + typeKey
											, name: quest.name
											, level: ( questType.normal || questType.casual ).level
										};
				
										Object.keys( questType ).forEach( function ( difficultyKey ) {
											var difficulty = questType[ difficultyKey ];
				
											result[ difficultyKey ] = {
												experience: difficulty.xp
											};
										} );
				
										results.push( result );
									}
								} );
							} );
			
							results.sort( function ( a, b ) {
								return a.level - b.level || a.name.localeCompare( b.name );
							} );
			
							resolve( functions.respondWith( results, 200 ) );
						}
						, function () {
							reject( functions.respondWith( [], 500 ) );
						}
					);
				} );
			}
			, retrieveHeroicQuests: function () {
				return new Promise( function ( resolve, reject ) {
					functions.retrieveQuests().then(
						function ( quests ) {
							var results = [];

							Object.keys( quests ).forEach( function ( questKey ) {
								var quest = quests[ questKey ];
								var questType = quest.heroic || {};
			
								if ( Object.values( questType ).length ) {
									var result = {
										id: questKey + 'heroic'
										, name: quest.name
										, level: ( questType.normal || questType.casual ).level
									};
			
									Object.keys( questType ).forEach( function ( difficultyKey, index ) {
										var difficulty = questType[ difficultyKey ];
			
										result[ difficultyKey ] = {
											experience: difficulty.xp
										};
									} );
			
									results.push( result );
								}
							} );
			
							results.sort( function ( a, b ) {
								return a.level - b.level || a.name.localeCompare( b.name );
							} );
			
							resolve( functions.respondWith( results, 200 ) );
						}
						, function () {
							reject( functions.respondWith( [], 500 ) );
						}
					);
				} );
			}
		};
	
		return api;
	}() );

	workbox.routing.registerRoute( /api\/initialize/, QuestTracker.initialize, 'GET' );
	workbox.routing.registerRoute( /api\/registered/, QuestTracker.registered, 'HEAD' );

	workbox.routing.registerRoute( /api\/quests/, QuestTracker.retrieveAllQuests, 'GET' );
	workbox.routing.registerRoute( /api\/quests\/type\/heroic/, QuestTracker.retrieveHeroicQuests, 'GET' );
}() );
