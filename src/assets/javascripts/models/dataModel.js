import Vue from 'vue';
import Vuex from 'vuex';

Vue.use( Vuex );

export const dataModel = new Vuex.Store( {
	state: {
		mainScrollTop: 0
		, quests: []
		, questView: ''
		, sagas: []
		, theDisclaimerShouldBeShown: !localStorage.getItem( 'hideTheDisclaimer' )
	}
	, getters: {
		mainScrollTop: function ( state ) {
			return state.mainScrollTop;
		}
		, quests: function ( state ) {
			return state.quests;
		}
		, questView: function ( state ) {
			return state.questView;
		}
		, sagas: function ( state ) {
			return state.sagas;
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
		, updateTheMainScrollTop: function ( state, scrollTop ) {
			state.mainScrollTop = scrollTop;
		}
		, updateTheQuests: function ( state, quests ) {
			state.quests = quests;
		}
		, updateTheSagas: function ( state, sagas ) {
			state.sagas = sagas;
		}
	}
} );
