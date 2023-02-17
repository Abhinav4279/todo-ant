import { PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { Button, ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import { useEffect, useRef, useState } from 'react';
import request from 'umi-request'
import { getColumns } from './columns';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const actionRef = useRef();
  const [newRowId, setNewRowId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tags, setTags] = useState([]);
  const [columns, setColumns] = useState([]);
  
  //utilities
  const fetchAndSetTags = () => {
    request.get('http://localhost:5005/tasks')
    .then(function(response) {
      let allTags = [];
      response?.forEach((task) => allTags = [...allTags, ...task.tags]);
      allTags = keepUnique(allTags);
      setTags(allTags);
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  function keepUnique(arr) {
    let outputArray = Array.from(new Set(arr))
    return outputArray
  }

  useEffect(() => {
    fetchAndSetTags();
  }, [])

  useEffect(() => {
    const tagFilters = tags.filter((tag) => (tag !== "")).map((tag) => ({text: tag, value: tag}));
    setColumns(getColumns(tagFilters));
  }, [tags])
  

  //rendering
  return (
    <ConfigProvider locale={enUS}>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        cardBordered

        editable={{
          onSave: (key, row, _, __) => {
            if(typeof row.tags === 'string')
              row.tags = row.tags.split(',');

            row.tags = keepUnique(row.tags)
            // updateTags(row.tags);
            if(row.id === newRowId) {
              setNewRowId(null);
              request.post(`http://localhost:5005/tasks`, {
                data: row,
              })
              .then((res) => {
                fetchAndSetTags();
              })
              .catch(function(error) {
                console.log(error);
              });
            }
            else {
              request.put(`http://localhost:5005/tasks/${row.id}`, {
                data: row,
              })
              .then((res) => {
                fetchAndSetTags();
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
            .then((res) => {
              fetchAndSetTags();
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
        request={async (params = {searchQuery}, sort, filter) => {
          return request(`http://localhost:5005/tasks?q=${searchQuery}`, {
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
              setSearchQuery(value);
              actionRef.current?.reload();
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
                creationDate: today,
                status: 'open'
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