import {
  ActionType,
  DrawerFormProps,
  LightFilterProps,
  ModalFormProps,
  ParamsType,
  ProColumns,
  ProFormColumnsType,
  ProFormInstance,
  ProFormProps,
  ProTableProps,
  QueryFilterProps,
  StepFormProps,
  StepsFormProps,
} from '@ant-design/pro-components';

export type ColumnsType<T, V = 'text'> = ProColumns<T, V> & ProFormColumnsType<T>;

export interface ObjectLiteral {
  [s: string]: any;
}

/**
 * Crud Props
 */
export type CrudProps<
  DataType = Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
> = {
  /**
   * ProTableProps
   */
  tableProps?: ProTableProps<DataType, Params, ValueType>;

  /**
   * SchemaFormProps
   */
  formProps?: object & any;

  /**
   * 表格rowKey; 默认为 id
   */
  rowKey?: string | ((e?: any) => string);

  /**
   * 是否显示操作列; 默认显示
   */
  isShowOperationColumn?: boolean;

  /**
   * 启用表格选择操作
   */
  useRowSelection?: boolean;

  /**
   * 表格选择api
   */
  rowSelection?: ProTableProps<DataType, Params, ValueType>['rowSelection'];

  /**
   * 表格跟弹窗表单的columns
   */
  columns: ColumnsType<DataType, ValueType>[];

  /**
   * 列表props
   */
  list?: {
    show?: boolean;
    api?: (params?: Params) => Promise<DataType[] | PageResponse<DataType>>;
    /**
     * 将返回数据进行处理
     *
     * -- 操作栏固定参数设定：
     *
     * @description 数据添加 __noShowEdit 为 true 则不显示编辑按钮
     * @description 数据添加 __noShowDel 为 true 则不显示删除按钮
     */
    postData?: (data: DataType[]) => DataType[];
    /**
     * 请求参数
     */
    params?: Partial<Params> & ObjectLiteral;
    /**
     * 请求前操作
     * @description 可填充或修改列表请求参数
     */
    onBefore?: (values: Params & ObjectLiteral) => Params & ObjectLiteral;
  };

  /**
   * 新增props
   */
  add?: {
    /** 是否显示 */
    show?: boolean;
    text?: string;
    api?: (params?: any) => Promise<any>;
    /**
     * 打开弹窗时操作
     * @description 返回false可进行拦截
     * @description 可填充或修改 表单字段数据
     */
    onOpen?: () => Promise<boolean>;
    /**
     * 新增前操作
     * @description 可填充或修改 提交的表单数据格式
     */
    onBefore?: (values: DataType & ObjectLiteral) => DataType & ObjectLiteral;
    /** 自定义操作，不自动打开表单窗口 */
    customAction?: () => any;
  };

  /**
   * 更新props
   */
  update?: {
    /** 是否显示 */
    show?: boolean;
    text?: string;
    api?: (id: number, params?: any) => Promise<any>;
    /**
     * 打开弹窗时操作
     * @description 返回false可进行拦截
     * @description 可填充或修改 表单字段数据
     */
    onOpen?: (record: DataType) => Promise<DataType | boolean>;
    /**
     * 更新前操作
     * @description 可填充或修改 提交的表单数据格式
     */
    onBefore?: (values: DataType & ObjectLiteral) => DataType & ObjectLiteral;
    /** 自定义操作，不自动打开表单窗口 */
    customAction?: (record: DataType) => any;
  };

  /**
   * 删除props
   */
  deletes?: {
    /** 是否显示 */
    show?: boolean;
    text?: string;
    api?: (params?: any) => Promise<any>;
    /** 删除前操作 */
    onBefore?: (ids: React.Key) => Promise<boolean>;
    /** 自定义操作，不自动打开表单窗口 */
    customAction?: (ids: React.Key) => any;
  };
};

export type CrudColumnsType<T> = ProColumns<T> & ProFormColumnsType<T>;

export type CrudRef<DataType = Record<string, any>, ValueType = 'text'> = {
  /**
   * 表格实例
   */
  tableRef: React.MutableRefObject<ActionType | undefined>;
  /**
   * 弹窗表单实例
   */
  formRef: React.MutableRefObject<ProFormInstance<DataType | any> | undefined>;
  /** 表单模式 */
  formMode: 'add' | 'update' | string;
  /**
   * 当前选中记录
   */
  currentRecord: DataType | null | undefined;
  /**
   * 表格选择项
   */
  selectedRowKeys: React.Key[];
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>>;
  /**
   * 工具栏新增/删除 按钮组
   */
  ToolBarActions: () => JSX.Element[];
};

export type ProFormPropsType<T, ValueType = 'text'> =
  | ((
      | ({
          layoutType?: 'Form';
        } & ProFormProps<T>)
      | ({
          layoutType: 'DrawerForm';
        } & DrawerFormProps<T>)
      | ({
          layoutType: 'ModalForm';
        } & ModalFormProps<T>)
      | ({
          layoutType: 'QueryFilter';
        } & QueryFilterProps<T>)
      | ({
          layoutType: 'LightFilter';
        } & LightFilterProps<T>)
      | ({
          layoutType: 'StepForm';
        } & StepFormProps<T>)
      | {
          layoutType: 'Embed';
        }
    ) & {
      columns: ProFormColumnsType<T, ValueType>[];
    })
  | ({
      layoutType: 'StepsForm';
      columns: ProFormColumnsType<T, ValueType>[][];
    } & StepsFormProps<T>);

/**
 * @description: 查询时间
 */
export type SearchTimes = {
  startTime?: string; // 开始日期
  endTime?: string; // 结束日期
};

/**
 * @description: Response 返回体
 */
export type Response<T = any> = {
  [s: string]: any;
  code?: number;
  data: T;
  message?: string;
};

/**
 * @description: 分页查询
 */
export type PageResponse<T> = {
  [s: string]: any;
  meta: {
    [s: string]: any;
    /**
     * 当前页项目数量
     */
    itemCount: number;
    /**
     * 项目总数量
     */
    totalItems?: number;
    /**
     * 每页显示数量
     */
    itemsPerPage: number;
    /**
     * 总页数
     */
    totalPages?: number;
    /**
     * 当前页数
     */
    currentPage: number;
  };
  items: T[];
};

/**
 * @description: 默认分页查询参数
 */
export type PaginationParams = {
  [s: string]: any;
  page?: number; // 当前页码
  limit?: number; // 每页条数
};
