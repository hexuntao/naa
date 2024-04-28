import { createTimeColumn, createTimeInSearch, statusColumn } from '@/models/columns';
import { OperLogModel } from './model';
import { CrudColumnsType } from '@/components/Crud';
import { cache, dictMap, getDictData } from '@/models/dict';
import { DictTypeEnum } from '@/enums/dictEnum';
import { DictTag } from '@/components/Dict';

const statusType = DictTypeEnum.SYS_SUCCESS_FAILURE;
const operType = DictTypeEnum.SYS_OPER_TYPE;

const Columns: CrudColumnsType<OperLogModel>[] = [
  {
    title: '日志编号',
    dataIndex: 'operId',
    search: false,
    hideInTable: true,
    align: 'center',
  },
  {
    title: '系统模块',
    dataIndex: 'title',
    align: 'center',
  },
  {
    title: '操作类型',
    dataIndex: 'operType',
    valueType: 'select',
    align: 'center',
    render: (_, record) => {
      return dictMap[operType] && <DictTag options={dictMap[operType]} value={record.operType} />;
    },
    request: async () => {
      if (!cache.has(operType)) {
        cache.add(operType);
        const data = await getDictData(operType).catch(() => {
          cache.delete(operType);
        });
        dictMap[operType] = data;
        return data || [];
      }
      return dictMap[operType] || [];
    },
  },
  {
    title: '操作人员',
    dataIndex: 'operName',
    align: 'center',
  },
  {
    title: '请求方式',
    dataIndex: 'requestMethod',
    search: false,
    align: 'center',
  },
  {
    title: '请求地址',
    dataIndex: 'requestUrl',
    hideInTable: true,
    align: 'center',
  },
  {
    title: '操作状态',
    dataIndex: 'operStatus',
    valueType: 'select',
    align: 'center',
    hideInForm: true,
    render: (_, record) => {
      return (
        dictMap[statusType] && <DictTag options={dictMap[statusType]} value={record.operStatus} />
      );
    },
    request: async () => {
      if (!cache.has(statusType)) {
        cache.add(statusType);
        const data = await getDictData(statusType).catch(() => {
          cache.delete(statusType);
        });
        dictMap[statusType] = data;
        return data || [];
      }
      return dictMap[statusType] || [];
    },
  },
  {
    ...createTimeColumn,
    title: '操作日期',
  },
  { ...createTimeInSearch, title: '操作日期', valueType: 'dateTimeRange' },
];

export default Columns;
