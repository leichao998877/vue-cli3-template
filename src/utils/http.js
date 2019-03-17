/**
 * author leichao
 */
import axios from 'axios'
let isProduction = process.env.NODE_ENV === 'production'
let BASE_API = isProduction ? process.env.VUE_APP_PRODUCTMENT_BASE_API : process.env.VUE_APP_PRODUCTMENT_BASE_API
let handleUrl = url => {
  url = url.startsWith('/') ? url : ('/' + url)
  return url.indexOf('http') > 0 ? url : (BASE_API + url)
}
let handleLoginUrl = url => {
  url = url.startsWith('/') ? url : ('/' + url)
  return url.indexOf('http') > 0 ? url : (process.env.VUE_APP_DEVELOPMENT_LOGIN_BASE_API + url)
}
// let token = sessionStorage.getItem('token')
let handleDataParams = data => {
  return data
}
// let dictionaryConversion = [
//   'status'
// ]
let handleErrorResult = (error) => {
  console.log('error:')
  console.log(error.message || error.errorMsg)
}
let handleSuccessResult = (res, successCallback, failCallback) => {
  res = res.data
  let result = {
    success: res.success,
    message: res.message || res.errorMsg || res.errorMessage,
    statusCode: res.statusCode, // 有可能成功需要根据状态码来判断
    data: { // data字段是后台必须返回的格式
      total: 0,
      list: []
    }
  }
  if (res.success) {
    // 一般后台返回的数据格式有分页类型的和不分页类型的,我们与后台协商是否包含list字段判断是否是分页
    if (res.data.list) { // 存在则是分页类型
      result.data.total = parseInt(res.data.total)
      // 针对移动端分页数据字典转换处理
      result.data.list = res.data.list.map(item => {
        return item
      })
    } else {
      result.data = res.data
    }
    successCallback(result)
  } else {
    // 处理token过期或者无效的情况下，与后端协商好数据格式
    if (res.statusCode === '503') {
      console.log('token过期')
      context.$router.push('/Login')
      sessionStorage.clear()
      localStorage.clear()
      return
    } else {
      result.data = res.data
      if (failCallback) {
        failCallback(result)
      } else {
        handleErrorResult(result)
      }
    }
  }

  return result
}
const TIME_OUT_MS = 60 * 1000 // 默认请求超时时间
let context
export default {
  // 初始化上下文
  initContext (vue) {
    context = vue
  },
  /**
   *
   * @param url 必填
   * @param data data参数必须是一个对象形式的哈
   * @param successCallback 成功时的回调函数 必填
   * @param failCallback 失败时的回调函数
   */
  loginPost (url, data, successCallback, failCallback) {
    axios({
      method: 'post',
      url: handleLoginUrl(url),
      timeout: TIME_OUT_MS,
      headers: {
        // 'Access-Token': accessToken,
        'Content-Type': 'application/json; charset=UTF-8'
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      data
    }).then(res => {
      if (res.data.success) {
        successCallback(handleSuccessResult(res.data))
      } else {
        if (failCallback) {
          failCallback(res.data)
        } else {
          handleErrorResult(res.data)
        }
      }
    }).catch(error => {
      // 执行到这里一般是500或者请求超时 或successCallback有报错啥的 或者success: false
      if (failCallback) {
        failCallback(error)
      } else {
        handleErrorResult({
          message: '系统错误'
        })
      }
    })
  },
  post (url, data, successCallback, failCallback) {
    axios({
      method: 'post',
      url: handleUrl(url),
      timeout: TIME_OUT_MS,
      headers: {
        // token, 最好与后台协商好通过token来判断用户信息，这样的话，这样就不必多引入一个库
        // 表示的是请求体用何种方式进行编码，传输给后台
        'Content-Type': 'application/json; charset=UTF-8'
      },
      data: handleDataParams(data)
    }).then(res => {
      handleSuccessResult(res, successCallback, failCallback)
    }).catch(error => {
      // 执行到这里一般是500或者请求超时 或successCallback有报错啥的 或者success: false
      if (failCallback) {
        failCallback(error)
      } else {
        handleErrorResult({
          message: '系统错误'
        })
      }
    })
  },
  // 表单形式的post请求
  /**
   * 这里我简单解释下formPost提交方式： 其实他就是浏览器原生form，不设置 enctype 属性,就会以application/x-www-form-urlencoded 方式提交数据，这种方式提交，data参数键值对都会编码传输给后台
   */
  formPost (url, data, successCallback, failCallback) {
    axios({
      method: 'post',
      url: handleUrl(url),
      timeout: TIME_OUT_MS,
      headers: {
        // token, 最好与后台协商好通过token来判断用户信息，这样的话，这样就不必多引入一个库vue-cookies
        // 表示的是请求体用何种方式进行编码，传输给后台
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      data: handleDataParams(data)
    }).then(res => {
      handleSuccessResult(res, successCallback, failCallback)
    }).catch(error => {
      // 执行到这里一般是500或者请求超时 或successCallback有报错啥的 或者success: false
      if (failCallback) {
        failCallback(error)
      } else {
        handleErrorResult({
          message: '系统错误'
        })
      }
    })
  },

  /**
   * multipart/form-data 一般用来上传文件
   */
  formDataPost (url, data, successCallback, failCallback) {
    axios({
      method: 'post',
      url: handleUrl(url),
      timeout: 120 * 1000,
      headers: {
        // token, 最好与后台协商好通过token来判断用户信息，这样的话，这样就不必多引入一个库vue-cookies
        // 表示的是请求体用何种方式进行编码，传输给后台
        'Content-Type': 'multipart/form-data'
      },
      data: handleDataParams(data)
    }).then(res => {
      handleSuccessResult(res, successCallback, failCallback)
    }).catch(error => {
      // 执行到这里一般是500或者请求超时 或successCallback有报错啥的 或者success: false
      if (failCallback) {
        failCallback(error)
      } else {
        handleErrorResult({
          message: '系统错误'
        })
      }
    })
  },
  get (url, successCallback, failCallback) {
    axios({
      method: 'get',
      url: handleUrl(url),
      timeout: TIME_OUT_MS,
      headers: {
        // token, 最好与后台协商好通过token来判断用户信息，这样的话，这样就不必多引入一个库
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(res => {
      handleSuccessResult(res, successCallback, failCallback)
    }).catch(error => {
      // 执行到这里一般是500或者请求超时 或successCallback有报错啥的 或者success: false
      if (failCallback) {
        failCallback(error)
      } else {
        handleErrorResult({
          message: '系统错误'
        })
      }
    })
  },
  // 下载execl window.location.href 直接返回url打开也是一样的
  downloadFile (url, data, fileName) {
    axios({
      method: 'post',
      url: handleUrl(url),
      data: handleDataParams(data),
      timeout: TIME_OUT_MS,
      responseType: 'blob'
    }).then(
      (result) => {
        let suffix = '.xls'
        if (result.headers && result.headers['content-disposition'].indexOf('.zip') !== -1) {
          suffix = '.zip'
        }
        if (fileName.indexOf('.') === -1) {
          fileName += suffix
        }
        const excelBlob = result.data
        if ('msSaveOrOpenBlob' in navigator) {
          // Microsoft Edge and Microsoft Internet Explorer 10-11
          window.navigator.msSaveOrOpenBlob(excelBlob, fileName)
        } else {
          const elink = document.createElement('a') // 创建a标签
          elink.download = fileName
          elink.style.display = 'none'
          const blob = new Blob([excelBlob])
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          document.body.removeChild(elink)
        }
      }
    ).catch(
      () => {
        handleErrorResult({ message: '下载错误' })
      }
    )
  }
}
