import React, {Component} from 'react';

class TaskForm extends Component {
  constructor(props){
    super(props);
    this.state ={
      id: '',
      name: '',
      status: false
    }
  }
  // sữ dung lifecycle: componentWillMount chỉ sử dụng dc khi form đóng
  componentWillMount(){
    // khi truyền taskEditing có thuộc tính Id nên tạo thêm id: '';
    if(this.props.task){
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status,
      })
      console.log(this.state);
    }
  }
  // lifecycle này có thể mở hoặc đóng để chỉnh sửa giá trị trong input. ví dụ khi mở thểm form thêm sản phẩm bấm vào nút sửa thi lấy giá trị cái cần sửa
  componentWillReceiveProps(nextProps){
    // console.log(nextProps);
    if(nextProps && nextProps.task){
      this.setState({
        id: nextProps.task.id,
        name: nextProps.task.name,
        status: nextProps.task.status
      });
    }else if (!nextProps.task) {
      // console.log('sửa -> thêm');
      this.setState({
        id: '',
        name: '',
        status: false
      })
    }
  }
  onCloseForm = () => {
    this.props.onCloseForm();
  }
  onChange = (event) => {
     var target = event.target;
     var name = target.name;
     var value = target.value;
     if(name === 'status'){
       value = target.value === 'true' ? true : false;
     }
     this.setState({
       [name]: value
     });
  }
  onSubmit = (event) =>{
    event.preventDefault();
      // this.props.onSubmit(this.state.name, this.state.status === 'true' ? true : false)
      this.props.onSubmit(this.state);
      //Cancel && Close form
      this.onClear();
      this.onCloseForm();
  }
  onClear = () =>{
    this.setState({
      name:'',
      status: false,
    })
  }
    render(){
      var { id } = this.state;
        return(
            <div className="panel panel-warning">
            <div className="panel-heading">
                <h3 className="panel-title">{id != '' ? 'Cập Nhật Công Việc' : 'Thêm Công Việc'}
                  <span onClick={this.onCloseForm}>X</span>
                </h3>
            </div>
            <div className="panel-body">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Tên :</label>
                        <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange}/>
                    </div>
                    <label>Trạng Thái :</label>
                    <select className="form-control" required="required" name="status" value={this.state.status} onChange={this.onChange}>
                        <option value={true}>Kích Hoạt</option>
                        <option value={false}>Ẩn</option>
                    </select>
                    <br/>
                    <div className="text-center">
                        <button type="submit" className="btn btn-warning">{id !='' ? 'Cập Nhật' : 'Thêm'}</button>&nbsp;
                        <button type="submit" className="btn btn-danger" onClick={this.onClear}>Hủy Bỏ</button>
                    </div>
                </form>
            </div>
        </div>
        )
    }
}
export default TaskForm;
