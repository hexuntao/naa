import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { useAccess } from '@umijs/max';
import { eachTree } from '@/utils/tree';
import Crud from '@/components/Crud';
import { DeptModel, ListDeptParams, DeptTreeResult } from './model';
import Columns from './Columns';
import { add, deletes, getTreeList, update } from './services';

const Dept = () => {
  const { hasPermission } = useAccess();

  /**
   * 处理默认展开
   * @param data 列数据
   */
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly React.Key[]>([]);
  const handleExpandedRows = (data: DeptTreeResult[]) => {
    const keys: React.Key[] = [];
    eachTree<DeptTreeResult>(data, (item) => {
      if (isEmpty(item.children)) {
        item.children = undefined;
      } else if (isEmpty(expandedRowKeys)) {
        keys.push(item.deptId);
      }
    });
    if (isEmpty(expandedRowKeys)) {
      setExpandedRowKeys(keys);
    }
  };

  return (
    <Crud<DeptModel, ListDeptParams>
      rowKey="deptId"
      useRowSelection={false}
      columns={Columns}
      tableProps={{
        search: false,
        pagination: false,
        expandable: {
          expandedRowKeys,
          onExpandedRowsChange: setExpandedRowKeys,
        },
      }}
      list={{
        api: getTreeList,
        postData(data) {
          handleExpandedRows(data);
          return data;
        },
      }}
      add={{
        show: hasPermission('system:dept:add'),
        api: add,
      }}
      update={{
        show: hasPermission('system:dept:update'),
        api: update,
      }}
      deletes={{
        show: hasPermission('system:dept:delete'),
        api: deletes,
      }}
    />
  );
};

export default Dept;
