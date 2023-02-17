import { PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { Button, ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import { useRef, useState } from 'react';
import request from 'umi-request'
import {columns} from './columns'
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const actionRef = useRef();
  const [newRowId, setNewRowId] = useState(null);

  return (
    <ConfigProvider locale={enUS}>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        cardBordered

        editable={{
          type: 'multiple',
          onSave: (key, row, _, __) => {
            console.log(key, row);
            if(typeof row.tags === 'string')
              row.tags = row.tags.split(',');

            if(row.id === newRowId) {
              setNewRowId(null);
              request.post(`http://localhost:5005/tasks`, {
                data: row,
              })
              .catch(function(error) {
                console.log(error);
              });
            }
            else {
              request.put(`http://localhost:5005/tasks/${row.id}`, {
                data: row,
              })
              .catch(function(error) {
                console.log(error);
              });
            }
          },
          onDelete: (key, row, _, __) => {
            request.delete(`http://localhost:5005/tasks/${row.id}`, {
              data: row,
            })
            .catch(function(error) {
              console.log(error);
            });
          }
        }}

        rowKey="id"
        options={{
          setting: {
            listsHeight: 400,
          },
        }}

        pagination={{
          pageSize: 5,
        }}
        dateFormatter="string"
        headerTitle="Todo? || NoTodo?"
        request={async (params = {}, sort, filter) => {
          // console.log(sort, filter);
          return request('http://localhost:5005/tasks', {
            params,
          })
          .then((response) => {
              const result = {"data": response};
              return result;
          })
          .catch((error) => {
            console.log(error);
          });
        }}

        toolbar={{
          search: {
            onSearch: (value) => {
              alert(value);
            },
          },
        }}
        toolBarRender={() => 
            <Button
            type="primary"
            onClick={() => {
              const nid = uuidv4();
              const today = Date.now();
              setNewRowId(nid)
              actionRef.current?.addEditRecord?.({
                id: nid,
                title: 'Task',
                creationDate: today
              });
            }}
            icon={<PlusOutlined />}
          >
            Add
          </Button>
        }
        search={false}
      />
    </ConfigProvider>
  )
}

export default App;