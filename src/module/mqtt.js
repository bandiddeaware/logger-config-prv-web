class PWAMqtt {
  constructor(MQTT, url, port, userName, password) {
    this.isConnect = false
    this.isConnectLost = false
    this.MQTT = MQTT
    this.userName = userName
    this.password = password
    this.client = new MQTT.Client(url, port, "__LOGGER_WEB_CONFIG_MANAGER__" + Math.random().toString().slice(2,10));
  }
  onConnect () {
    this.onConnectLost()
    return new Promise( (resolve) => {
      try {
        this.client.connect({onSuccess: () => {
          this.isConnect = true
          console.log("Client Connected")
          resolve(true)
        }, keepAliveInterval : 10, reconnect : true,userName: this.userName, password : this.password })
      }catch (e) {
        console.log(e)
      }
    })
  }
  onConnectionLost () {
    return new Promise((resolve, reject) => {
      this.client.onConnectionLost = (responseObject) => {
        if (responseObject.errorCode !== 0) {
          resolve(true)
        }else {
          reject(false)
        }
      }
    })
  }
  onSubscript (topic){
    this.client.subscribe(topic);
  }
  onConnectLost () {
    this.client.onConnectionLost = () => {
      console.log("Connect Lost")
      this.isConnectLost = true
    }
  }
  onMessage (cb) {
    this.client.onMessageArrived = cb
  }
  onPublic (topic, msg) {
    var message = new this.MQTT.Message(msg);
    message.destinationName = topic
    this.client.send(message);
  }
  onDisconnect() {
    console.log("Client Disconnected")
    this.client.disconnect()
  }
}

export default PWAMqtt
