
import { Todo } from '../../models/todos';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import trueIcon from '../../assets/true-icon.png';
import falseIcon from '../../assets/false-icon.png';
import { useContext } from 'react';
import { TodosContext } from '../../context/TodosContext';

const MyTable : React.FC = () => {

    const { data } = useContext(TodosContext)
    // console.log('myItems from table', data)

    const columns: GridColDef[] = [
        {
            field: 'userId',
            headerName: 'USER ID',
            width: 200,
            filterable: false,
        },
        {
            field: 'title',
            headerName: 'TITLE',
            width: 200
        },
        {
            field: 'completed',
            headerName: 'COMPLETED',
            headerAlign: 'right',
            width: 200,
            renderCell: (cellValue) => {
                return (
                    <div style={{ width:'100%', textAlign: 'right' }}>
                        {cellValue.value ?
                            <img style={{ width: '15px' }} src={trueIcon} /> :
                            <img style={{ width: '15px' }} src={falseIcon} />
                        }
                    </div>
                );
            }
        }
    ];

    return (
        <>
            <div style={{ height: 400, width: '100%' }} className='table-section'>
                <DataGrid
                    rows={data || []}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </>
    );
};

export default MyTable;
