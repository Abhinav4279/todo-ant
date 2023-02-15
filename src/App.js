import { ProTable } from '@ant-design/pro-components';
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import { useRef } from 'react';
import request from 'umi-request';
import {columns} from './column_scheme'

const App = () => {
  const actionRef = useRef();
  return (
    <ConfigProvider locale={enUS}>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        cardBordered

        request={async (params = {}, sort, filter) => {
          console.log(sort, filter);
  
          return request('http://localhost:5005/tasks', {
            params,
          });
        }}
      />
    </ConfigProvider>
  )
}

export default App;