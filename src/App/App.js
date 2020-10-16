import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    // TODO feedback: 不需要定义name为state
    // TODO feedback: groupList数据结构过于复杂，在后台组装好结构后，再返回到前台即可
    this.state = {
      name: '',
      studentList: '',
      groupList: [[], [], [], [], [], []],
    };
    // TODO feedback: fetch操作应该放在didMount中
    const url = 'http://localhost:8080/student';
    fetch(url, { method: 'get' })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          studentList: data,
        });
      });
  }

  handleGroup = () => {
    // TODO feedback: 建议把数据请求提取到单独的service
    const url = 'http://localhost:8080/group';
    fetch(url, { method: 'get' })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          groupList: data,
        });
        // TODO feedback: 当前的业务不建议把数据存储在sessionStorage中
        sessionStorage.setItem('groupList',JSON.stringify(data));
      })
      .catch((error) => console.log(error));
  };

  handleFocus = (event) => {
    event.target.placeholder = ''
  }

  handleChange = (event) => {
      this.setState({
        name:event.target.value
      })
  }

  handleEnter = (event) => {
    console.log(event)
    if(event.keyCode == 13){
      // TODO feedback: studentName为什么用string包裹呢，建议用解构取出name
      let formData = {
        'studentName': this.state.name
    }
    var opts = {
        method:"POST",
        body:JSON.stringify(formData),
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
            },
    }
    const url = 'http://localhost:8080/addStudent';
    const request = fetch(url,opts)
                .then(res=>{res.json()})
                .then(data=>{
                    this.setState({
                      studentList:data,
                    })
                })
                .catch(error=>console.log(error));
    }
  }

  render() {
    return (
      <div data-testid="app" className="App">
        <header className="header">
          <h2>分组列表</h2>
          <button onClick={this.handleGroup}>
            分组学员
          </button>
        </header>
        <main className="main">
          {JSON.parse(sessionStorage.getItem('groupList'))? JSON.parse(sessionStorage.getItem('groupList')).map((list, index) => (
              // TODO feedback: 不建议用table布局
              // TODO feedback: 两次list table重复
            <table>
              <tr>
                // TODO feedback:组名应该从后台返回
                <th>{index + 1} 组</th>
              </tr>
              <tr>
                <td>{list && list.map((item) => <p>{item}</p>)}</td>
              </tr>
            </table>
          )) :
          this.state.groupList.map((list, index) => (
            <table>
              <tr>
                <th>{index + 1} 组</th>
              </tr>
              <tr>
                <td>{list && list.map((item) => <p>{item}</p>)}</td>
              </tr>
            </table>
          ))}
        </main>
        <footer className="footer">
          <h2>学员列表</h2>
          {this.state.studentList[0] &&
            this.state.studentList.map((student, index) => (
              <p>
                {index + 1}.{student}
              </p>
            ))}
          <input type="text" placeholder="+添加学员" value={this.state.name} onKeyUp={this.handleEnter}
          onFocus={this.handleFocus} onChange={this.handleChange}/>
        </footer>
      </div>
    );
  }
}

export default App;
