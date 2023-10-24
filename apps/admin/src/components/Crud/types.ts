import { PageResponse, Response } from '@/utils/types';
import {
  DrawerFormProps,
  LightFilterProps,
  ModalFormProps,
  ParamsType,
  ProColumns,
  ProFormColumnsType,
  ProFormProps,
  ProTableProps,
  QueryFilterProps,
  StepFormProps,
  StepsFormProps,
} from '@ant-design/pro-components';

export type ColumnsType<T, V = 'text'> = ProColumns<T, V> & ProFormColumnsType<T>;

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
   * 编辑表单时候填充到表单的字段，可用作替换原字段数据
   */
  fieldsRecord?: (e: DataType) => void;

  /**
   * 表格跟弹窗表单的columns
   */
  columns: ColumnsType<DataType, ValueType>[];

  /**
   * 接口api
   */
  api?: {
    /** 列表接口 */
    list?: (params?: Params) => Promise<Response<DataType[]> | Response<PageResponse<DataType>>>;
    /** 新增接口 */
    create?: (params?: any) => Promise<Response<any>>;
    /** 编辑接口 */
    update?: (params?: any) => Promise<Response<any>>;
    /** 删除接口 */
    delete?: (params?: any) => Promise<Response<any>>;
  };
};

export type CrudColumnsType<T> = ProColumns<T> & ProFormColumnsType<T>;

export type CrudRef = object;

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
