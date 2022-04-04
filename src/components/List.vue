<template>
    <b-container>
        <div id="list">       
            <b-row>
                <b-col cols="4" id="listTitle">
                    Don't work hard, work smart!
                </b-col>
                <b-col cols="7">
                    <b-row id="schedule">
                        <b-col>
                            Schedule:
                        </b-col>
                        <b-col>
                            <button @click="sortTodos()" variant="success" class="btn btn-primary" v-b-popover.hover.righttop="'Sort by deadline time'">sort</button>
                        </b-col>
                    </b-row>                
                    <b-row>
                        <b-row>                            
                            <b-col cols="12">
                                <b-row>
                                    <b-col 
                                        class="ngay" 
                                        cols="1" 
                                        v-for="(month, index2) in months()" 
                                        :key="index2"
                                        :class="{
                                            isDeadline: deadlines().includes(index2,0), 
                                            notDeadline: !deadlines().includes(index2,0), 
                                            }"
                                        id="monthRow">
                                        {{month}} 
                                    </b-col>                 
                                </b-row>                
                            </b-col>                                   
                        </b-row>        

                        <b-row>            
                            <b-col cols="12">
                                <b-row>
                                    <b-col 
                                        class="ngay" 
                                        cols="1" 
                                        v-for="(day, index) in days()" 
                                        :key="index"
                                        :class="{
                                            isDeadline: deadlines().includes(index,0), 
                                            notDeadline: !deadlines().includes(index,0)}"
                                        id="dayRow">
                                        {{day}} 
                                    </b-col>                 
                                </b-row>                
                            </b-col>           
                        </b-row>
                    </b-row>
                </b-col>
            </b-row>
            <TransitionGroup name="fade2">
            <todo
            v-for="(todo, indexTodo) in todos()"
            :key="indexTodo"
            :todo="todo"
            @finishedTodo="finishedTodo(indexTodo)"
            @delTodo="delTodo(indexTodo),setDeadlineArray()"
            :class="{done: todo.done, todo}" 
            @changeDeadline="setDeadlineArray()"
            @deleteDeadline="deleteDeadline(indexTodo)"
            />                
            </TransitionGroup>
            <div class="addTodo">
                    <transition name="fade2">
                    <b-col cols="4" v-b-hover="hoverHandler" id="clickToAdd"  :class="{isHovered: clickToAddHovered}" @click="showForm = true, focusInput()">                    
                        Add new task                    
                    </b-col>
                    </transition>
                    <b-col cols="8"></b-col>
                <transition name="fade2">
                <b-form id="form" v-show="showForm">
                    <b-form-group  :invalid-feedback="invalidFeedback"  :state="state">
                        <b-form-input
                            id="content"
                            v-model="newTodo().content"
                            placeholder="Enter task content"
                            required
                            autofocus
                            ref="content"
                            :state="state"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group>
                        <b-form-input
                            id="description"
                            v-model="newTodo().description"
                            placeholder="Enter task description"
                            required                            
                        ></b-form-input>
                    </b-form-group>

                    <b-button @click="addTodo()" ref="taskContent" variant="primary">Add</b-button>
                    <b-button @click="newTodo().content='', newTodo().description = ''" variant="danger">Reset</b-button>
                    <b-button @click="showForm=false" variant="success" >Exit</b-button>
                </b-form>
                </transition>
            </div>
            <b-col cols="1"></b-col>
        </div>
    </b-container>
</template>

<script>
import Todo from './Todo.vue'
import { mapGetters, mapMutations} from 'vuex'
export default
  {
      mounted(){
        this.$nextTick(() => {
            this.setDay();
            this.setDeadlineArray();
            this.setMonth();
            this.$refs.content.focus();
        });          
      },
       computed: {
      state() {
        return this.newTodo().content.length > 0
      },
      invalidFeedback() {
       
        return 'Please enter task content.'
      }
    },
      components: { Todo },
      methods:{
        ...mapGetters(['todos', 'newTodo', 'days', 'months', 'deadlines']),
       ...mapMutations(['delTodo', 'addTodo', 'finishedTodo', 'ShowDescription', 'setDay', 'setMonth', 'setDeadlineArray', 'deleteDeadline', 'sortTodos']),
        clickToAddHoveredFunc(){
            this.clickToAddHovered = !this.clickToAddHovered;
        },
        hoverHandler(isHovered) {
            if (isHovered) {
                this.clickToAddHovered = true;
            } else {
                this.clickToAddHovered = false;
            }
        },
        focusInput(){
            // this.$refs.taskContent.$el.focus()
            // this.$refs.content.$el.focus();
            this.$refs.content.focus();
            console.log('da goi ham')
        }
       },       
       data(){
           return{
               clickToAddHovered: false,
               showForm: false

           }
       }      
    }
</script>

<style scoped>
.done{
    text-decoration: line-through;
}
#list{
    margin-top: 30px;
    margin-left: 50px;
    width: 1000px;
}
.ngay{
    text-align: center;
}
.isDeadline{
    background-color: #3087B7;
    border: 2px solid #3087B7;
    border-radius: 6px;

}
.notDeadline{
    /* background-color:#DADADA; */
    border-radius: 6px;
    border: 2px solid #3087B7;
}
#form{
    /* display: none; */
}
#clickToAdd{
    border: 2px solid #3087B7;
    border-radius: 6px;
    padding-left: 26px;
    
}
.isHovered{
    background-color: #3087B7;
}
.isSameMonth{
    display: none;
}
.needTo{
    /* display: inline-block !important; */
}
#listTitle{
    border: 2px solid #3087B7;
    border-radius: 6px;
    padding-left: 26px;
    padding-top: 20px;
    display: inline-block;
    
}
#schedule{
    margin-left: 1px;
    font-weight: bold;
}
#monthRow, #dayRow{
     margin-top: 3px;
}
.fade2-enter-active, .fade2-leave-active {
  transition: opacity .5s;
}
.fade2-enter, .fade2-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>