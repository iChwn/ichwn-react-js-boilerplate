type FormAlertType = {
  message: string
}

const FormAlert = ({message}:FormAlertType) => {
  return (
    <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 error-form-validation" role="alert">
      <p className="font-bold">WARNING!</p>
      <p>{message}</p>
    </div>
  )
}

export default FormAlert