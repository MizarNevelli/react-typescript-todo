import axios from 'axios';

export const fetchTodos = async (): Promise< any> => {

    const url = `https://jsonplaceholder.typicode.com/todos`;
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.log(error);
    }
};