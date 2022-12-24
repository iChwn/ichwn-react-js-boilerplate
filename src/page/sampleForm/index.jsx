import { BaseButton, InputForm } from "components"
import _ from "lodash";
import { useState } from "react";
import handleValidate from "utility/hooks/setupHooks/validationHook";
import * as yup from "yup";

const SampleForm = () => {
  const [formToState, setFormToState] = useState([
    {
      title: "Sample ID",
      placeholder: "Select",
      type: "select",
      value: "",
      name: "sample_id",
      options: [
        {
          label: "1",
          value: 1
        },
        {
          label: "2",
          value: 2
        }
      ],
      rules: yup.object().required("Company ID is required!").nullable(),
      error: ""
    },
    {
      title: "Sample Type",
      placeholder: "e.g PPEE000",
      type: "text",
      value: "",
      name: "employee_expense_type",
      options: [],
      rules: yup.string().required("Sample Type is required!"),
      error: ""
    }, 
    {
      title: "Description",
      placeholder: "e.g Description",
      type: "text",
      value: "",
      name: "description",
      rules: yup.string().required("Description is required!"),
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

  const handleChangeSelect = (event) => {
    const cloneForms = _.cloneDeep(formToState)
    const eventName = event.target.name
    let filteredForm = _.filter(cloneForms, (data) => data.name === eventName)[0]
    filteredForm.value = event
    
    console.log(filteredForm)
    
    setFormToState(cloneForms)
  }

  const handleOnChange = (event) => {
    const targetType = event.target.type
    switch (targetType) {
      case "text":
      case "number":
      case "date-year":
        handleChangeField(event)
        break;
      case "select":
        handleChangeSelect(event)
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
        console.log("SUBMIT")
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
      <h1>Sample Form</h1>
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

export default SampleForm