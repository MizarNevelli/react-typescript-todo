import React, { useContext, useEffect, useState } from 'react';
import { TodosContext } from '../../context/TodosContext';
import { Todo } from '../../models/todos';
import searchIcon from '../../assets/search-icon.png';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { fetchTodos } from '../../api/todos';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const FiltersContainer: React.FC = () => {

    const { data, setData } = useContext(TodosContext);
    const [titleFilter, setTitleFilter] = useState('');
    const [completedFilter, setCompletedFilter] = useState(false);
    const [allTodos, setAllTodos] = useState<any>([])
    const [userIdFilter, setUserIdFilter] = useState<any>(0)

    // console.log('data from filters component', data);
    // console.log('titleFilter', titleFilter)
    // console.log('userIdFilter', userIdFilter)

    const getTodos = async () => {
        const myTodos = await fetchTodos();
        const arrayUniqueByKey = [...new Map(myTodos.map((item: Todo) =>
            [item['userId'], item])).values()];
        setAllTodos(arrayUniqueByKey);
    }

    useEffect(() => {
        let filteredData;
        const filterTodos = async () => {
            const myTodos = await fetchTodos();
            filteredData = myTodos.filter((todo: Todo) => {
                return todo.completed === completedFilter;
            })
            if(titleFilter !== ''){
                filteredData = filteredData.filter((todo: Todo) => {
                    return todo.title.startsWith(titleFilter);
                })
            }
            if (userIdFilter !== 0){
                filteredData = filteredData.filter((todo: Todo) => {
                    return todo.userId === userIdFilter;
                })
            }
            setData(filteredData)
        }

        filterTodos();
        getTodos();

    }, [completedFilter, userIdFilter])

    const handleTitleFilter = () => {
        const filteredData = data.filter((todo: Todo) => {
            return todo.title.startsWith(titleFilter);
        })
        setData(filteredData)
    }

    const handleUserIdChange = (event: SelectChangeEvent) => {
        setUserIdFilter(event.target.value);
    }

    return (
        <>
            <div className='filters-section'>
                <h1 className='filters-title blue-title'>FILTERS</h1>
                <div className='title-filter-container'>
                    <div className='search-icon-wrap'>
                        <img src={searchIcon} alt='search-icon' />
                    </div>
                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => setTitleFilter(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleTitleFilter()
                            }
                        }}
                    />
                </div>
                <div className='completed-filter'>
                    <h3 className='blue-title'>COMPLETED</h3>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch onChange={(e) => setCompletedFilter(e.target.checked)} />}
                            label={completedFilter ? 'Si' : 'No'}
                        />
                    </FormGroup>
                </div>
                <div>
                    <h3 className='blue-title'>SELECT USER ID</h3>
                    <Select 
                        size='small'
                        value={userIdFilter}
                        label="USER ID"
                        onChange={handleUserIdChange}
                    >
                        <MenuItem value={0}>Select User ID</MenuItem >
                        {allTodos.map((todo: Todo) => (
                            <MenuItem key={todo.id} value={todo.userId}>
                                {todo.userId}
                            </MenuItem>
                        ))}
                    </Select>
                </div>

            </div>
        </>
    );
};

export default FiltersContainer;
