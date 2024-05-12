import { OnlineModel } from './model';
import { CrudColumnsType } from '@/components/Crud';

const Columns: CrudColumnsType<OnlineModel>[] = [
  {
    title: '会话编号',
    dataIndex: 'userSk',
    search: false,
    align: 'center',
  },
  {
    title: '用户名称',
    dataIndex: 'userName',
    align: 'center',
  },
  {
    title: '用户昵称',
    dataIndex: 'nickName',
    search: false,
    align: 'center',
  },
  {
    title: '登录地址',
    dataIndex: 'loginIp',
    align: 'center',
  },
  {
    title: '登录时间',
    dataIndex: 'loginTime',
    search: false,
    align: 'center',
  },
];

export default Columns;
