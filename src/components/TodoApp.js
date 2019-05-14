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
    this.handleItemDelete = this.handleItemDelete.bind(this);
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
  // 項目刪除
  handleItemDelete(index) {
    const newItems = [...this.state.items];
    newItems.splice(index, 1);
    this.setState({
      items: newItems
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
                <LiElm value={item} key={key} index={key} onItemDelete={this.handleItemDelete} />
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
/**
 * 返回清單項目
 * @param {Object} props
 * @param {Number} props.index
 * @param {String} props.value
 * @param {Callback} props.onItemDelete
 * @returns {Element} 
 */
function LiElm(props) {
  const { value, index, onItemDelete } = props;
  const handleClick = onItemDelete.bind(this, index);
  return (
    <li onClick={handleClick}>
      {value}
    </li>
  );
}

export default TodoApp;