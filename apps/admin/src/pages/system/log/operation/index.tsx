import { Access, useAccess } from '@umijs/max';
import { Button, Popconfirm, Drawer, Descriptions } from 'antd';
import { useRef, useState } from 'react';
import { DictText } from '@/components/Dict';
import Crud, { CrudRef } from '@/components/Crud';
import Columns from './Columns';
import { OperLogModel, ListOperLogParams } from './model';
import { getPageList, clearOperLog } from './services';
import { useModel } from '@umijs/max';

const OperationLog = () => {
  const { hasPermission } = useAccess();
  const crudRef = useRef<CrudRef>();

  const [record, setRecord] = useState<OperLogModel>();
  const [openDrawer, setOpenDrawer] = useState(false);

  /**
   * 注册字典数据
   */
  const { loadDict, toSelect } = useModel('dict');
  const sysOperType = loadDict('sys_oper_type');
  const sysSuccessFailure = loadDict('sys_success_failure');

  /**
   * 清空操作日志
   */
  const handleClearLog = async () => {
    await clearOperLog();
    crudRef.current?.tableRef.current?.reload();
  };

  const columns: typeof Columns = [
    ...Columns,
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      align: 'right',
      fixed: 'right',
      width: 100,
      render: (_, record) => {
        return (
          <Button
            key="detail"
            type="link"
            onClick={() => {
              setRecord(record);
              setOpenDrawer(true);
            }}
          >
            详情
          </Button>
        );
      },
    },
  ];
  console.log(sysSuccessFailure);

  return (
    <>
      <Crud<OperLogModel, ListOperLogParams>
        ref={crudRef}
        rowKey="operId"
        columns={columns}
        isShowOperationColumn={false}
        useRowSelection={false}
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
      <Drawer
        title="操作日志详情"
        width={1000}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        {record ? (
          <Descriptions column={2}>
            <Descriptions.Item label="操作模块">
              {record.title} / <DictText options={sysOperType} value={record.operType} />
            </Descriptions.Item>
            <Descriptions.Item label="登录信息">
              {record.operName} / {record.operIp} / {record.operLocation}
            </Descriptions.Item>
            <Descriptions.Item label="请求方式">{record.requestMethod}</Descriptions.Item>
            <Descriptions.Item label="请求地址">{record.requestUrl}</Descriptions.Item>
            <Descriptions.Item label="操作方法" span={2}>
              {record.operMethod}
            </Descriptions.Item>
            <Descriptions.Item label="请求参数" span={2}>
              {record.requestParam}
            </Descriptions.Item>
            <Descriptions.Item label="返回参数" span={2}>
              {record.requestResult}
            </Descriptions.Item>
            <Descriptions.Item label="错误消息" span={2}>
              {record.requestErrmsg}
            </Descriptions.Item>
            <Descriptions.Item label="操作状态" span={2}>
              <DictText options={sysSuccessFailure} value={record.operStatus} />
            </Descriptions.Item>
            <Descriptions.Item label="操作时间">{record.createTime}</Descriptions.Item>
          </Descriptions>
        ) : null}
      </Drawer>
    </>
  );
};

export default OperationLog;
