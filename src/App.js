import './App.css';

import React, { Component } from "react";
import io from "socket.io-client";
import axios from "axios";
// import ChatLogs from "./chatLogs";
class App extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      chat: [],
      id: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.proxy = "http://0.0.0.0:5000";
    this.socket = io.connect(this.proxy, {withCredentials: true,transports : ['websocket' , 'polling', 'flashsocket'] ,
    Headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",

    }
  
  });
    this.user = "Guest";
  }
  componentDidMount() {
    this._isMounted = true;
    // this.socket.on("message", (data) => {
    //   if (this._isMounted) {
    //     this.setState({
    //       chat: [...this.state.chat, { user:data.user, msg: data.msg }],
    //     });
    //     if (data.user.id === this.socket.id) {
    //       this.chatbox.scrollTo(0, this.chatbox.scrollHeight);
    //     }
    //   }
    // });
  }
  componentDidUpdate() {
    // if (this.props.id !== this.state.id) {
    //   this.socket.emit("connect_to", { socket: this.props.id });
    //   this.setState({ id: this.props.id });
    // }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  onTextChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.msg);
    this.socket.emit("message", {
      user: { username: "Guest", id: this.socket.id },
      msg: this.state.msg,
    });
    // if (this._isMounted) {
    //   this.setState({ msg: "" });
    // }
  }

  renderChat() {
    const { chat } = this.state;
    return chat.map(({ user, msg }, idx) => {
      if (user.id === this.socket.id) {
        return <ChatLogs ifMe={true} msg={msg} user={user.username} key={idx} />;
      } else {
        return <ChatLogs ifMe={false} msg={msg} user={user.username} key={idx} />;
      }
    });
  }

  render() {
      return (
        <div className="App">
          <div
            className="container mx-auto pt-10 m-10 border-pink border-2 border-solid"
          >
            <h1 className="text-3xl text-pink font-bold underline">
              Hollow!
    </h1>
            <div className="chatbox" ref={(c) => (this.chatbox = c)}>
              {this.renderChat()}
              <div className="space-y-4">
  <div className="w-96 bg-blue shadow rounded">
      w-96
  </div>
  <div className="w-80 bg-blue shadow rounded">
      w-80
  </div>
  <div className="w-72 bg-blue shadow rounded">
      w-72
  </div>
  <div className="w-64 bg-blue shadow rounded">
      w-64
  </div>
  <div className="w-60 bg-blue shadow rounded">
      w-60
  </div>
  <div className="w-56 bg-blue shadow rounded">
      w-56
  </div>
  <div className="w-52 bg-blue shadow rounded">
      w-52
  </div>
  <div className="w-48 bg-blue shadow rounded">
      w-48
  </div>
</div>
            </div>
            <form
              onSubmit={this.handleSubmit}
              className="flex flex-row mt-8 justify-between border-pink"
            >
              <input
                className="focus:ring-2 focus:ring-gray focus:outline-none border-green border-2 border-solid appearance-none w-full text-md leading-2 text-purple bg-light-gray py-2 pl-10 ring-1" 
                // className="form-control"
                onChange={(e) => this.onTextChange(e)}
                value={this.state.msg}
                name="msg"
                placeholder="Talk To Leo!"
                type="text"
              />
              <div className="input-group-prepend">
                <button className="btn text-pink bg-gray  hover:text-cyan w-full text-md  p-2 mr-10 pr-3 " type="submit">
                  Send
                </button>
              </div>
            </form>
            <div 
            className="absolute inset-x-0 bottom-10 h-16 text-pink">08
            
            
            
            
            </div>
          </div>
        </div>
      );
  }
}
class ChatLogs extends Component {
  render() {
    return (
      <div className={`${this.props.ifMe ? "text-left" : "text-right"} m-2`}>
        <span className="badge badge-dark">
          <h6 className="m-0 text-info">{this.props.msg}</h6>
        </span>
      </div>
    );
  }
}


export default App;
