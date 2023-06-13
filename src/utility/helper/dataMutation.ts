import _ from 'lodash'
import type {
	InitialStateCheckboxType,
} from './types'

const handleChangeField = (event: any, initialSate: any) => {
	const clone_forms = _.cloneDeep(initialSate)
	const event_name = event.target.name
	const event_value = event.target.value

	if (_.isArray(clone_forms)) {
		let filteredForm = _.filter(
			clone_forms,
			(data) => data.name === event_name
		)[0]
		filteredForm.value = event_value
	} else {
		clone_forms.value = event_value
	}

	return clone_forms
}

const handleChangeSelect = (event: any, initialSate: any) => {
	const clone_forms = _.cloneDeep(initialSate)
	const event_name = event.target.name

	if (_.isArray(clone_forms)) {
		let filteredForm = _.filter(
			clone_forms,
			(data) => data.name === event_name
		)[0]
		filteredForm.value = event
	} else {
		clone_forms.value = event
	}

	return clone_forms
}

const handleChangeCheckbox = (
	id: number,
	initialSate: InitialStateCheckboxType
) => {
	const clone_forms = _.cloneDeep(initialSate)
	let filteredForm = _.filter(clone_forms, (data) => data.id === id)[0]
	filteredForm.is_checked = !filteredForm.is_checked
	return clone_forms
}

const handleChangeFile = (event: any, initialSate: any) => {
	const clone_forms = _.cloneDeep(initialSate)
	const event_name = event.target.name
	const event_value = event.target.files[0]

	if (_.isArray(clone_forms)) {
		let filteredForm = _.filter(
			clone_forms,
			(data) => data.name === event_name
		)[0]
		filteredForm.value = event_value
	} else {
		clone_forms.value = event_value
	}

	return clone_forms
}

const handleChangeTimeRange = (event: any, initialSate: any) => {
	const clone_forms = _.cloneDeep(initialSate)
	const event_name = event.target.name
	const start_date = event.target.startDate
	const end_date = event.target.endDate

	if (_.isArray(clone_forms)) {
		let filteredForm = _.filter(
			clone_forms,
			(data) => data.name === event_name
		)[0]
		filteredForm.startDate = start_date
		filteredForm.endDate = end_date
		filteredForm.value = [start_date, end_date]
	} else {
		clone_forms.startDate = start_date
		clone_forms.endDate = end_date
		clone_forms.value = [start_date, end_date]
	}
	
	return clone_forms
}

const handleSelectEdit = (options: any, value: any) => {
	if (!value.toString()) return
	return _.filter(
		options,
		(result) => result.value.toString() === value.toString()
	)[0]
}

const getOptionsByName = (formList: any, name: string) => {
	return formList.filter((data: any) => data.name === name)[0].options || []
}

const getvalueByName = (formList: any, name: string) => {
	return formList.filter((data: any) => data.name === name)[0].value || ""
}

const assignValueByName = (formList: any, name: string, value: any) => {
	return formList.filter((data: any) => data.name === name)[0].value = value || ''
}

const assignOptionByName = (formList: any, name: string, value: any) => {
	return formList.filter((data: any) => data.name === name)[0].options = value || []
}

export {
	handleChangeField,
	handleChangeSelect,
	handleChangeCheckbox,
	handleChangeFile,
	handleChangeTimeRange,
	handleSelectEdit,
	assignOptionByName,
  assignValueByName,
	getOptionsByName,
	getvalueByName
}
