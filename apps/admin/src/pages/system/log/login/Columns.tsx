import { LoginLogModel } from './model';
import { CrudColumnsType } from '@/components/Crud';
import { DictTag } from '@/components/Dict';
import { DictTypeEnum } from '@/enums/dictEnum';
import { createTimeColumn, createTimeInSearch } from '@/models/columns';
import { getDictData, cache, dictMap } from '@/models/dict';

const statusType = DictTypeEnum.SYS_SUCCESS_FAILURE;

const Columns: CrudColumnsType<LoginLogModel>[] = [
  {
    title: '日志编号',
    dataIndex: 'loginId',
    search: false,
    align: 'center',
  },
  {
    title: '用户名称',
    dataIndex: 'loginName',
    align: 'center',
  },
  {
    title: '登录地址',
    dataIndex: 'loginIp',
    search: false,
    align: 'center',
  },
  {
    title: '登录地点',
    dataIndex: 'loginLocation',
    search: false,
    align: 'center',
  },
  {
    title: '浏览器',
    dataIndex: 'browser',
    search: false,
    align: 'center',
  },
  {
    title: '操作系统',
    dataIndex: 'os',
    search: false,
    align: 'center',
  },
  {
    title: '登录状态',
    dataIndex: 'loginStatus',
    valueType: 'select',
    align: 'center',
    hideInForm: true,
    render: (_, record) => {
      return (
        dictMap[statusType] && <DictTag options={dictMap[statusType]} value={record.loginStatus} />
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
    title: '登录日期',
  },
  { ...createTimeInSearch, title: '登录日期', valueType: 'dateTimeRange' },
];

export default Columns;
