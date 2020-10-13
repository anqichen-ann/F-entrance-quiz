import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      studentList: '',
      groupList: [[], [], [], [], [], []],
    };
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
    const url = 'http://localhost:8080/group';
    fetch(url, { method: 'get' })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          groupList: data,
        });
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
            <table>
              <tr>
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
