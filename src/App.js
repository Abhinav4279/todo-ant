import { ProTable } from '@ant-design/pro-components';
import { Button, ConfigProvider, Tag } from 'antd';
import enUS from 'antd/locale/en_US';

const App = () => {
  return (
    <ConfigProvider locale={enUS}>
      <ProTable
      />
    </ConfigProvider>
  )
}

export default App;