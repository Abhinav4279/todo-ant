import { ProTable } from '@ant-design/pro-components';
import { Button, ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import request from 'umi-request'
import {columns} from './columns'

const App = () => {
  return (
    <ConfigProvider locale={enUS}>
      <ProTable
        columns={columns}
        cardBordered

        editable={{
          type: 'multiple',
          onSave: (key, row, _, __) => {
            // console.log(key, row);
            request.put(`http://localhost:5005/tasks/${row.id}`, {
              data: row,
            })
            .catch(function(error) {
              console.log(error);
            });
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
        search={false}
      />
    </ConfigProvider>
  )
}

export default App;