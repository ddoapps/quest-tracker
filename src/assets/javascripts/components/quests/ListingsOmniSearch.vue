<template>
	<div class="background-color-light-black-0 display-block font-size-0 max-width-100vw min-width-100vw position-fixed position-left position-top text-center z-index-200"
		v-show="ifTheSearchShouldBeShown()">
		<input aria-label="Filter Quests or Sagas by Quest Name, Saga Name, Normal Level, or Pack"
			class="background-color-white-0 border-radius-4px border-width-0 font-size-xs-md layout-col-xs-11 margin-bottom-4px margin-top-4px padding-8px"
			placeholder="Quest, Saga, Level, Pack" type="text"
			@blur="hideTheSearch"
			@input="updateTheSearchValue">
	</div>
</template>

<script>
	export default {
		data () {
			return {
				searchIsVisibleAlready: false
			};
		}
		, methods: {
			hideTheSearch () {
				this.$store.commit( 'showTheQuestListingsOmniSearch', false );
			}
			, ifTheSearchShouldBeShown () {
				let showTheSearch = this.$store.getters.theQuestListingsOmniSearchShouldBeShown;

				if ( showTheSearch != this.searchIsVisibleAlready ) {
					let searchInput = this.$el.querySelector( 'input' );

					if ( showTheSearch ) {
						this.$nextTick( () => searchInput.focus() );
					}
					
					searchInput.value = this.$store.getters.questListingsSearchValue;
					this.searchIsVisibleAlready = showTheSearch;
				}

				return showTheSearch;
			}
			, updateTheSearchValue ( e ) {
				this.$store.commit( 'updateTheQuestListingsSearchValue', e.target.value );
			}
		}
	}
</script>
