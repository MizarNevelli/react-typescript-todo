
import { Todo } from '../../models/todos';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import trueIcon from '../../assets/true-icon.png';
import falseIcon from '../../assets/false-icon.png';
import { useContext } from 'react';
import { TodosContext } from '../../context/TodosContext';

const MyTable: React.FC = () => {

    const { data } = useContext(TodosContext)

    const columns: GridColDef[] = [
        {
            field: 'userId',
            headerName: 'USER ID',
            minWidth: 150,
            flex: 0.2,
            filterable: false,
        },
        {
            field: 'title',
            headerName: 'TITLE',
            minWidth: 200,
            flex: 0.4,
            filterable: false,
        },
        {
            field: 'completed',
            headerName: 'COMPLETED',
            headerAlign: 'right',
            minWidth: 200,
            flex: 0.4,
            filterable: false,
            renderCell: (cellValue) => {
                return (
                    <div style={{ width: '100%', textAlign: 'right', marginRight: '2%' }}>
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
                <div style={{ display: 'flex', height: '100%' }}>
                    <DataGrid
                        rows={data || []}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
            </div>
        </>
    );
};

export default MyTable;
