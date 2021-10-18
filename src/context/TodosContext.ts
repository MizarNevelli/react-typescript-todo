import {createContext} from 'react'
import { Todo } from '../models/todos'

export const TodosContext = createContext<Todo[] | any>([])