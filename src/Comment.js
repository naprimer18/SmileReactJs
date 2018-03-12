import React, { Component } from 'react';
import './Comment.css';

var arrey=[];


class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [], text: '',names:[],name:"" ,flag:false};
      }
      render() {
        return (
          <div className="name_2">
            <List items={this.state.items} />
            <form>
              <input placeholder="Ваше имя" onChange={this.Change_name.bind(this)} value={this.state.name}/>
              <input placeholder="что произошло ? " onChange={this.handleChange.bind(this)} value={this.state.text}/>
              <button onClick={this.handleSubmit.bind(this)}>
                ОТПРАВИТЬ
              </button>
            </form>
            <button onClick={this.authorize_name.bind(this)}>
              Авторизировать имя
            </button>
          </div>
              );
      }
      authorize_name()
      {
        alert(this.state.name + " авторизация прошла успешно ");
        this.setState({flag:!this.state.flag })

      }
      Change_name(e) {
        this.setState({name:e.target.value})
        console.log(this.state.name);
      }

      handleChange(e) {
        this.setState({text: e.target.value });
      }

      handleSubmit(e) {
        e.preventDefault();
        if (!this.state.text) {
          return;
        }

        if (!this.state.name || this.state.flag == false) {
          return;
        }

        const newItem = {
          text: this.state.text,
          name: this.state.name
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
            <h3>Расскажите друзьям </h3>
            {this.props.items.map(item => (
              <h1> {item.name} : {item.text} </h1>
            ))}
          </div>
        );
  }
}

export default Comment;
