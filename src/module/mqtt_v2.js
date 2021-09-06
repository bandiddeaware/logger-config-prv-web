// doc paho : https://www.eclipse.org/paho/files/jsdoc/index.html

class PWAMqtt {
  constructor(MQTT, url, port) {
    this.isConnect = false
    this.isConnectLost = false
    this.MQTT = MQTT
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
        }})
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
  onUnsubscript (topic){
    this.client.unsubscribe(topic)
  }
  onConnectLost () {
    this.client.onConnectionLost = () => {
      console.log("Connect Lost")
      this.isConnectLost = true
    }
  }
  onMessageManual(topic, msg, Timeout) {

    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        resolve(false)
      }, Timeout * 1000);
      // onMessageDelivered
      this.client.onMessageArrived = (mes) => {
        var msg = JSON.parse(mes.payloadString)
        if (msg.manual !== undefined){
          clearTimeout(timeout)
          resolve(msg)
        }
      }
      this.onPublic(topic, msg)

    })
  }

  onMessageAuto(topic, msg, Timeout) {

    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        resolve(false)
      }, Timeout * 1000);
      // onMessageDelivered
      this.client.onMessageArrived = (mes) => {
        var msg = JSON.parse(mes.payloadString)
        if (msg.failure_mode !== undefined && msg.prv_config !== undefined){
          clearTimeout(timeout)
          resolve(msg)
        }
      }
      this.onPublic(topic, msg)

    })
  }


  onMessageDevice(topic, msg, Timeout) {

    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        resolve(false)
      }, Timeout * 1000);
      // onMessageDelivered
      this.client.onMessageArrived = (mes) => {
        var msg = JSON.parse(mes.payloadString)
        if (msg.dev !== undefined){
          clearTimeout(timeout)
          resolve(msg)
        }
      }
      this.onPublic(topic, msg)
    })
  }


  onMessageModbus(topic, msg, Timeout) {

    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        resolve(false)
      }, Timeout * 1000);
      // onMessageDelivered
      this.client.onMessageArrived = (mes) => {
        var msg = JSON.parse(mes.payloadString)
        if (msg.mbd !== undefined){
          clearTimeout(timeout)
          resolve(msg)
        }
      }
      this.onPublic(topic, msg)
    })
  }

  onPublic (topic, msg) {
    var message = new this.MQTT.Message(msg);
    message.destinationName = topic
    this.client.send(message);
  }
  onDisconnect() {
    this.client.disconnect()
    return new Promise((resolve, reject) => {

      setTimeout(() => {
        console.log("Client Disconnected")
        resolve(true)
      }, 2000);

    })
    
  }
}

export default PWAMqtt
