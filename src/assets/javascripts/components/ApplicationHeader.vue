<template>
    <header class="application-header background-color-dark-gray-1 font-color-white layout-container position-bottom position-fixed" aria-hidden="true">
        <nav class="layout-row">
            <div class="layout-col-xs-2 background-color-dark-gray-0 text-center">
                <i class="font-size-xs-md icon-list-bullet line-height-3" title="Main Menu"></i>
            </div>

            <div class="layout-col-xs-10">
                <div class="main-menu-prev layout-col-xs-1 line-height-3">
                    <i class="layout-col-xs-12 background-color-dark-gray-2 font-size-xs-md icon icon-left-open"></i>
                </div>

                <ul class="main-menu layout-col-xs-10 line-height-3 no-list no-padding no-wrap overflow-x-auto">
                    <li class="item layout-col-xs-5 text-center font-size-xs-md no-float">All</li>
                    <li class="item layout-col-xs-6 text-center font-size-xs-md no-float">Heroic</li>
                    <li class="item layout-col-xs-5 text-center font-size-xs-md no-float">Epic</li>
                    <li class="item layout-col-xs-5 text-center font-size-xs-md no-float">Sagas</li>
                    <li class="item layout-col-xs-8 text-center font-size-xs-md no-float">Characters</li>
                </ul>

                <div class="main-menu-next layout-col-xs-1 line-height-3">
                    <i class="layout-col-xs-12 background-color-dark-gray-2 font-size-xs-md icon-right-open"></i>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
    export default {
        components: {
        }
    }
</script>
