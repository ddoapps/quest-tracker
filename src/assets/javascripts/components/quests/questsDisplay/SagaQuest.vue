<template>
    <span>
        <div aria-hidden="true" :class="questLevelClasses" :key="quest.id + sagaType +'level'" v-text="quest.level"></div>
        <div role="text" tabindex="0" :aria-label="questTextAriaLabel" :class="questTextClasses" :key="quest.id + sagaType +'name'" v-text="quest.name"></div>
    </span>
</template>

<script>
	export default {
		props: [ 'quest', 'index', 'questCount', 'sagaType' ]
		, computed: {
			questLevelClasses () {
				let classes = [
					'font-size-100'
					, 'height-22px'
					, 'layout-col-xs-1'
					, 'line-height-22px'
					, 'text-center'
					, `${this.sagaType}-background-color-dark-red-8`
					, `${this.sagaType}-background-color-dark-purple-8`
				];

				classes.push( this.index % 2 ? 'even' : 'odd' );

				if ( !this.index ) classes.push( 'border-top-left-radius-4px' );
				else if ( this.index + 1 === this.questCount ) classes.push( 'border-bottom-left-radius-4px' );

				return classes.join( ' ' );
			}
			, questTextAriaLabel () {
				return `${this.quest.name}, saga quest ${ this.index + 1 } of ${this.questCount}; level ${this.quest.level}`;
			}
			, questTextClasses () {
				let classes = [
					'font-size-100'
					, 'height-22px'
					, 'layout-col-xs-11'
					, 'line-height-22px'
					, 'text-indent-4px'
					, `${this.sagaType}-background-color-dark-red-8`
					, `${this.sagaType}-background-color-dark-purple-8`
				];

				classes.push( this.index % 2 ? 'even' : 'odd' );

				if ( this.index + 1 === this.questCount ) classes.push( 'border-bottom-right-radius-4px' );

				return classes.join( ' ' );
			}
		}
		, methods: {
			getQuestMinimumLevel ( quest, questType ) {
				return ( quest[ questType ].normal || quest[ questType ].casual ).level;
			}
		}
	}
</script>
