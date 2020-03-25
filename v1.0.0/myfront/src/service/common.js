import http from '../util/http.js'

export const getUser = async (data) => await http({
    method: 'get',
    url: '/getUser',
    data: data
});