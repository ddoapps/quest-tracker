<template>
	<div class="height-132px margin-bottom-4px-last-child margin-top-4px">
		<div class="font-color-white-0 font-size-0 layout-col-xs-12" v-if="questIsAlmostInView">
			<div aria-hidden="true" class="font-size-100 font-weight-bold layout-col-xs-1 text-center vertical-align-bottom" v-text="questTypeFirstCharacter"></div>

			<div role="text" tabindex="0" :aria-label="questHeaderAriaLabel" :class="questHeaderClasses">
				<span class="display-block margin-left-4px" v-text="quest.name"></span>
				<span class="display-block font-size-100 margin-left-4px" v-text="adventurePackText"></span>
				<span class="display-block font-size-100 margin-left-4px" v-text="durationText"></span>
			</div>

			<div aria-hidden="true" :class="levelClasses" v-text="level"></div>

			<div class="layout-col-xs-11">
				<div aria-hidden="true" :class="casualHeaderClasses">Casual</div>
				<div aria-hidden="true" :class="normalHeaderClasses">Normal</div>
				<div aria-hidden="true" :class="hardHeaderClasses">Hard</div>
				<div aria-hidden="true" :class="eliteHeaderClasses">Elite</div>

				<div role="text" :aria-hidden="casualTextIsHidden" :aria-label="casualTextAriaLabel" :class="casualTextClasses" :tabindex="casualTextTabIndex" v-html="casual.xp"></div>
				<div role="text" :aria-hidden="normalTextIsHidden" :aria-label="normalTextAriaLabel" :class="normalTextClasses" :tabindex="normalTextTabIndex" v-html="normal.xp"></div>
				<div role="text" :aria-hidden="hardTextIsHidden" :aria-label="hardTextAriaLabel" :class="hardTextClasses" :tabindex="hardTextTabIndex" v-html="hard.xp"></div>
				<div role="text" :aria-hidden="eliteTextIsHidden" :aria-label="eliteTextAriaLabel" :class="eliteTextClasses" :tabindex="eliteTextTabIndex" v-html="elite.xp"></div>
			</div>
		</div>
	</div>
</template>

<script>
	const SPACE = '&nbsp';

	export default {
		props: [ 'quest', 'questIndex', 'questType' ]
		, computed: {
			adventurePackText () {
				return `Adventure Pack: ${this.pack}`;
			}
			, casual () {
				return this.questByType.casual || { xp: SPACE };
			}
			, casualHeaderClasses () {
				let classes = [
					'font-size-100'
					, 'font-weight-bold'
					, 'height-22px'
					, 'layout-col-xs-3'
					, 'line-height-22px'
					, 'text-indent-4px'
					, `${this.questType}-background-color-dark-red-3`
					, `${this.questType}-background-color-dark-purple-3`
				];

				return classes.join( ' ' );
			}
			, casualTextAriaLabel () {
				return `Casual Experience: ${this.casual.xp}`;
			}
			, casualTextClasses () {
				let classes = [
					'font-size-100'
					, 'height-22px'
					, 'layout-col-xs-3'
					, 'line-height-22px'
					, 'text-indent-4px'
					, `${this.questType}-background-color-dark-red-3`
					, `${this.questType}-background-color-dark-purple-3`
				];

				return classes.join( ' ' );
			}
			, casualTextIsHidden () {
				return this.casual.xp === '&nbsp;';
			}
			, casualTextTabIndex () {
				return this.casual.xp != '&nbsp;' ? 0 : -1;
			}
			, durationText () {
				return `Duration: ${this.quest.duration}`;
			}
			, elite () {
				return this.questByType.elite || { xp: SPACE };
			}
			, eliteHeaderClasses () {
				let classes = [
					'font-size-100'
					, 'font-weight-bold'
					, 'height-22px'
					, 'layout-col-xs-3'
					, 'line-height-22px'
					, 'text-indent-4px'
					, `${this.questType}-background-color-dark-red-0`
					, `${this.questType}-background-color-dark-purple-0`
				];

				return classes.join( ' ' );
			}
			, eliteTextAriaLabel () {
				return `Elite Experience: ${this.elite.xp}`;
			}
			, eliteTextClasses () {
				let classes = [
					'border-bottom-right-radius-4px'
					, 'font-size-100'
					, 'height-22px'
					, 'layout-col-xs-3'
					, 'line-height-22px'
					, 'text-indent-4px'
					, `${this.questType}-background-color-dark-red-0`
					, `${this.questType}-background-color-dark-purple-0`
				];

				return classes.join( ' ' );
			}
			, eliteTextIsHidden () {
				return this.elite.xp === '&nbsp;';
			}
			, eliteTextTabIndex () {
				return this.elite.xp != '&nbsp;' ? 0 : -1;
			}
			, hard () {
				return this.questByType.hard || { xp: SPACE };
			}
			, hardHeaderClasses () {
				let classes = [
					'font-size-100'
					, 'font-weight-bold'
					, 'height-22px'
					, 'layout-col-xs-3'
					, 'line-height-22px'
					, 'text-indent-4px'
					, `${this.questType}-background-color-dark-red-3`
					, `${this.questType}-background-color-dark-purple-3`
				];

				return classes.join( ' ' );
			}
			, hardTextAriaLabel () {
				return `Hard Experience: ${this.hard.xp}`;
			}
			, hardTextClasses () {
				let classes = [
					'font-size-100'
					, 'height-22px'
					, 'layout-col-xs-3'
					, 'line-height-22px'
					, 'text-indent-4px'
					, `${this.questType}-background-color-dark-red-3`
					, `${this.questType}-background-color-dark-purple-3`
				];

				return classes.join( ' ' );
			}
			, hardTextIsHidden () {
				return this.hard.xp === '&nbsp;';
			}
			, hardTextTabIndex () {
				return this.hard.xp != '&nbsp;' ? 0 : -1;
			}
			, level () {
				return ( this.questByType.normal || this.questByType.casual ).level;
			}
			, levelClasses () {
				let classes = [
					'border-bottom-left-radius-4px'
					, 'border-top-left-radius-4px'
					, 'font-size-100'
					, 'height-44px'
					, 'layout-col-xs-1'
					, 'line-height-3-5'
					, 'text-center'
					, 'vertical-align-top'
					, `${this.questType}-background-color-dark-red-8`
					, `${this.questType}-background-color-dark-purple-8`
				];

				return classes.join( ' ' );
			}
			, normal () {
				return this.questByType.normal || { xp: SPACE };
			}
			, normalHeaderClasses () {
				let classes = [
					'font-size-100'
					, 'font-weight-bold'
					, 'height-22px'
					, 'layout-col-xs-3'
					, 'line-height-22px'
					, 'text-indent-4px'
					, `${this.questType}-background-color-dark-red-0`
					, `${this.questType}-background-color-dark-purple-0`
				];

				return classes.join( ' ' );
			}
			, normalTextAriaLabel () {
				return `Normal Experience: ${this.normal.xp}`;
			}
			, normalTextClasses () {
				let classes = [
					'font-size-100'
					, 'height-22px'
					, 'layout-col-xs-3'
					, 'line-height-22px'
					, 'text-indent-4px'
					, `${this.questType}-background-color-dark-red-0`
					, `${this.questType}-background-color-dark-purple-0`
				];

				return classes.join( ' ' );
			}
			, normalTextIsHidden () {
				return this.normal.xp === '&nbsp;';
			}
			, normalTextTabIndex () {
				return this.normal.xp != '&nbsp;' ? 0 : -1;
			}
			, pack () {
				return ( this.quest.pack || { name: 'Free to Play' } ).name;
			}
			, questByType () {
				return this.quest[ this.questType ];
			}
			, questHeaderAriaLabel () {
				return `${this.questType} level ${this.level} quest, ${this.quest.name}`;
			}
			, questHeaderClasses () {
				let classes = [
					'border-top-left-radius-4px'
					, 'border-top-right-radius-4px'
					, 'font-size-130'
					, 'height-88px'
					, 'layout-col-xs-11'
					, `${this.questType}-background-color-dark-red-8`
					, `${this.questType}-background-color-dark-purple-8`
				];

				return classes.join( ' ' );
			}
			, questIsAlmostInView () {
				let questDisplayHeight = 132 + 4;
				let scrollDistance = this.$store.getters.mainScrollTop;
				let offsetTop = this.questIndex * questDisplayHeight;
				let adjustedOffsetTop = offsetTop - scrollDistance;

				return (
					( questDisplayHeight * -5 ) < adjustedOffsetTop
					&& adjustedOffsetTop < ( document.getElementsByTagName( 'main' )[ 0 ].offsetHeight + ( questDisplayHeight * 5 ) )
				);
			}
			, questTypeFirstCharacter () {
				return this.questType[ 0 ].toUpperCase();
			}
		}
	}
</script>
