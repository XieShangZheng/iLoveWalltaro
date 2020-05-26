import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { Provider } from 'react-redux'

import configStore from './store'

import './app.scss'

const store = configStore()

class App extends Component {
  componentDidMount () {
    const WeAppEnv = Taro.getEnv() === Taro.ENV_TYPE.WEAPP

    if (WeAppEnv) {
      Taro.cloud.init({ env: 'prod-c0yn7' })
    }
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
