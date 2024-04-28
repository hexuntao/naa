import { Access, useAccess } from '@umijs/max';
import { Button, Popconfirm } from 'antd';
import { useRef } from 'react';
import Crud, { CrudRef } from '@/components/Crud';
import Columns from './Columns';
import { clearLoginLog, getPageList } from './services';
import { LoginLogModel, ListLoginLogParams } from './model';

const LoginLog = () => {
  const { hasPermission } = useAccess();
  const crudRef = useRef<CrudRef>();

  /**
   * 清空登录日志
   */
  const handleClearLog = async () => {
    await clearLoginLog();
    crudRef.current?.tableRef.current?.reload();
  };

  return (
    <Crud<LoginLogModel, ListLoginLogParams>
      ref={crudRef}
      rowKey="loginId"
      isShowOperationColumn={false}
      useRowSelection={false}
      columns={Columns}
      list={{
        api: getPageList,
      }}
      tableProps={{
        toolbar: {
          actions: [
            <Access key="clean" accessible={hasPermission('system:loginlog:delete')}>
              <Popconfirm title="是否确认清空？" onConfirm={handleClearLog}>
                <Button type="primary" danger>
                  清空
                </Button>
              </Popconfirm>
            </Access>,
          ],
        },
      }}
    />
  );
};

export default LoginLog;
