<template>
        <div class="ui one item secondary pointing teal menu">
            <div class="active item">{{msg}}</div>
        </div>
        <div class="ui grid">
            <div class="row">
                <div class="sixteen wide column">
                    <div class="ui blue label tag" @click="showTopGrid=true">Data: DataTable.net</div>
                    <img src="http://www.sma-syndicat.org/wp-content/uploads/intense-cache/icons/plugin/font-awesome/sort-up.svg"  height="25" class="ui image right floated" v-if="!showTopGrid" @click="showTopGrid=!showTopGrid"/>
                    <img src="http://www.sma-syndicat.org/wp-content/uploads/intense-cache/icons/plugin/font-awesome/sort-down.svg"  height="25" class="ui image right floated" v-if="showTopGrid" @click="showTopGrid=!showTopGrid"/>
                </div>
            </div>
            <div class="row">
                <div class="sixteen wide column">
                    <transition name="slide">
                        <vue-tbl :data="tblData" :headers="tblHeaders" data-Src="DataTable.net" page-length="10" page-series-length="5" @click="showBottomGrid=false" v-if="showTopGrid"/>
                    </transition>
                </div>
            </div>
            <div class="row">
                <div class="sixteen wide column">
                    <div class="ui blue label tag" @click="showBottomGrid=true;">Data: https://randomuser.me/api
                    </div>
                    <img src="http://www.sma-syndicat.org/wp-content/uploads/intense-cache/icons/plugin/font-awesome/sort-up.svg"  height="25" class="ui image right floated" v-if="!showBottomGrid" @click="showBottomGrid=!showBottomGrid"/>
                    <img src="http://www.sma-syndicat.org/wp-content/uploads/intense-cache/icons/plugin/font-awesome/sort-down.svg"  height="25" class="ui image right floated" v-if="showBottomGrid" @click="showBottomGrid=!showBottomGrid"/>
                </div>
            </div>
            <div class="row">
                <div class="sixteen wide column">
                    <transition name="slide">
                        <vue-tbl :data="randomData" :headers="tbl2Headers" data-Src="https://randomuser.me/api" page-length="200" page-series-length="10"  v-if="showBottomGrid"/>
                    </transition>
                </div>
            </div>
        </div>
</template>

<script>
    export default {
        name: "DataTable.vue"
    },

</script>

<style scoped>
    img,svg,th{
        cursor:pointer!important;
    }

    .grid{
        margin-left:0.5rem!important;
        margin-right:0.5rem!important;
    }
    .partialOpacity
    {
        opacity:0.4;
    }

    .slide-enter-active{
        animation:slide-down 0.5s;
    }
    .slide-leave-active{
        animation:slide-down 0.5s reverse;
    }

    @keyframes slide-down{
        0% {
            transform: translateY(-2rem);
        }
        100% {
            transform: translateY(0);
        }
    }

    .tbl-move{
        transition: transform 1s;
    }
    .tbl-enter-active{
        transition:all 1s;
    }
    .tbl-leave-active{
        transition:all 0.5s;
    }
    .tbl-enter,.tbl-leave-to{
        opacity:0;
        transform: translateX(2rem);
    }


</style>
