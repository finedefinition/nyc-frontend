import { ReactNode } from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { themeConfig } from '@/lib/antd/themeConfig';

interface AntdProviderProps {
  children: ReactNode;
}

const AntdProvider: React.FC<AntdProviderProps> = ({ children }) => {
  return (
    <AntdRegistry>
      <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
    </AntdRegistry>
  );
};

export default AntdProvider;
