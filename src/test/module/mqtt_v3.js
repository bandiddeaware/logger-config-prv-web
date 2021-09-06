// doc paho : https://www.eclipse.org/paho/files/jsdoc/index.html

import MQTT from 'paho-mqtt'

class PWAMqtt {

  constructor(host, port, client_id, username, password) {
    this.isConnect = false
    this.isConnectLost = false
    this.host = host
    this.port = port
    this.client_id = client_id
    this.username = username
    this.password = password
    this.client = null
  }
  Connection () {
    this.client = new MQTT.Client(this.host, Number(this.port), this.client_id + Math.random().toString().slice(2,10));

    return new Promise( (resolve, reject) => {
      try {
        this.client.connect({onSuccess: () => {
          this.isConnect = true
          console.log("Client Connected")
          resolve({
            result: true,
            message: "Connected to Broker"
          })
        }})
      }catch (e) {
        console.log(e)
        reject({
          result: false,
          message: e
        })
      }
    })
  }

  Disconnect () {
    return new Promise( (resolve, reject) => {
      try {
        this.client.disconnect()
        resolve({
          result: true,
          message: "Disconnected from Broker"
        })
      }catch (e) {
        console.log(e)
        reject({
          result: false,
          message: e
        })
      }
    })
  }

  // async SaveConfigLogger (remote_name, config, modbus, Timeout) {


  //   return new Promise( async (resolve, reject) => {
  //     // connection mqtt and check status
  //     const connection = await this.Connection()
  //     if (connection.result === false){
  //       return connection
  //     }
  //     // set topic
  //     const topic_config = `logger/${remote_name}/device/config/set`
  //     const topic_modbus = `logger/${remote_name}/modbus/config/set`
  //     // ----- set timeout ------
  //     const timeout = setTimeout(() => {
  //       resolve(false)
  //     }, Timeout * 1000);
  //     // ----- pipe message ------
  //     this.client.onMessageArrived = async (mes) => {
  //       var msg = JSON.parse(mes.payloadString)
  //       if (msg.dev !== undefined){
  //         clearTimeout(timeout)
  //         const disconnection = await this.Disconnect()
  //         resolve(msg)
  //       }
  //     }
  //     // ----- send message ------
  //     this.onPublic(topic, msg)
  //   })
  // }

  async test () {
    const connection = await this.Connection()
    
    // It client work.
    // =================================================
    
    // =================================================

    const disconnection = await this.Disconnect()
    return {
      connection: connection,
      disconnection: disconnection
    }
  }

}

export default PWAMqtt
