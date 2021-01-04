const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const process = require("process")
const cors = require('cors')

const dotenv = require("dotenv")
dotenv.config()

const routes = require('./routes');

/**
 * Server
 * @Class
 */
class Server {
  constructor () {
    this.app = express()
  }

  /**
   * Data base connect
   * @return {Object} connect
   */
  dbConnect () {
    const connect = mongoose.connect("mongodb://127.0.0.1:27017/blog", { useUnifiedTopology: true, useNewUrlParser: true, })
    const db = mongoose.connection;
    if (connect) {
        console.log("connected")
    }

    db.on('error', (err) => {
      setTimeout(() => {
        console.error(`[ERROR] api dbConnect() -> ${err}`)
        this.connect = this.dbConnect(host)
      }, 5000)
    })

    db.on('disconnected', () => {
      setTimeout(() => {
        console.log('[DISCONNECTED] api dbConnect() -> mongodb disconnected')
        this.connect = this.dbConnect(host)
      }, 5000)
    })

    process.on('SIGINT', () => {
      db.close(() => {
        console.log('[API END PROCESS] api dbConnect() -> close mongodb connection')
        process.exit(0)
      })
    })

    return connect
  }

  /**
   * Middleware
   */
  middleware () {
    this.app.use(cors())
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ 'extended': true }))
  }

  /**
   * Run
   */
  run () {
    try {
      this.connect = this.dbConnect()
      this.dbConnect()
      this.middleware()
      routes(this.app)
      this.app.listen(process.env.API_PORT || 8080)
      console.log("Listen in the port :"+ process.env.API_PORT || "8090")
    } catch (err) {
      console.log(`[ERROR] Server -> ${err}`)
    }
  }
}

module.exports = Server