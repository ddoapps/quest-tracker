<template>
	<div class="height-110px margin-bottom-4px-last-child margin-top-4px">
		<div class="font-color-white-0 font-size-0 layout-col-xs-12" v-if="questIsAlmostInView">
			<div aria-hidden="true" class="font-size-100 font-weight-bold layout-col-xs-1 text-center vertical-align-bottom"
				v-text="questType[ 0 ].toUpperCase()"></div>

			<div class="border-top-left-radius-4px border-top-right-radius-4px font-size-130 height-66px layout-col-xs-11" role="text" tabindex="0"
				:aria-label="questType+ ' level '+ level() +' quest, '+ quest.name"
				:class="questType +'-background-color-dark-red-8 '+ questType +'-background-color-dark-purple-8'">
				<span class="display-block margin-left-4px" v-text="quest.name"></span>
				<span class="display-block font-size-100 margin-left-4px" v-text="'Adventure Pack: '+ pack()"></span>
			</div>

			<div aria-hidden="true" class="border-bottom-left-radius-4px border-top-left-radius-4px font-size-100 height-44px layout-col-xs-1 line-height-3-5 text-center vertical-align-top"
				:class="questType +'-background-color-dark-red-8 '+ questType +'-background-color-dark-purple-8'"
				v-text="level()"></div>

			<div class="layout-col-xs-11">
				<div aria-hidden="true" class="font-size-100 font-weight-bold height-22px layout-col-xs-3 text-indent-4px"
					:class="questType +'-background-color-dark-red-3 '+ questType +'-background-color-dark-purple-3'">Casual</div>
				<div aria-hidden="true" class="font-size-100 font-weight-bold height-22px layout-col-xs-3 text-indent-4px"
					:class="questType +'-background-color-dark-red-0 '+ questType +'-background-color-dark-purple-0'">Normal</div>
				<div aria-hidden="true" class="font-size-100 font-weight-bold height-22px layout-col-xs-3 text-indent-4px"
					:class="questType +'-background-color-dark-red-3 '+ questType +'-background-color-dark-purple-3'">Hard</div>
				<div aria-hidden="true" class="font-size-100 font-weight-bold height-22px layout-col-xs-3 text-indent-4px"
					:class="questType +'-background-color-dark-red-0 '+ questType +'-background-color-dark-purple-0'">Elite</div>

				<div class="font-size-100 height-22px layout-col-xs-3 text-indent-4px" role="text"
					:aria-hidden="casual().xp === '&nbsp;'"
					:aria-label="'Casual Experience: '+ casual().xp"
					:class="questType +'-background-color-dark-red-3 '+ questType +'-background-color-dark-purple-3'"
					:tabindex="casual().xp != '&nbsp;' ? 0 : -1"
					v-html="casual().xp"></div>
				<div class="font-size-100 height-22px layout-col-xs-3 text-indent-4px" role="text"
					:aria-hidden="normal().xp === '&nbsp;'"
					:aria-label="'Normal Experience: '+ normal().xp"
					:class="questType +'-background-color-dark-red-0 '+ questType +'-background-color-dark-purple-0'"
					:tabindex="normal().xp != '&nbsp;' ? 0 : -1"
					v-html="normal().xp"></div>
				<div class="font-size-100 height-22px layout-col-xs-3 text-indent-4px" role="text"
					:aria-hidden="hard().xp === '&nbsp;'"
					:aria-label="'Hard Experience: '+ hard().xp"
					:class="questType +'-background-color-dark-red-3 '+ questType +'-background-color-dark-purple-3'"
					:tabindex="hard().xp != '&nbsp;' ? 0 : -1"
					v-html="hard().xp"></div>
				<div class="border-bottom-right-radius-4px font-size-100 height-22px layout-col-xs-3 text-indent-4px" role="text"
					:aria-hidden="elite().xp === '&nbsp;'"
					:aria-label="'Elite Experience: '+ elite().xp"
					:class="questType +'-background-color-dark-red-0 '+ questType +'-background-color-dark-purple-0'"
					:tabindex="elite().xp != '&nbsp;' ? 0 : -1"
					v-html="elite().xp"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: [ 'quest', 'questIndex', 'questType' ]
		, computed: {
			questIsAlmostInView: function () {
				let questDisplayHeight = 110 + 4;
				let scrollDistance = this.$store.getters.mainScrollTop;
				let offsetTop = this.questIndex * questDisplayHeight;
				let adjustedOffsetTop = offsetTop - scrollDistance;

				return (
					( questDisplayHeight * -5 ) < adjustedOffsetTop
					&& adjustedOffsetTop < ( document.getElementsByTagName( 'main' )[ 0 ].offsetHeight + ( questDisplayHeight * 5 ) )
				);
			}
		}
		, methods: {
			casual: function () {
				return this.questByType().casual || { xp: '&nbsp;' };
			}
			, elite: function () {
				return this.questByType().elite || { xp: '&nbsp;' };
			}
			, hard: function () {
				return this.questByType().hard || { xp: '&nbsp;' };
			}
			, level: function () {
				let questByType = this.questByType();

				return ( questByType.normal || questByType.casual ).level;
			}
			, normal: function () {
				return this.questByType().normal || { xp: '&nbsp;' };
			}
			, pack: function () {
				return ( this.$options.propsData.quest.pack || { name: 'Free to Play'} ).name;
			}
			, questByType: function () {
				let props = this.$options.propsData;
				
				return props.quest[ props.questType ];
			}
		}
	}
</script>
