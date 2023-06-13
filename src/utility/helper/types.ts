type InitialStateTextFieldType = {
  name: string,
  value: string
}[]

type Select = {
  title: string;
  placeholder: string;
  value: string;
  name: string;
  error: string;
  options: {
      value: string;
      label: string;
  }[];
}
type InitialStateSelectType = Select[]
type InitialStateSelectType2 = {
  title: string;
  placeholder: string;
  value: string;
  name: string;
  error: string;
  options: {
      value: string;
      label: string;
  }[];
}

type Cehckbox = {
  id: number,
  label: string,
  is_checked: boolean
}
type InitialStateCheckboxType = Cehckbox[]

export type { InitialStateTextFieldType, InitialStateSelectType, InitialStateSelectType2, InitialStateCheckboxType }