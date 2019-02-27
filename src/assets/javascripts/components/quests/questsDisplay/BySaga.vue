<template>
	<div class="margin-bottom-4px-last-child margin-top-4px">
		<div class="font-color-white-0 font-size-0 layout-col-xs-12">
			<div aria-hidden="true" class="font-size-100 font-weight-bold layout-col-xs-1 text-center vertical-align-bottom" v-text="sagaTypeFirstCharacter"></div>

			<div role="text" tabindex="0" :aria-label="sagaHeaderAriaLabel" :class="sagaHeaderClasses">
				<span class="display-block margin-left-4px" v-text="saga.name"></span>
				<span class="display-block font-size-100 margin-left-4px" v-text="adventurePackText"></span>
			</div>

			<div class="height-22px layout-col-xs-1 vertical-align-top"></div>

			<div aria-hidden="true" class="layout-col-xs-11">
				<div :class="normalHeaderClasses">Normal</div>
				<div :class="hardHeaderClasses">Hard</div>
				<div :class="eliteHeaderClasses">Elite</div>
				<div :class="trueEliteHeaderClasses">True Elite</div>
			</div>

			<div class="height-22px layout-col-xs-1 vertical-align-top"></div>

			<div class="layout-col-xs-11">
				<div role="text" tabindex="0" :aria-label="normalTextAriaLabel" :class="normalTextClasses" v-html="normalText"></div>
				<div role="text" tabindex="0" :aria-label="hardTextAriaLabel" :class="hardTextClasses" v-html="hardText"></div>
				<div role="text" tabindex="0" :aria-label="eliteTextAriaLabel" :class="eliteTextClasses" v-html="eliteText"></div>
				<div role="text" tabindex="0" :aria-label="trueEliteTextAriaLabel" :class="trueEliteTextClasses" v-html="trueEliteText"></div>
			</div>

			<template v-for="( quest, index ) in sagaQuests">
				<div aria-hidden="true" :class="sagaQuestLevelClasses( index, sagaQuests.length )" :key="quest.id + sagaType +'level'" v-text="quest.level"></div>
				<div role="text" tabindex="0"
					:aria-label="sagaQuestTextAriaLabel( index, sagaQuests.length, quest )"
					:class="sagaQuestTextClasses( index, sagaQuests )"
					:key="quest.id + sagaType +'name'" v-text="quest.name"></div>
			</template>
		</div>
	</div>
</template>

<script>
	import QuestsMixin from '../../../mixins/QuestsMixin.js';

	export default {
		mixins: [ QuestsMixin ]
		, props: [ 'saga', 'sagaIndex', 'sagaType' ]
		, computed: {
			adventurePackText () {
				return `Adventure Pack: ${this.pack}`;
			}
			, eliteHeaderClasses () {
				let classes = [
					'font-size-100'
					, 'font-weight-bold'
					, 'height-22px'
					, 'layout-col-xs-3'
					, 'line-height-22px'
					, 'text-indent-4px'
					, `${this.sagaType}-background-color-dark-red-3`
					, `${this.sagaType}-background-color-dark-purple-3`
				];

				return classes.join( ' ' );
			}
			, eliteText () {
				return this.saga[ this.sagaType ].elite.xp;
			}
			, eliteTextAriaLabel () {
				return `Elite Experience: ${this.eliteText}`;
			}
			, eliteTextClasses () {
				let classes = [
					'font-size-100'
					, 'height-22px'
					, 'layout-col-xs-3'
					, 'line-height-22px'
					, 'text-indent-4px'
					, `${this.sagaType}-background-color-dark-red-3`
					, `${this.sagaType}-background-color-dark-purple-3`
				];

				return classes.join( ' ' );
			}
			, hardHeaderClasses () {
				let classes = [
					'font-size-100'
					, 'font-weight-bold'
					, 'height-22px'
					, 'layout-col-xs-3'
					, 'line-height-22px'
					, 'text-indent-4px'
					, `${this.sagaType}-background-color-dark-red-0`
					, `${this.sagaType}-background-color-dark-purple-0`
				];

				return classes.join( ' ' );
			}
			, hardText () {
				return this.saga[ this.sagaType ].hard.xp;
			}
			, hardTextAriaLabel () {
				return `Hard Experience: ${this.hardText}`;
			}
			, hardTextClasses () {
				let classes = [
					'font-size-100'
					, 'height-22px'
					, 'layout-col-xs-3'
					, 'line-height-22px'
					, 'text-indent-4px'
					, `${this.sagaType}-background-color-dark-red-0`
					, `${this.sagaType}-background-color-dark-purple-0`
				];

				return classes.join( ' ' );
			}
			, normalHeaderClasses () {
				let classes = [
					'font-size-100'
					, 'font-weight-bold'
					, 'height-22px'
					, 'layout-col-xs-3'
					, 'line-height-22px'
					, 'text-indent-4px'
					, `${this.sagaType}-background-color-dark-red-3`
					, `${this.sagaType}-background-color-dark-purple-3`
				];

				return classes.join( ' ' );
			}
			, normalText () {
				return this.saga[ this.sagaType ].normal.xp;
			}
			, normalTextAriaLabel () {
				return `Normal Experience: ${this.normalText}`;
			}
			, normalTextClasses () {
				let classes = [
					'font-size-100'
					, 'height-22px'
					, 'layout-col-xs-3'
					, 'line-height-22px'
					, 'text-indent-4px'
					, `${this.sagaType}-background-color-dark-red-3`
					, `${this.sagaType}-background-color-dark-purple-3`
				];

				return classes.join( ' ' );
			}
			, pack () {
				return ( this.saga.pack || { name: 'Free to Play' } ).name;
			}
			, sagaQuests () {
				var quests = this.heroicQuests;
				var sagaQuestIds = this.saga[ this.sagaType ].quests;

				if ( this.sagaType === 'epic' ) quests = this.epicQuests;

				quests = quests
					.filter( quest => sagaQuestIds.contains( quest.id ) )
					.sort( ( a, b ) => sagaQuestIds.indexOf( a.id ) - sagaQuestIds.indexOf( b.id ) );

				return quests.map( quest => ( { id: quest.id, name: quest.name, level: this.getQuestMinimumLevel( quest, this.sagaType ) } ) );
			}
			, sagaHeaderAriaLabel () {
				return `${this.sagaType} saga, ${this.saga.name}`;
			}
			, sagaHeaderClasses () {
				let classes = [
					'border-top-left-radius-4px'
					, 'border-top-right-radius-4px'
					, 'font-size-130'
					, 'height-66px'
					, 'layout-col-xs-11'
					, `${this.sagaType}-background-color-dark-red-8`
					, `${this.sagaType}-background-color-dark-purple-8`
				];

				return classes.join( ' ' );
			}
			, sagaTypeFirstCharacter () {
				return this.sagaType[ 0 ].toUpperCase();
			}
			, trueEliteHeaderClasses () {
				let classes = [
					'font-size-100'
					, 'font-weight-bold'
					, 'height-22px'
					, 'layout-col-xs-3'
					, 'line-height-22px'
					, 'text-indent-4px'
					, `${this.sagaType}-background-color-dark-red-0`
					, `${this.sagaType}-background-color-dark-purple-0`
				];

				return classes.join( ' ' );
			}
			, trueEliteText () {
				return this.saga[ this.sagaType ].true_elite.xp;
			}
			, trueEliteTextAriaLabel () {
				return `True Elite Experience: ${this.trueEliteText}`;
			}
			, trueEliteTextClasses () {
				let classes = [
					'font-size-100'
					, 'height-22px'
					, 'layout-col-xs-3'
					, 'line-height-22px'
					, 'text-indent-4px'
					, `${this.sagaType}-background-color-dark-red-0`
					, `${this.sagaType}-background-color-dark-purple-0`
				];

				return classes.join( ' ' );
			}
		}
		, methods: {
			sagaQuestLevelClasses ( index, questCount ) {
				let classes = [
					'font-size-100'
					, 'height-22px'
					, 'layout-col-xs-1'
					, 'line-height-22px'
					, 'text-center'
					, `${this.sagaType}-background-color-dark-red-8`
					, `${this.sagaType}-background-color-dark-purple-8`
				];

				classes.push( index % 2 ? 'even' : 'odd' );

				if ( !index ) classes.push( 'border-top-left-radius-4px' );
				else if ( index + 1 === questCount ) classes.push( 'border-bottom-left-radius-4px' );

				return classes.join( ' ' );
			}
			, sagaQuestTextAriaLabel ( index, questCount, quest ) {
				return `${quest.name}, saga quest ${ index + 1 } of ${questCount}; level ${quest.level}`;
			}
			, sagaQuestTextClasses ( index, questCount ) {
				let classes = [
					'font-size-100'
					, 'height-22px'
					, 'layout-col-xs-11'
					, 'line-height-22px'
					, 'text-indent-4px'
					, `${this.sagaType}-background-color-dark-red-8`
					, `${this.sagaType}-background-color-dark-purple-8`
				];

				classes.push( index % 2 ? 'even' : 'odd' );

				if ( index + 1 === questCount ) classes.push( 'border-bottom-right-radius-4px' );

				return classes.join( ' ' );
			}
		}
	}
</script>
