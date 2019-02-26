<template>
	<header class="background-color-dark-gray-3 display-block font-color-white-0 font-size-0 max-width-100vw min-width-100vw position-bottom position-fixed z-index-200">
		<div class="background-color-light-black-5 layout-col-xs-2 line-height-3 vertical-align-bottom"
			v-if="theExtraMainMenuOptionShouldBeShown">
			<i aria-label="Search Button; click this button to open and focus on the search input"
				class="layout-col-xs-12 font-size-xs-md icon icon-search text-center"
				role="button"
				@click="showTheQuestsOmniSearch"></i>
		</div>

		<div class="layout-col-xs-1 line-height-3">
			<i class="before-margin-left-2px layout-col-xs-12 background-color-dark-gray-8 font-size-xs-md icon icon-left-open"></i>
		</div>

		<nav aria-label="Main Menu; list quests or sagas" class="font-size-0 vertical-align-bottom"
			:class="theExtraMainMenuOptionShouldBeShown ? 'layout-col-xs-8' : 'layout-col-xs-10' ">
			<ul class="layout-col-xs-12 line-height-3 no-list no-margin no-padding no-wrap overflow-x-auto">
				<li class="border-color-light-black-5 border-left-solid font-size-xs-md layout-col-xs-5 text-center" tabindex="0"
					@click="showAllQuests">All</li>
				<li class="border-color-light-black-5 border-left-solid font-size-xs-md layout-col-xs-6 text-center" tabindex="0"
					@click="showHeroicQuests">Heroic</li>
				<li class="border-color-light-black-5 border-left-solid font-size-xs-md layout-col-xs-5 text-center" tabindex="0"
					@click="showEpicQuests">Epic</li>
				<li class="border-color-light-black-5 border-left-solid border-right-solid font-size-xs-md layout-col-xs-5 text-center" tabindex="0"
					@click="showSagas">Sagas</li>
			</ul>
		</nav>

		<div class="layout-col-xs-1 line-height-3">
			<i class="before-margin-left-4px:before layout-col-xs-12 background-color-dark-gray-8 font-size-xs-md icon icon-right-open"></i>
		</div>
	</header>
</template>

<script>
	export default {
		computed: {
			theExtraMainMenuOptionShouldBeShown: function () {
				return ( this.$store.getters.questView != '' && !this.$store.getters.theQuestListingsOmniSearchShouldBeShown );
			}
		}
		, methods: {
			showAllQuests: function () {
				this.$store.commit( 'changeTheQuestView', 'all' );
				this.$store.commit( 'updateTheQuestListingsSearchValue', '' );
			}
			, showEpicQuests: function () {
				this.$store.commit( 'changeTheQuestView', 'epic' );
				this.$store.commit( 'updateTheQuestListingsSearchValue', '' );
			}
			, showHeroicQuests: function () {
				this.$store.commit( 'changeTheQuestView', 'heroic' );
				this.$store.commit( 'updateTheQuestListingsSearchValue', '' );
			}
			, showSagas: function () {
				this.$store.commit( 'changeTheQuestView', 'sagas' );
				this.$store.commit( 'updateTheQuestListingsSearchValue', '' );
			}
			, showTheQuestsOmniSearch: function () {
				this.$store.commit( 'showTheQuestListingsOmniSearch', true );
			}
		}
	}
</script>
