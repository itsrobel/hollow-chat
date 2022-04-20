import './App.css';

import React, { Component } from "react";
import io from "socket.io-client";
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
		this.proxy = "http://192.168.1.201:5000";
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
		this.socket.on("message", (data) => {
			console.log(data)
			if (this._isMounted)
			{
				this.setState({
					chat: [...this.state.chat, { user:data.user, msg: data.msg }],
				})
			}
			// if (this._isMounted) {
			//   this.setState({
			//     chat: [...this.state.chat, { user:data.user, msg: data.msg }],
			//   });
			//   if (data.user.id === this.socket.id) {
			//     this.chatbox.scrollTo(0, this.chatbox.scrollHeight);
			//   }
			// }
		});
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
			user: "Guest",
			msg: this.state.msg,
		});
		if (this._isMounted) {
			this.setState({ msg: "" });
			this.setState({
					chat: [...this.state.chat, { user:this.user, msg: this.state.msg }],
				})
				this.chatbox.scrollTo(0, this.chatbox.scrollHeight);
		}

	}

	renderChat() {
		const { chat } = this.state;
		return chat.map(({ user, msg }, idx) => {
			if (user === this.user) {
				return <ChatLogs ifMe={true} msg={msg} user={user} key={idx} />;
			} else {
				return <ChatLogs ifMe={false} msg={msg} user={user} key={idx} />;
			}
		});
	}

	render() {
			return (
				<div className="App">
					<div
						className="container pt-10 m-10 border-pink border-2 border-solid"
					>
						<h1 className="text-3xl text-pink font-bold underline">
							Hollow!
		</h1>
						<div className="overflow-y-auto max-h-[32rem] h-[25rem]" ref={(c) => (this.chatbox = c)}>
							{this.renderChat()}
						</div>
						<form
							onSubmit={this.handleSubmit}
							className="flex flex-row mt-8 justify-between border-pink"
						>
							<input
								className="focus:ring-2 focus:ring-gray focus:outline-none border-blue border-2 border-solid appearance-none w-full text-md leading-2 text-purple bg-light-gray py-2 pl-10 ring-1" 
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
			<div className={`${this.props.ifMe ? "text-right text-cyan" : "text-left text-green"} m-2`}>
				<span className="badge badge-dark">
					<h6 className="m-0 text-info">{this.props.msg}</h6>
				</span>
			</div>
		);
	}
}


export default App;
