import React, { useEffect, useState } from 'react';
import { fetchTodos } from './api/todos';
import './style/App.scss';
import FiltersContainer from './components/Filters';
import MyTable from './components/Table';
import { TodosContext } from './context/TodosContext';

const App: React.FC = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    getTodos()
  }, [])

  const getTodos = async () => {
    const MyTodos = await fetchTodos()
    setData(MyTodos)
  }

  return (
    <div className="App">
      {/* <header className="App-header">
       <h1>TEST AALTO</h1>
      </header> */}
      <div className='container'>
        <TodosContext.Provider value={{ data, setData }}>
          <FiltersContainer />
          <MyTable
          // data={data}
          />
        </TodosContext.Provider>

      </div>

    </div>
  );
}

export default App;
