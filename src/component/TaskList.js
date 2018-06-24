import React, {Component} from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {
  constructor(props){
    super(props);
    this.state = {
      fillterName : '',
      fillterStatus: -1, // all: -1 active: 1 deactive: 0
    }
  }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    // truyền giá trị ra ngoài App
    this.props.onFillter(name === 'fillterName' ? value : this.state.fillterName,
                        name === 'fillterStatus' ? value : this.state.fillterStatus);
    this.setState({
      [name]: value
    });
  }
    render(){
      var {tasks} = this.props;
      var {fillterName,fillterStatus} = this.state;
      var elemTask = tasks.map((task,index)=>{
        //task = {task} truyền giá trị task item this.props
        return <TaskItem
                key={task.id}
                index={index}
                task = {task}
                onUpdateStatus={this.props.onUpdateStatus}
                onDelete={this.props.onDelete}
                onUpdate={this.props.onUpdate}
                />
      })
        return(
            <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Tên</th>
                                <th className="text-center">Trạng Thái</th>
                                <th className="text-center">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <input type="text" className="form-control" name="fillerName" value={fillterName} onChange={this.onChange}/>
                                </td>
                                <td>
                                    <select className="form-control" name="fillerStatus" value={fillterStatus} onChange={this.onChange}>
                                        <option value="-1">Tất Cả</option>
                                        <option value="0">Ẩn</option>
                                        <option value="1">Kích Hoạt</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                            {elemTask}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default TaskList;
