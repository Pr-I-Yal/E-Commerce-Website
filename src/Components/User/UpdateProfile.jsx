import React, { useEffect, useState } from 'react'
import TextValidators from '../../Validators/TextValidators'

export default function UpdateProfile({ setSearchParams }) {
  let [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  })

  let [errorMessage, setErrorMessage] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  })

  let [show, setShow] = useState(false)

  function getInputData(e) {
    let { name, value } = e.target
    setData({ ...data, [name]: value })
    setErrorMessage({ ...errorMessage, [name]: TextValidators(e) })
  }

  async function postData(e) {
    e.preventDefault()
    let error = Object.values(errorMessage).find(x => x !== "")
    if (error)
      setShow(true)
    else {
      var response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`)
      response = await response.json()
      let item = response.find(x => x.id !== data.id && (x.username.toLocaleLowerCase() === data.username.toLocaleLowerCase() || x.email.toLocaleLowerCase() === data.email.toLocaleLowerCase()))
      if (item) {
        setShow(true)
        setErrorMessage({
          ...errorMessage,
          username: item.username.toLocaleLowerCase() === data.username.toLocaleLowerCase() ? "Username Already Taken" : "",
          email: item.email.toLocaleLowerCase() === data.email.toLocaleLowerCase() ? "Email Address Already Taken" : ""
        })
        return
      }

      //Remove Above Line In Case Of Real Backend
      var response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${data.id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ ...data })
      })
      response = await response.json()
      setSearchParams({ option: "Profile" })
    }
  }

  useEffect(() => {
    (async () => {
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()
      if (response) {
        setData({ ...data, ...response })
      }
      else {
        alert("Something Went Wrong!")
      }
    })()
  }, [])

  return (
    <form onSubmit={postData}>
      <div className="row">

        <div className="col-md-6 mb-3">
          <label>Name*</label>
          <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Full Name' className={`form-control
                                        ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
          {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
        </div>

        <div className="col-md-6 mb-3">
          <label>Phone Number*</label>
          <input type="text" name="phone" value={data.phone} onChange={getInputData} placeholder='Phone Number' className={`form-control
                                        ${show && errorMessage.phone ? 'border-danger' : 'border-primary'}`} />
          {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
        </div>

        <div className="col-md-6 mb-3">
          <label>Username*</label>
          <input type="text" name="username" value={data.username} onChange={getInputData} placeholder='Username' className={`form-control
                                        ${show && errorMessage.username ? 'border-danger' : 'border-primary'}`} />
          {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
        </div>

        <div className="col-md-6 mb-3">
          <label>Email Address*</label>
          <input type="text" name="email" value={data.email} onChange={getInputData} placeholder='Email Address' className={`form-control
                                       ${show && errorMessage.email ? 'border-danger' : 'border-primary'}`} />
          {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
        </div>

        <div className="col-12">
          <button type="submit" className='btn btn-primary w-100'>Update</button>
        </div>

      </div>
    </form>
  )

}