require( './assets/styles/application.less' );

import Vue from 'vue';
import VueResource from 'vue-resource';
import Application from './assets/javascripts/controllers/Application.vue';
import { dataModel } from './assets/javascripts/models/dataModel.js';

Vue.use( VueResource );

( function (window, document, undefined) {
	const USE_REGISTERED_SERVICE_WORKER = 'use-existing-service-worker';
	const SERVICE_WORKER_LAST_MODIFIED = 'service-worker-last-modified';

	window.addEventListener( 'load', event => {
		if ( theBrowserIsSupported() ) {
			checkIfTheServiceWorkerIsRegistered().then( initializeTheApplication, registerTheServiceWorker );
		} else {
			showTheElement( document.querySelector( '.firstRender .unsupportedBrowser' ), true );
		}
	} );

	String.prototype.capitalize = function () {
		if ( this && this.length ) {
			return this[ 0 ].toUpperCase() + this.slice( 1 );
		}

		return this;
	};

	Array.prototype.contains = function ( value ) {
		return ( this && this.length && this.indexOf( value ) > -1 );
	};

	Array.prototype.containsAny = function ( values ) {
		var result = false;

		if ( this && this.length && values && values.length ) {
			for ( var i = 0; !result && i < values.length; i++ ) {
				result = this.contains( values[ i ] );
			}
		}

		return result;
	};

	// ============================================================================================

	function ajax ( type, url ) {
		return new Promise( ( resolve, reject ) => {
			const xhr = new XMLHttpRequest();
	
			xhr.onreadystatechange = () => {
				if ( xhr.readyState === XMLHttpRequest.DONE ) {
					if ( xhr.status >= 200 && xhr.status <= 299 ) {
						resolve( xhr );
					} else {
						reject( xhr );
					}
				}
			};
	
			xhr.open( type, url, true );
			xhr.send();
		} );
	}

	function checkIfTheServiceWorkerHasNotBeenUpdated () {
		return new Promise( ( resolve, reject ) => {
			ajax( 'HEAD', './sw.js' ).then(
				xhr => {
					if ( xhr.getResponseHeader( 'last-modified' ) === localStorage.getItem( SERVICE_WORKER_LAST_MODIFIED ) ) {
						resolve();
					} else {
						localStorage.clear();
						reject();
					}
				}, () => reject( USE_REGISTERED_SERVICE_WORKER ) );
		} );
	}

	function checkIfTheServiceWorkerIsCurrentlyActivated () {
		return ajax( 'HEAD', './api/registered' );
	}

	function checkIfTheServiceWorkerIsRegistered () {
		showTheElement( document.querySelector( '.firstRender .checkForExistingApplication' ), true );

		return new Promise( ( resolve, reject ) => {
			const theServiceWorkIsNotRegistered = ( status ) => {
				if ( status == USE_REGISTERED_SERVICE_WORKER ) {
					resolve();
				} else {
					localStorage.removeItem( SERVICE_WORKER_LAST_MODIFIED );
					reject();
				}
			};

			if ( localStorage.getItem( SERVICE_WORKER_LAST_MODIFIED ) ) {
				checkIfTheServiceWorkerIsCurrentlyActivated().then(
					() => checkIfTheServiceWorkerHasNotBeenUpdated().then( resolve, theServiceWorkIsNotRegistered )
					, theServiceWorkIsNotRegistered
				);
			} else {
				theServiceWorkIsNotRegistered();
			}
		} );
	}
	
	function registerTheServiceWorker () {
		showTheElement( document.querySelector( '.firstRender .waitForApplicationRegistration' ), true );

		ajax( 'HEAD', './sw.js' ).then(
			xhr => {
				const serviceWorkerLastModified = xhr.getResponseHeader( 'last-modified' );

				navigator.serviceWorker.register( './sw.js' ).then(
					() => {
						showTheElement( document.querySelector( '.firstRender .applicationRegistrationSuccess' ), true );

						var refreshButton = document.querySelector( '.firstRender .refreshButton' );

						refreshButton.addEventListener( 'click', function () { window.location.reload(); } );

						setTimeout( () => showTheElement( refreshButton, true ), 1500 );
						localStorage.setItem( SERVICE_WORKER_LAST_MODIFIED, serviceWorkerLastModified );
					}
					, () => {
						showTheElement( document.querySelector( '.firstRender .applicationRegistrationFailure' ), true );
					}
				);
			}
			, () => {
				showTheElement( document.querySelector( '.firstRender .applicationRegistrationFailure' ), true );
			}
		);
	}

	function showTheElement ( element, showTheElement ) {
		if ( showTheElement ) {
			element.classList.add( 'fade-in' );
			element.classList.remove( 'display-none' );
		} else {
			element.classList.add( 'display-none' );
			element.classList.remove( 'fade-in' );
		}
	
		element.setAttribute( 'aria-hidden', !showTheElement );
	}
	
	function theBrowserIsSupported () {
		let serviceWorkersEnabled = ( 'serviceWorker' in navigator );
		let localStorageEnabled = ( 'localStorage' in window );
		let promisesEnabled = ( 'Promise' in window );

		if ( window.location.hash === '#debug' ) {
			alert(
				'Service Workers: '+ serviceWorkersEnabled +'\n'
				+'Local Storage: '+ localStorageEnabled +'\n'
				+'Promises: '+ promisesEnabled
			);
		}

		return ( serviceWorkersEnabled && localStorageEnabled && promisesEnabled );
	}

	function initializeTheApplication () {
		showTheElement( document.querySelector( '.firstRender .initializing' ), true );

		ajax( 'GET', './api/initialize' ).then(
			() => {
				new Vue( {
					el: document.querySelector( '.application' )
					, components: { Application }
					, render: function ( h ) {
						return h( 'application' );
					}
					, store: dataModel
				} );

				let startButton = document.querySelector( '.firstRender .startButton' );

				startButton.addEventListener( 'click', function () {
					let firstRender = document.querySelector( '.firstRender' );

					firstRender.parentNode.removeChild( firstRender );
					showTheElement( document.querySelector( '.application' ), true );
				} );

				showTheElement( startButton, true );
			}
			, () => {
				showTheElement( document.querySelector( '.firstRender .initializingFailure' ), true );
			}
		);
	}
}( window, document ) );
