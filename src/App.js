import { ProTable } from '@ant-design/pro-components';
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import { useState } from 'react';
import request from 'umi-request';
import {columns} from './column_scheme'

const App = () => {
  const [tableListDataSource, setTableListDataSource] = useState([
    {
      "id": 1,
      "title": "Appointment",
      "description": "With professor",
      "dueDate": "2023-03-20",
      "tags": ["delay", "academics"],
      "status": "open"
    },
    {
      "id": 2,
      "title": "Class Assignment",
      "description": "Computer Networks",
      "dueDate": "2023-02-25",
      "tags": ["urgent", "academics"],
      "status": "done"
    },
    {
      "id": 3,
      "title": "Dev Assignment",
      "description": "Frontend task",
      "dueDate": "2023-02-16",
      "tags": ["urgent", "development"],
      "status": "working"
    }
  ]);

  return (
    <ConfigProvider locale={enUS}>
      <ProTable
        columns={columns}
        cardBordered

        editable={{
          type: 'multiple',
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

      request={async (params, sorter, filter) => {
        console.log(params, sorter, filter);

        return Promise.resolve({
          data: tableListDataSource,
          success: true,
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