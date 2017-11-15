import {Config} from '../help/config';
import axios from "axios";

export function get(url,params) {
    return axios({
        method:'GET',
        url:url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data:params,

    })
}
export function post(url,params){

    return axios({
        method:'POST',
        url:url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data:params,

    })
}
