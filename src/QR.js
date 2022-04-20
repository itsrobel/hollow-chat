import React, { Component } from "react";
import QRCode from "react-qr-code";

class QR extends Component {
    render() {
        return  (

       <div className="grid place-items-center h-screen">

        <QRCode value="http://192.168.1.201:3000" />
       </div> 
        )
    }
}
export default QR;