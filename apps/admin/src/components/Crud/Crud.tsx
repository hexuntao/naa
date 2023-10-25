import { formatResponse, isSuccess } from '@/utils';
import {
  ActionType,
  BetaSchemaForm,
  ParamsType,
  ProFormInstance,
  ProTable,
} from '@ant-design/pro-components';
import { useBoolean, useRequest } from 'ahooks';
import { Button, Popconfirm, Space, Typography, message } from 'antd';
import {
  PropsWithChildren,
  ReactElement,
  Ref,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { cloneDeep, isFunction } from 'lodash';
import type { CrudProps, CrudRef } from './types';

const Crud = <
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
>(
  props: CrudProps<DataType, Params, ValueType>,
  ref: Ref<CrudRef>,
) => {
  const {
    rowKey = 'id',
    columns,
    isShowOperationColumn = true,
    api,
    tableProps,
    formProps,
    fieldsRecord,
  } = props;

  const layoutType = formProps?.layoutType || ('ModalForm' as any);

  /** 表格实例 */
  const tableRef = useRef<ActionType>();

  /** 弹窗表单实例 */
  const formRef = useRef<ProFormInstance<DataType>>();

  /** 打开弹窗表单 */
  const [isOpenModal, { set: setOpenModal }] = useBoolean(false);

  /** 表格rowKey唯一值，也是编辑删除项的 key name */
  const rowKeyName = isFunction(rowKey) ? rowKey() : rowKey;

  /** 当前选中记录 */
  const [currentRecord, setRecord] = useState<DataType | null>();

  /** 弹窗表单标题 */
  const formTitle = currentRecord ? '编辑' : '新增';

  /** 弹窗开关闭change */
  const onOpenChange = (e: boolean) => {
    setOpenModal(e);
    if (!e) {
      formRef.current?.resetFields();
    }
  };

  /** 新增 */
  const onCreate = () => {
    setOpenModal(true);
    setRecord(null);
  };

  /** 编辑 */
  const onEdit = (record: DataType) => {
    setOpenModal(true);
    setRecord(record);
    formRef.current?.setFieldsValue({
      ...record,
      ...(fieldsRecord?.(record) || {}),
    });
  };

  /** 删除 */
  const onDel = async (record: DataType) => {
    if (!api || !isFunction(api.delete)) {
      return console.warn('not delete api');
    }

    const { code, message: msg } = await api
      .delete([record[rowKeyName]])
      .finally(() => {
        tableRef.current?.reload();
      });

    if (isSuccess(code)) {
      message.success({ key: 'success', content: msg });
    }
  };

  /** 提交 */
  const onSubmit = async (values: DataType) => {
    if (!api || !isFunction(api.create) || !isFunction(api.update)) {
      return console.warn('not create or update api');
    }

    const params: { [x: string]: any } = { ...values };
    if (currentRecord?.[rowKeyName]) {
      params[rowKeyName] = currentRecord[rowKeyName];
    }

    const { code, message: msg } = await (params[rowKeyName]
      ? api.update
      : api.create)(params).finally(() => {
      tableRef.current?.reload();
    });

    if (isSuccess(code)) {
      message.success({ key: 'success', content: msg });
    }

    return true;
  };

  const tableColumns = [...cloneDeep(columns)];

  if (isShowOperationColumn) {
    tableColumns.push({
      title: '操作',
      valueType: 'option',
      width: 100,
      align: 'right',
      fixed: 'right',
      key: 'option',
      render: (_, record) => {
        return (
          <Space>
            <Typography.Link onClick={() => onEdit(record)}>
              编辑
            </Typography.Link>
            <Popconfirm
              title="是否确定删除?"
              placement="topLeft"
              onConfirm={() => onDel(record)}
            >
              <Typography.Link type="danger">删除</Typography.Link>
            </Popconfirm>
          </Space>
        );
      },
    });
  }

  const formColumns = cloneDeep(columns);

  useImperativeHandle(ref, () => ({
    tableColumns,
    formColumns,
    currentRecord,
  }));

  // 初始化 tableProps
  const initTableProps = {
    rowKey: rowKey,
    actionRef: tableRef,
    search: {
      defaultCollapsed: false,
    },
    pagination: { pageSize: 10 },
    toolBarRender: () => {
      return [
        <Button key="create" type="primary" onClick={onCreate}>
          新增
        </Button>,
      ];
    },
    columns: tableColumns,
    ...tableProps,
  };

  // 初始 FormProps
  const initFormProps: any = {
    width: 600,
    layoutType: layoutType,
    layout: 'horizontal',
    grid: true,
    labelCol: { span: 4 },
    formRef,
    title: formTitle,
    open: isOpenModal,
    onOpenChange: onOpenChange,
    columns: formColumns,
    onFinish: onSubmit,
  };
  if (layoutType === 'ModalForm') {
    initFormProps.modalProps = {
      centered: true,
      // 默认强制渲染弹窗内容，不然编辑弹窗时候一开始获取不到实例，填充不了编辑数据
      forceRender: true,
    };
  }
  if (layoutType === 'DrawerForm') {
    initFormProps.drawerProps = {
      // 默认强制渲染弹窗内容，不然编辑弹窗时候一开始获取不到实例，填充不了编辑数据
      forceRender: true,
    };
  }

  /** 获取表格数据 */
  const { runAsync: request } = useRequest(
    async (params = {}) => {
      if (!api || !isFunction(api.list)) {
        return {};
      }
      if (params.current) {
        params.page = params.current;
        params.current = undefined;
      }
      if (params.pageSize) {
        params.limit = params.pageSize;
        params.pageSize = undefined;
      }
      const result = await api.list(params);
      return formatResponse<DataType[]>(result);
    },
    { manual: true },
  );
  return (
    <div>
      <ProTable<DataType, Params, ValueType>
        request={request}
        {...initTableProps}
      />
      <BetaSchemaForm<DataType> {...initFormProps} {...formProps} />
    </div>
  );
};

const ForwardCrud = forwardRef(Crud) as <
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
>(
  props: PropsWithChildren<CrudProps<DataType, Params, ValueType>> & {
    ref?: Ref<CrudRef | undefined>;
  },
) => ReactElement;

export default ForwardCrud;
