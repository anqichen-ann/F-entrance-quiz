import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentList: [
        '成吉思汗',
        '鲁班七号',
        '太乙真人',
        '钟无艳',
        '花木兰',
        '雅典娜',
        '芈月',
        '白起',
        '刘禅',
        '庄周',
        '马超',
        '刘备',
        '哪吒',
        '大乔',
        '蔡文姬',
      ],
    };
  }

  render() {
    return (
      <div data-testid="app" className="App">
        <header className="header">
          <h2>分组列表</h2>
          <button type="button">分组学员</button>
        </header>
        <main className="main">
          <table className="table">
            <tr>
              <th>1 组</th>
            </tr>
            <tr>
              <td>
                <p>1.成吉思汗</p>
              </td>
            </tr>
          </table>
        </main>
        <footer className="footer">
          <h2>学员列表</h2>
          {this.state.studentList.map((student, index) => (
            <p>
              {index + 1}.{student}
            </p>
          ))}
          <input type="text" value="+添加学员" />
        </footer>
      </div>
    );
  }
}

export default App;
