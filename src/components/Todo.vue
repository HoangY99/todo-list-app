<template>
    <b-container class="container" id="todo">
        <transition name="fade2">
        <b-row v-show="!showEditForm">
            <b-col cols="1" id="check">
                <input type="checkbox" @click="finishedTodo()" id="done"> <label for="done">Done</label>
            </b-col>
            <b-col cols="3" v-b-hover="hoverHandler" id="todoContent" v-b-popover.hover.righttop="todo.description" title="Task description" :class="{isHovered: clickToAddHovered}" @dblclick="showEditForm=true">
                <span>{{todo.content}}</span>
            </b-col>
            <b-col cols="7">
                <input id="range" type="range" min="0" max="11" step="1" v-model="todo.deadline" @change="changeDeadline()">
            </b-col>
            <b-col cols="1">
                <b-button size="sm" @click="clickDel()">Del</b-button>
            </b-col>
        </b-row>  
        </transition>
<transition name="fade">
        <b-form id="editForm" v-show="showEditForm">
                    <b-form-group>
                        <b-form-input
                            id="input-1"
                            v-model="todo.content"
                            placeholder="Enter task content"
                            required
                            ref="content"
                        ></b-form-input>
                    </b-form-group>
            
                    <b-form-group>
                        <b-form-input
                            id="input-2"
                            v-model="todo.description"
                            placeholder="Enter task description"
                            required
                            @keydown.enter="showEditForm=false"                           
                        ></b-form-input>
                    </b-form-group>

                    <b-button @click="showEditForm=false" ref="taskContent" variant="primary">Edit</b-button>
                    <b-button @click="showEditForm=false" variant="success" >Exit</b-button>
                </b-form>
     </transition>

    </b-container>
</template>

<script>
export default {
    props:['todo'],
    data(){
        return{
             clickToAddHovered: false,
             showEditForm: false
        }
    },
    methods:{
        clickDel(){
            this.$emit('delTodo')
        },
        finishedTodo(){
            this.$emit('finishedTodo')
        },
        changeDeadline(){
            this.$emit('changeDeadline')
        },
        hoverHandler(isHovered) {
            if (isHovered) {
                this.clickToAddHovered = true;
            } else {
                this.clickToAddHovered = false;
            }
        },
        deleteDeadline(){
            this.$emit('deleteDeadline')
        }
    }
    
}
</script>

<style scoped>

.container{
    max-width: 1000px;
}
#range{
    width: 100%;
}
#todo{
    background-color: rgba(0, 0, 0, 0);
    border-radius: 10px;
    margin-top: 3px;
    margin-bottom: 3px;
}
#check{
    /* background-color: #D2E4AC; */
    border-radius: 8px;
    border: 2px solid #3087B7;


}
#todoContent{
    /* background-color: #D2E4AC; */
    border-radius: 8px;
    border: 2px solid #3087B7;
}
.isHovered{
    background-color: #3087B7;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.fade2-enter-active, .fade2-leave-active {
  transition: opacity .5s;
}
.fade2-enter, .fade2-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
