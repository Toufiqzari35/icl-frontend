import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL

const startAuction = () => {
  axios.post(BASE_URL + '/api/v1/auction/start').then((res) => {
    console.log('------auction-started----------')
    console.log('store', res.data.data)
  })
}

const pauseAuction = () => {
  axios.get(BASE_URL + '/api/v1/auction/pause').then((res) => {
    console.log('-------auction-paused---------')
  })
}

export { startAuction, pauseAuction }
