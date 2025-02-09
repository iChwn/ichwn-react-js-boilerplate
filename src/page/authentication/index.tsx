import { BaseButton, InputForm } from "components"
import { routeUrl } from "constant";
import _ from "lodash";
import { useState } from "react";
import { useNavigate } from "react-router";
import { setCookie } from "utility/helper/cookie";
import handleValidate from "utility/hooks/setupHooks/validationHook";
import * as yup from "yup";

const AuthPage = () => {
  const navigate = useNavigate()
  const [formToState, setFormToState] = useState([
    {
      title: "Name",
      placeholder: "e.g alexa andreas",
      type: "text",
      value: "test",
      name: "name",
      options: [],
      rules: yup.string().required("Name is required!"),
      error: ""
    }, 
    {
      title: "Email",
      placeholder: "e.g test@123.com",
      type: "text",
      value: "test@123.com",
      name: "email",
      options: [],
      rules: yup.string().email().required("Email is required!"),
      error: ""
    }, 
  ])

  const handleChangeField = (event) => {
    const cloneForms = _.cloneDeep(formToState)
    const eventName = event.target.name
    const eventValue = event.target.value
    let filteredForm = _.filter(cloneForms, (data) => data.name === eventName)[0]
    filteredForm.value = eventValue
      
    setFormToState(cloneForms)
  }

  const handleOnChange = (event) => {
    const targetType = event.target.type
    switch (targetType) {
      case "text":
      case "email":
        handleChangeField(event)
        break;
      default:
        break;
    }
  }

  const handleSubmit = () => {
    let cloneForms = _.cloneDeep(formToState)
    const handleResetError = () => {
      cloneForms = cloneForms.map(result => ({...result, error: ""}))
    }

    handleValidate(formToState)
    .then((result) => {
      if(result.status === 200) {
        handleResetError()
        setFormToState(cloneForms)
        navigate(routeUrl.home)
        console.log("SUBMIT")
        setCookie('auth', "user_token", 3)

      } else {
        const errorsObj = result.data
        handleResetError()
        Object.keys(errorsObj).forEach(error => {
          const filteredForm = _.filter(cloneForms, (data) => data.name === error)[0]
          filteredForm.error = errorsObj[error]

          setFormToState(cloneForms)
        })
      }
    })
  }
  
  return (
    <div className="p-5">
      <InputForm 
        formData={formToState}
        onChange={handleOnChange}
      />
      <div className="flex flex-row-reverse items-center gap-4 mt-3">
        <BaseButton title="Save" type="filled" onClick={handleSubmit} />
      </div>
    </div>
  )
}

export default AuthPage