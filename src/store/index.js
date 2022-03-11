import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    todos:[
        {content: 'Nộp BT Java', done: false, description:'Làm hết 15 bài TH, nộp qua Email thầy', showDes: false, deadline: 3},
        {content: 'Đồ án Giải thuật & lập trình', done: false, description:'online trên msTeams', showDes: false, deadline: 6},
        {content: 'Họp BCN các CLB', done: false, description:'12h trưa ở văn phòng Hội', showDes: false, deadline: 1},
        {content: 'Nộp học phí kỳ II', done: false, description:'4,500,000', showDes: false, deadline: 10}
    ],
    newTodo:{content:'', done: false, description:'', deadline: 0},
    EditTodo:{content:'', done: false, description:'', deadline: 0},
    notDoneTodos:[],

    days:[],
    months:[],
    monthss:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    deadlines:[]    
  },
  getters:{
    todos(state){
        return state.todos;
    },
    newTodo(state){
        return state.newTodo;
    },
    days(state){
      return state.days;
    },
    months(state){
      return state.months;
    },
    deadlines(state){
      return state.deadlines;
    }    
  },
  mutations: {
      delTodo(state, key){
        state.todos.splice(key,1);
      },
      editTodo(state, key){
        state.todos[key] = state.EditTodo;
      },
      addTodo(state){
        if(state.newTodo.content != ''){
         
          state.todos.push({content: state.newTodo.content, done: false, description: state.newTodo.description});
          state.newTodo.content = '';
          state.newTodo.description = '';
        }
      },
      finishedTodo(state, indexTodo){
          state.todos[indexTodo].done = !state.todos[indexTodo].done;
          if(state.todos[indexTodo].done){
            
            state.deadlines[indexTodo] = 100;
          }else{
            state.deadlines[indexTodo] = parseInt(state.todos[indexTodo].deadline, 10);            
          }
      },
      setDay(state){
          for(var i = 0; i < 12; i++) {
          const d = new Date();
          var newDay = d.getDate(d.setDate(d.getDate()+i));
          state.days.push(newDay) 
        }        
      },
      setMonth(state){
          for(var i = 0; i < 12; i++) {
          const d = new Date();
          var newMonthNumber = d.getMonth(d.setDate(d.getDate()+i));
          var newMonthString = state.monthss[newMonthNumber].toString()
          state.months.push(newMonthString)                        
        }        
      },
      setDeadlineArray(state){
        state.deadlines = []
        for(var i = 0; i < state.todos.length; i++)
          {
            if(state.todos[i].done){
              state.deadlines[i] = 100;
            }else{
              state.deadlines[i] = parseInt(state.todos[i].deadline, 10);
            }
          }                 
      },     
      deleteDeadline(state, index){
        state.deadlines.splice(index,1)
      },
      sortTodos(state){
        state.todos.sort(function(a, b) {
          if (a.deadline < b.deadline) {
            return -1;
          }
          if (a.deadline > b.deadline) {
            return 1;
          }
          return 0;
        });
      }
  }
})
export default store;