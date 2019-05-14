import React, { Component } from 'react';

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      items: []
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  // 新增項目事件
  handleFormSubmit(e) {
    const { state: selfState } = this;
    e.preventDefault();
    // 判斷若存在則加入清單
    if (selfState.text && selfState.text.trim()) {
      this.setState((state) => ({
        items: state.items.concat(state.text),
        text: ''
      }));
    }
  }
  // 輸入欄位改變事件
  handleInputChange(e) {
    this.setState({
      text: e.target.value
    })
  }

  render() {
    return (
      <div>
        <div>
          <ul>
            {
              // 建立清單項目
              this.state.items.map((item, key) => (
                <li key={key}>
                  {item}
                </li>
              ))
            }
          </ul>
        </div>
        <div>
          <form onSubmit={this.handleFormSubmit}>
            <input type="text" value={this.state.text} onChange={this.handleInputChange} />
            <button>新增</button>
          </form>
        </div>
      </div>
    );
  }
}

export default TodoApp;