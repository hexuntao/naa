import { formatResponse } from './helpers';
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
import { Access } from './Access';

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
    useRowSelection = true,
    rowSelection,
    list,
    add,
    update,
    deletes,
    tableProps,
    formProps,
  } = props;

  const layoutType = formProps?.layoutType || ('ModalForm' as any);

  const addText = add?.text || '新增';
  const updateText = update?.text || '编辑';
  const deleteText = deletes?.text || '删除';

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

  /** 表格选择项 */
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  /** 弹窗表单标题 */
  const formTitle = currentRecord ? updateText : addText;

  /** 弹窗开关闭change */
  const onOpenChange = (e: boolean) => {
    setOpenModal(e);
    if (!e) {
      formRef.current?.resetFields();
    }
  };

  /** 新增 */
  const onCreate = async () => {
    /** 自定义操作 */
    if (isFunction(add?.customAction)) {
      add?.customAction();
      return false;
    }

    /** 新增前操作 */
    if (isFunction(add?.onOpen)) {
      // 返回 false 为拦截操作
      if ((await add?.onOpen()) === false) {
        return false;
      }
    }
    setOpenModal(true);
    setRecord(null);
  };

  /** 编辑 */
  const onEdit = async (_record: DataType) => {
    let record = _record;

    /** 自定义操作 */
    if (isFunction(update?.customAction)) {
      update?.customAction(record);
      return false;
    }

    setOpenModal(true);

    /** 编辑前操作 */
    if (isFunction(update?.onOpen)) {
      const newRecord = await update?.onOpen(record);
      // 返回 false 为拦截操作
      if (newRecord === false) {
        return false;
      }
      record = newRecord as DataType;
    }

    setRecord(record);

    formRef.current?.setFieldsValue({
      ...record,
    });
  };

  /** 单个/多个 删除 */
  const onDels = async (ids: React.Key) => {
    /** 自定义操作 */
    if (isFunction(deletes?.customAction)) {
      deletes?.customAction(ids);
      return false;
    }

    /** 删除前操作 */
    if (isFunction(deletes?.onBefore)) {
      // 返回 false 为拦截操作
      if ((await deletes?.onBefore(ids)) === false) {
        return false;
      }
    }

    if (!deletes || !isFunction(deletes.api)) {
      return console.warn('not delete api');
    }

    await deletes.api(ids).finally(() => {
      tableRef.current?.reload();
      setSelectedRowKeys([]);
    });

    message.success({ key: 'success', content: '操作成功' });
  };

  /** 提交 */
  const onSubmit = async (_values: DataType) => {
    let params: { [x: string]: any } = { ..._values };

    if (!add || !update || !isFunction(add?.api) || !isFunction(update?.api)) {
      return console.warn('not create or update api');
    }

    const beforeFun = currentRecord ? update.onBefore : add.onBefore;
    if (isFunction(beforeFun)) {
      params = beforeFun(_values);
    }

    if (currentRecord?.[rowKeyName]) {
      params[rowKeyName] = currentRecord[rowKeyName];
    }

    await (params[rowKeyName] ? update.api : add.api)(params).finally(() => {
      tableRef.current?.reload();
    });

    message.success({ key: 'success', content: '操作成功' });

    return true;
  };

  const tableColumns = [...cloneDeep(columns)];

  // 表格操作栏
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
            <Access key="update" accessible={update?.show && !record.__noShowEdit}>
              <Typography.Link onClick={() => onEdit(record)}>{updateText}</Typography.Link>
            </Access>
            <Access key="delete" accessible={deletes?.show && !record.__noShowDel}>
              <Popconfirm
                title="是否确定删除？"
                placement="topLeft"
                onConfirm={() => onDels(record[rowKeyName])}
              >
                <Typography.Link type="danger">{deleteText}</Typography.Link>
              </Popconfirm>
            </Access>
          </Space>
        );
      },
    });
  }

  const formColumns = cloneDeep(columns);

  // 初始化 tableProps
  const initTableProps: any = {
    rowKey: rowKey,
    actionRef: tableRef,
    search: {
      defaultCollapsed: false,
    },
    pagination: { pageSize: 10 },
    toolBarRender: () => {
      const toolBarArr = [
        <Access key="create" accessible={add?.show}>
          <Button type="primary" onClick={onCreate}>
            {addText}
          </Button>
        </Access>,
      ];
      // 启用row单多选
      if (useRowSelection) {
        toolBarArr.push(
          <Access key="delete" accessible={deletes?.show}>
            <Popconfirm
              title="是否确定删除？"
              disabled={!selectedRowKeys}
              onConfirm={() => {
                const ids = selectedRowKeys?.join(',');
                ids && onDels(ids);
              }}
            >
              <Button type="primary" danger disabled={!selectedRowKeys?.length}>
                {deleteText}
              </Button>
            </Popconfirm>
          </Access>,
        );
      }
      return toolBarArr;
    },
    columns: tableColumns,
  };

  // 启用表格选择操作
  if (useRowSelection) {
    initTableProps.rowSelection = {
      selectedRowKeys,
      onChange: setSelectedRowKeys,
      ...rowSelection,
    };
  }

  if (isFunction(list?.postData)) {
    initTableProps.postData = list?.postData;
  }

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
    async (_params = {}) => {
      let params = { ..._params };
      if (!list || !isFunction(list.api)) {
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
      /** 请求前操作 */
      if (isFunction(list?.onBefore)) {
        params = list?.onBefore(params);
      }
      const result = await list.api(params);
      return formatResponse<DataType[]>(result);
    },
    { manual: true },
  );

  useImperativeHandle(ref, () => ({
    tableRef,
    formRef,
    currentRecord,
    selectedRowKeys,
    setSelectedRowKeys,
  }));

  return (
    <div>
      <ProTable<DataType, Params, ValueType>
        request={request}
        {...initTableProps}
        {...tableProps}
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
