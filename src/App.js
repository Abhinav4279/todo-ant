import { ProTable } from '@ant-design/pro-components';
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import {columns} from './column_scheme'

const App = () => {
  return (
    <ConfigProvider locale={enUS}>
      <ProTable
        columns={columns}
      />
    </ConfigProvider>
  )
}

export default App;