import Vue from 'vue';
import Vuex from 'vuex';

Vue.use( Vuex );

export const dataModel = new Vuex.Store( {
	state: {
		quests: {}
		, theDisclaimerShouldBeShown: !localStorage.getItem( 'hideTheDisclaimer' )
	}
	, getters: {
		quests: function ( state ) {
			return state.quests;
		}
		, theDisclaimerShouldBeShown: function ( state ) {
			return state.theDisclaimerShouldBeShown;
		}
	}
	, mutations: {
		hideTheDisclaimer: function ( state ) {
			state.theDisclaimerShouldBeShown = false;
			localStorage.setItem( 'hideTheDisclaimer', 'true' );
		}
		, quests: function ( state, quests ) {
			state.quests = quests;
		}
	}
} );
