import './App.css'
import { useState } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [number, setNumber] = useState()

  const submitHandler = (e) => {
    e.preventDefault()

    const paymentObject = {
      schemaVersion: '1.0',
      requestId: uuidv4(),
      timestamp: Date.now(),
      channelName: 'WEB',
      serviceName: 'API_PURCHASE',

      serviceParams: {
        merchantUid: process.env.REACT_APP_MERCHANT_U_ID,
        apiUserId: process.env.REACT_APP_API_USER_ID,
        apiKey: process.env.REACT_APP_API_KEY,
        paymentMethod: 'mwallet_account',

        payerInfo: {
          accountNo: `252${number}`,
        },

        transactionInfo: {
          referenceId: uuidv4(),
          invoiceId: uuidv4().slice(0, 5),
          amount: 0.01,
          currency: 'USD',
          description: 'test payment',
        },
      },
    }

    const payMoney = async () => {
      const { data } = await axios.post(
        'https://api.waafi.com/asm',
        paymentObject
      )

      console.log(data)
    }

    payMoney()
  }

  return (
    <div className='container'>
      <div className='row d-flex justify-content-center align-items-center vh-100'>
        <div className='col-8 max-auto bg-secondary p-5 text-center'>
          <form onSubmit={(e) => submitHandler(e)}>
            <h1 className='btn btn-warning'>$20</h1>
            <input
              onChange={(e) => setNumber(e.target.value)}
              value={number}
              required
              type='number'
              className='form-control'
            />
            <button className='btn btn-light float-end mt-3'>Pay Now</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
