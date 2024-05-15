import { NoticeModel } from './model';
import { CrudColumnsType } from '@/components/Crud';
import { DictTag } from '@/components/Dict';
import { WangEditor } from '@/components/WangEditor';
import { DictTypeEnum } from '@/enums/dictEnum';
import {
  createTimeColumn,
  createTimeInSearch,
  sortColumn,
  statusColumn,
  statusInForm,
} from '@/models/columns';
import { cache, dictMap, getDictData } from '@/models/dict';

const noticeType = DictTypeEnum.SYS_NOTICE_TYPE;

const Columns: CrudColumnsType<NoticeModel>[] = [
  // {
  //   title: '公告ID',
  //   dataIndex: 'noticeId',
  //   search: false,
  // },
  {
    title: '公告标题',
    dataIndex: 'noticeTitle',
    align: 'center',
    formItemProps: {
      rules: [{ required: true }],
    },
  },
  {
    title: '公告类型',
    dataIndex: 'noticeType',
    align: 'center',
    valueType: 'select',
    // hideInTable: true,
    formItemProps: {
      rules: [{ required: true }],
    },
    render: (_, record, index, action, schema) => {
      const statusKey = `${schema.dataIndex || 'noticeType'}`;
      return (
        dictMap[noticeType] && <DictTag options={dictMap[noticeType]} value={record[statusKey]} />
      );
    },
    request: async () => {
      if (!cache.has(noticeType)) {
        cache.add(noticeType);
        const data = await getDictData(noticeType).catch(() => {
          cache.delete(noticeType);
        });
        dictMap[noticeType] = data;
        return data || [];
      }
      return dictMap[noticeType] || [];
    },
  },
  {
    title: '公告内容',
    dataIndex: 'noticeContent',
    search: false,
    hideInTable: true,
    renderFormItem: () => <WangEditor />,
  },
  // { ...sortColumn, dataIndex: 'noticeSort' },
  statusColumn,
  statusInForm,
  createTimeColumn,
  createTimeInSearch,
];

export default Columns;
