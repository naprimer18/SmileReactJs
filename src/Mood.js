import React, { Component } from 'react';
import './bad.css';
import './good.css';

var isCountingStarted = 0;
var isCountingGood = 1;
var sumGood = 0;
var sumBad = 0;
var beginTimeGood = 0;
var beginTimeBad = 0;

export default class Mood extends React.Component {  // Теперь не надо нажимать 2 раза на смыйлы чтобы отключить их , надо просто включить какой тебе надо и все на автомате произойдет.
  constructor (props) {                              // с Обработкой времени еще поработаю (переделаю в простую функцию )
   super(props);
   this.state = {flagGood: "false", displayTimeGoodNew: " "};
   this.state = {flagBad: "false", displayTimeBadNew: " "};
   this.state = {ChekTimeGoodBad: "false"};
   this.timeGood = this.timeGood.bind(this);
   this.timeBad = this.timeBad.bind(this);
   this.summa = this.summa.bind(this);
  }

  timeInSeconds(currentTime) {     // получение времени в секундах чтобы точно отнять
   var arr = [];
   arr[0] = currentTime.getHours();
   arr[1] = currentTime.getMinutes();
   arr[2] = currentTime.getSeconds();
   return ((arr[0] * 3600) + (arr[1] * 60) + arr[2]);
   }

   secondsToTime(timeInSeconds) {               // перевод секунд в H,M,S
   var h = timeInSeconds / 3600 ^ 0;
   var m = (timeInSeconds - h * 3600) / 60 ^ 0 ;
   var s = timeInSeconds - h * 3600 - m * 60;
   var str = (h<10?"0"+h:h)+" ч. "+(m<10?"0"+m:m)+" мин. "+(s<10?"0"+s:s)+" сек.";
   return str;
   }

   timeGood () {                                           // проверка хорошего настроения
    if (isCountingGood === 0 || isCountingStarted === 0) {
      var currentTime = new Date();
      beginTimeGood = this.timeInSeconds(currentTime);

      if (isCountingStarted !== 0) {
        sumBad += (beginTimeGood - beginTimeBad);
        this.setState({ flagBad: !this.state.flagBad });
      } else isCountingStarted = 1;
      isCountingGood = 1;
      this.setState({ flagGood: !this.state.flagGood });
    }
   }

   timeBad () {                                      // проверка плохого настроения
    if (isCountingGood === 1) {
      var currentTime = new Date();
      beginTimeBad = this.timeInSeconds(currentTime);
      if (isCountingStarted !== 0) {
        sumGood += (beginTimeBad - beginTimeGood);
        this.setState({ flagGood: !this.state.flagGood });
      } else isCountingStarted = 1;
      isCountingGood = 0;
      this.setState({ flagBad: !this.state.flagBad });
    }
   }

   summa() {                                                      // подсчет времени
     var currentTime = new Date();
     if (isCountingStarted == 1) {
       if (isCountingGood == 0) {
         sumBad += this.timeInSeconds(currentTime) - beginTimeBad;
         beginTimeBad = this.timeInSeconds(currentTime);
       }

       if (isCountingGood == 1) {
         sumGood += this.timeInSeconds(currentTime) - beginTimeGood;
         beginTimeGood = this.timeInSeconds(currentTime);
       }
      }
        this.setState({displayTimeGoodNew:this.secondsToTime(sumGood)});
        this.setState({displayTimeBadNew:this.secondsToTime(sumBad)});
        this.setState({ChekTimeGoodBad:!this.state.ChekTimeGoodBad});
   }

   displaySmileGood () {
     var  dropdownTextGood;
     if (this.state.flagGood) {
       dropdownTextGood = <div><img  width="100%" height="100%" src="http://forumsmile.ru/u/4/1/4/414355f36ebf65fe3eee4289abd3f336.gif" /></div>;
       return dropdownTextGood;
       }
   }
   displaySmileBad () {
     var  dropdownTextBad;
     if (this.state.flagBad) {
       dropdownTextBad = <div><img  width="100%" height="100%" src="https://avatars.mds.yandex.net/get-pdb/25978/5c1493a0-caff-45a9-82ee-8351e8b10eb8/s800" /></div>;
       return dropdownTextBad;
     }
   }
   displayTime () {
     let TimeSmile;
     return TimeSmile = <h1> "хорошее:  "  {this.state.displayTimeGoodNew}  <br></br>  "Плохое:  " {this.state.displayTimeBadNew} </h1>;
   }
   componentDidMount() {
         setInterval(() => this.summa(), 1000);
       }
	render () {
		return(
			<div>
        <div className="comp1" onClick = {this.timeGood}>
            <h1> Good </h1>
            {this.displaySmileGood()}
        </div>
        <div className="comp2" onClick = {this.timeBad}>
            <h1> Bad </h1>
            {this.displaySmileBad()}
        </div>
        <div className="comp2" onClick = {this.summa}>
            <h1> check_time </h1>
            {this.displayTime()}
        </div>
			</div>);
	}
}
