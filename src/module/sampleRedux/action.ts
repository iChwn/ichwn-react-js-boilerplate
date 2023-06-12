import axios from 'axios';
import { DECREMENT, INCREMENT } from './types';

export const increaseCounter = () => {
  console.log('test')
	return {
		type: INCREMENT,
	};
};

export const decreaseCounter = () => {
	return {
		type: DECREMENT,
	};
};

export const getApiData = () => {
	return (_) =>
		axios.get("https://jsonplaceholder.typicode.com/todos")
		.then((res) => {
			console.log(res)
		})
		.catch((err) => {
			console.log(err)
		})
}