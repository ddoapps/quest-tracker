import Vue from 'vue';
import Vuex from 'vuex';

Vue.use( Vuex );

export const dataModel = new Vuex.Store( {
	state: {
		quests: []
		, questView: ''
		, theDisclaimerShouldBeShown: !localStorage.getItem( 'hideTheDisclaimer' )
	}
	, getters: {
		quests: function ( state ) {
			return state.quests;
		}
		, questView: function ( state ) {
			return state.questView;
		}
		, theDisclaimerShouldBeShown: function ( state ) {
			return state.theDisclaimerShouldBeShown;
		}
	}
	, mutations: {
		changeTheQuestView: function ( state, view ) {
			state.questView = view;
		}
		, hideTheDisclaimer: function ( state ) {
			state.theDisclaimerShouldBeShown = false;
			localStorage.setItem( 'hideTheDisclaimer', 'true' );
		}
		, updateTheQuests: function ( state, quests ) {
			state.quests = quests;
		}
	}
} );
