import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Grid } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  }
});

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
    const { classes } = this.props;
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12} md={12}>
          <List>
            {
              // 建立清單項目
              this.state.items.map((item, key) => (
                <LiElm value={item} key={key} index={key} onItemDelete={this.handleItemDelete} />
              ))
            }
          </List>
        </Grid>
        <Grid item xs={12} md={12}>
          <form onSubmit={this.handleFormSubmit}>
            <input type="text" value={this.state.text} onChange={this.handleInputChange} />
            <button>新增</button>
          </form>
        </Grid>
      </Grid>
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
    <ListItem>
      <ListItemText
        primary={value}
      />
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete" onClick={handleClick}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default withStyles(styles)(TodoApp);