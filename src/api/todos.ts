import axios from 'axios';
import { Todo } from '../models/todos';

export const fetchTodos = async (): Promise<Todo[] | any> => {

    const url = `https://jsonplaceholder.typicode.com/todos`;
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.log(error);
    }
};