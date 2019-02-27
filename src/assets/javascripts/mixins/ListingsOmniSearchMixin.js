export default {
	computed: {
		listingsSearchValue () {
			return this.$store.getters.questListingsSearchValue.trim().toLowerCase();
		}
	}
}
