import Vue from 'vue';
import Vuex from 'vuex';

Vue.use( Vuex );

export const dataModel = new Vuex.Store( {
	state: {
		mainScrollTop: 0
		, questListingsSearchValue: ''
		, quests: []
		, questView: ''
		, sagas: []
		, theDisclaimerShouldBeShown: !localStorage.getItem( 'hideTheDisclaimer' )
		, theQuestListingsOmniSearchShouldBeShown: false
	}
	, getters: {
		mainScrollTop: function ( state ) {
			return state.mainScrollTop;
		}
		, questListingsSearchValue: function ( state ) {
			return state.questListingsSearchValue;
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
		, theQuestListingsOmniSearchShouldBeShown: function ( state ) {
			return state.theQuestListingsOmniSearchShouldBeShown;
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
		, showTheQuestListingsOmniSearch: function ( state, value ) {
			state.theQuestListingsOmniSearchShouldBeShown = value;
		}
		, updateTheMainScrollTop: function ( state, scrollTop ) {
			state.mainScrollTop = scrollTop;
		}
		, updateTheQuestListingsSearchValue: function ( state, value ) {
			state.questListingsSearchValue = value;
		}
		, updateTheQuests: function ( state, quests ) {
			state.quests = quests;
		}
		, updateTheSagas: function ( state, sagas ) {
			state.sagas = sagas;
		}
	}
} );
