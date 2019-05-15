import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Grid, CssBaseline, Paper, Button, TextField } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    height: 500
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    height: '100%'
  },
  flex1: {
    flex: 1
  },
  listCtn: {
    overflowY: 'hidden',
    flex: 1
  },
  list: {
    overflowY: 'auto',
    height: '100%',
    width: '100%'
  },
  textField: {
    marginBottom: theme.spacing.unit
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
        // 最新一筆項目顯示在最上面
        items: [state.text, ...state.items],
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
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.flex1}>
            <Grid container className={classes.listCtn}>
              <List className={classes.list}>
                {
                  // 建立清單項目
                  this.state.items.map((item, key) => (
                    <LiElm value={item} key={key} index={key} onItemDelete={this.handleItemDelete} />
                  ))
                }
              </List>
            </Grid>
            {/* flex 項目需要搭配 container 使用 */}
            <Grid container alignItems="flex-end">
              <form onSubmit={this.handleFormSubmit} className={classes.flex1}>
                {/* FIXME: 文字過多超出容器問題(https://github.com/material-components/material-components-web/issues/1912) */}
                <TextField
                  required
                  label="新增項目"
                  fullWidth
                  variant="outlined"
                  value={this.state.text}
                  onChange={this.handleInputChange}
                  className={classes.textField}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >新增</Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </main>
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