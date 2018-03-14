import React, { Component } from 'react';
import './Comment.css';

var arrey=[];

export default class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [] };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.delTime = this.delTime.bind(this)
      }
      render() {
        return (
          <div className="name_2">
            <List items={this.state.items} />
            <form>
              <button onClick={this.handleSubmit}>
                Записать
              </button>
              <button onClick={this.delTime.bind(this)}>
                удалить
              </button>
            </form>
          </div>);
      }

      delTime()
      {
        this.setState({items: []});
      }

      handleSubmit(e) {

        const newItem = {
          text: this.props.good,
          name: this.props.bad
        };

        this.setState(prevState => ({
          items: prevState.items.concat(newItem),
          text: ''
        }));
      }
    }

class List extends React.Component {
  render() {
    return (
          <div className="name_2">
            <h3> Зафиксировать время  </h3>
            {this.props.items.map(item => (
              <h1>Плохого {item.name} <br></br> Хорошего {item.text} </h1>
            ))}
          </div>
        );
  }
}
