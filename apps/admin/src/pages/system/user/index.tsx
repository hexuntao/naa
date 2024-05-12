import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { useRequest, Access, useAccess } from '@umijs/max';
import { Button } from 'antd';
import { saveAs } from 'file-saver';
import { useRef, useState } from 'react';
import ImportForm from './components/ImportForm';
import Crud, { CrudRef } from '@/components/Crud';
import Columns from './Columns';
import { ListUserParams, UserModel } from './model';
import { add, deletes, getDetail, getPageList, update, exportList } from './services';

const User = () => {
  const { hasPermission } = useAccess();
  const crudRef = useRef<CrudRef>();
  const [importOpen, setImportOpen] = useState(false);

  /**
   * 导出用户列表
   */
  const { loading: loadingExport, run: runExportUserList } = useRequest(exportList, {
    manual: true,
    onSuccess({ data }) {
      saveAs(data, `用户列表.xlsx`);
    },
  });

  return (
    <>
      <Crud<UserModel, ListUserParams>
        ref={crudRef}
        rowKey="userId"
        columns={Columns}
        rowSelection={{
          getCheckboxProps(record) {
            return {
              disabled: record.userId === 1,
            };
          },
        }}
        tableProps={{
          toolbar: {
            actions: [
              ...(crudRef.current?.ToolBarActions() || []),
              <Access key="import" accessible={hasPermission('system:user:import')}>
                <Button
                  icon={<UploadOutlined />}
                  onClick={() => {
                    setImportOpen(true);
                  }}
                >
                  导入
                </Button>
              </Access>,
              <Access key="export" accessible={hasPermission('system:user:export')}>
                <Button
                  icon={<DownloadOutlined />}
                  loading={loadingExport}
                  onClick={() => {
                    runExportUserList();
                  }}
                >
                  导出
                </Button>
              </Access>,
            ],
          },
        }}
        list={{
          api: getPageList,
          postData(data) {
            return data.map((e) => ({
              ...e,
              __noShowEdit: e.userId === 1,
              __noShowDel: e.userId === 1,
            }));
          },
        }}
        add={{
          show: hasPermission('system:user:add'),
          api: add,
        }}
        update={{
          show: hasPermission('system:user:update'),
          api: update,
          onOpen: async (record) => {
            const data = await getDetail(record.userId);
            return { ...record, postIds: data.postIds, roleIds: data.roleIds };
          },
        }}
        deletes={{
          show: hasPermission('system:user:delete'),
          api: deletes,
        }}
      />
      <ImportForm
        // record={record}
        open={importOpen}
        onOpenChange={setImportOpen}
        onFinish={async () => crudRef.current?.tableRef.current?.reload()}
      />
    </>
  );
};

export default User;
