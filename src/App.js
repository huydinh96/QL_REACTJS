import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TaskForm from './component/TaskForm';
import Control from './component/Control';
import TaskList from './component/TaskList';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks:[], // id: unique. name . status
            isDisplayForm: false, // mặc định là ẩn form
            taskEditing: null,
            fillter: {
              name: '',
              status: -1,
            }
        }
    }
    // no se dc goi gi component dc gan vao. khi reload trang
    componentWillMount() {
        if(localStorage && localStorage.getItem('tasks')){
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
              tasks: tasks
            });
        }
    }
    // onGeneraterData = () => {
    //     var tasks = [
    //         {
    //             id: this.generateID(),
    //             name: 'San pham 1',
    //             status: false
    //         },
    //         {
    //             id:this.generateID(),
    //             name: 'San pham 2',
    //             status: true
    //         },
    //         {
    //             id:this.generateID(),
    //             name: 'San pham 3',
    //             status: true
    //         }
    //     ];
    //     this.setState({
    //         tasks: tasks
    //     });
    //     //JSon chuyen ve dang string
    //     localStorage.setItem('tasks',JSON.stringify(tasks));
    // }
    //random chuoi
    s4(){
        return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
    }
    generateID(){
        return this.s4() + '-' + this.s4();
    }

    onToggleForm = () => {
      if(this.state.isDisplayForm && this.state.taskEditing !== null){
        this.setState ({
          isDisplayForm : true,
          // xóa item của tk edit
          // trường hợp kiểm tra thêm task
          taskEditing: null,
        });
      }else {
        this.setState ({
          isDisplayForm : !this.state.isDisplayForm,
          // xóa item của tk edit
          // trường hợp kiểm tra thêm task
          taskEditing: null,
        });
      }
    }
    onCloseForm = () =>{
      this.setState ({
          isDisplayForm : false
      });
    }
    onShowForm = () =>{
      this.setState ({
          isDisplayForm : true
      });
    }
    onSubmit = (data) => {
      // console.log(data);
      // var task = {
      //   id: this.generateID(),
      //   name: data.name,
      //   status:
      // }
      var {tasks} = this.state;
      if(data.id ===''){
        data.id = this.generateID();
        tasks.push(data);
      }else {
        //Editing
        var index = this.findIndex(data.id);
        tasks[index] = data;
      }
      this.setState({
        tasks: tasks,
        taskEditing: null,
      });
      localStorage.setItem('tasks',JSON.stringify(tasks));

    }
    onUpdateStatus = (id) =>{
      // console.log(id);
      var {tasks} = this.state;
      var index = this.findIndex(id);
      console.log(index);
      if(index !== -1){
        tasks[index].status = !tasks[index].status;
        this.setState({
          tasks: tasks
        });
        localStorage.setItem('tasks',JSON.stringify(tasks));
      }
    }
    findIndex(id){
      var {tasks} = this.state;
      var result = -1;
      tasks.forEach((task,index)=>{
        if(task.id === id){
          result = index;
        }
      });
      return result;
    }
    onDelete =(id)=>{
      var {tasks} = this.state;
      var index = this.findIndex(id);
      console.log(index);
      if(index !== -1){
        tasks.splice(index,1)
        this.setState({
          tasks: tasks
        });
        localStorage.setItem('tasks',JSON.stringify(tasks));
      }
    }
    onUpdate = (id) => {
      console.log(id);
      var {tasks} = this.state;
      var index = this.findIndex(id);
      var taskEditing = tasks[index];
      this.setState({
        taskEditing: taskEditing
      });
      this.onShowForm();
    }
    onFiller = (fillterName,fillterStatus) => {
      // console.log(fillterName ,'-',fillterStatus);
      // kiểm tra kiểu dữ liệu
      // console.log(typeof fillerStatus);
      fillterStatus = parseInt(fillterStatus,10);
      this.setState({
        fillter:{
          name: fillterName.toLowerCase(),
          name: fillterStatus
        }
      })
    }
  render() {
      var {tasks, isDisplayForm, taskEditing, fillter} = this.state; // var tasks = this.state.tasks
      console.log(fillter);
      // if(fillter){
      //   if(fillter.name){
      //     tasks = tasks.fillter((task)=>{
      //       // chuyển đổi thành kí tự thường sau đó gọi hàm indexOf coi có chứa fillter.name không sau đó cho bằng khác -1:
      //       return task.name.toLowerCase().indexOf(fillter.name) !== -1;
      //     })
      //   }
      // }
      var elemTaskForm = isDisplayForm ?
          <TaskForm
            onCloseForm ={this.onCloseForm}
            onSubmit={this.onSubmit}
            task = {taskEditing}
          />
          : '';
    return (
      <div className="container">
        <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr/>
        </div>
        <div className="row">
            <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
              {elemTaskForm}
            </div>
            <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick = {this.onToggleForm}
                  >
                    <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                </button>
                <button type="button" className="btn btn-danger" onClick={this.onGeneraterData}>
                    <span className="fa fa-plus mr-5"></span>Generate Data
                </button>
                <Control/>
                <TaskList
                  tasks ={tasks}
                  onUpdateStatus={this.onUpdateStatus}
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                  onFillter ={this.onFillter}
                />
            </div>
        </div>
    </div>
    );
  }
}

export default App;
