import TextInput from './inputText';
import PropTypes from 'prop-types';
import PasswordInput from './inputPassword';
import InputSelect from './inputSelect';
import TextAreaInput from './inputTextArea';
import InputDateTime from './inputDateTime';
import InputFile from './inputFile';
import OnlyLabel from './onlylabel';
import InputDateRange from './inputDateRange';
import InputYearMonth from './inputYearMonth';

type ArrayType = {
  title: string;
  placeholder: string;
  type: string;
  value: any;
  name: string;
  options?: Array<any>;
  rules: any;
  error: string;
  hidden?: boolean;
  note?: string | React.ReactNode;
  disabled?: boolean;
  rightAddon?: React.ReactNode;
  onSelectSearch?: (inputValue: string, callback: (options: any) => void) => void;
}

type InputFormType = {
  formData: Array<ArrayType>;
  targetMutation: Array<ArrayType>;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>, mutation:Array<ArrayType>, setTarget:Function) => void;
  setTargetMutation: (e:Array<any>) => void;
  containerStyle: string;
}

const InputForm = ({formData, targetMutation, setTargetMutation, onChange, containerStyle}: InputFormType) => {
  const handleDataChange = (event:any) => {
    onChange(event, targetMutation, setTargetMutation)
  }

  return (
    <div className={containerStyle}>
      {formData.map((result, index) => {
        return !result.hidden && (
          <div key={index} className='w-full'>
            {result.type !== 'only-label' && <div className='text-[14px] text-black font-semibold mb-[2px]'>{result.title}</div>}
            {(result.type === 'text' || result.type === 'number' ) && <TextInput onChange={handleDataChange} data={result}/>}
            {(result.type === 'file') && <InputFile onChange={handleDataChange} data={result}/>}
            {result.type === 'textarea' && <TextAreaInput onChange={handleDataChange} data={result}/>}
            {result.type === 'password' && <PasswordInput onChange={handleDataChange} data={result}/>}
            {result.type === 'select' && <InputSelect onChange={handleDataChange} data={result}/>}
            {result.type === 'date-time-picker' && <InputDateTime onChange={handleDataChange} data={result}/>}
            {result.type === 'date-range' && <InputDateRange onChange={handleDataChange} data={result}/>}
            {result.type === 'year-month' && <InputYearMonth onChange={handleDataChange} data={result}/>}
            {result.type === 'only-label' && <OnlyLabel data={result}/>}
            {/* {result.type === 'radio' && <InputRadio onChange={onChange} {...result}/>} */}
            {/* {result.type === 'date-range' && <InputRange onChange={onChange} data={result}/>}
            {result.type === 'date-year' && <InputYear onChange={onChange} data={result}/>}
            {result.type === 'date-month' && <InputMonth onChange={onChange} data={result}/>} */}
            <div className='flex flex-col'>
              {result.note && (<label className='text-sm text-gray-500'>{result.note}</label>)}
              {result.error && (<label className='text-sm text-red-600'>{result.error}</label>)}
            </div>
          </div>
        )
      })}
    </div>
  )
}


InputForm.propTypes = {
  formData: PropTypes.array,
  onChange: PropTypes.func,
  containerStyle: PropTypes.string
};

InputForm.defaultProps = {
  onChange: () => {},
  formData: [
    {
      title: '',
      placeholder: '',
      type: '',
      value: ''
    }
  ],
  containerStyle: 'flex flex-col gap-y-4 w-full'
};

export default InputForm;