import axios from 'axios'
import qs from 'qs'
import reqwest from 'reqwest'

const checkCode = ({ code, msg = '接口格式错误', data = true }) => {
    if (code !== 0) throw new Error(msg)
    return data
}

const http = async ({ checkFn = checkCode, defaultValue, ...options }) => {
    try {
        // jsonp 通过 reqwest 发送
        if (options.method === 'jsonp') {
            const data = await reqwest({
                type: 'jsonp',
                url: `${options.url}?${qs.stringify(options.data)}`
            })
            return checkFn(data)
        } 
        // get 请求通过params发送参数
        if (options.method === 'get' || !options.method) {
            options.params = options.data
            delete options.data
        } 
        const { data } = await axios(options)
        return checkFn(data)
    } catch (error) {
        return defaultValue
    }
}

export default http