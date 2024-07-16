'use client';

import { useState } from 'react';
import { Table, TableColumnsType, TableProps } from 'antd';
import { useSearchParams } from 'next/navigation';
import {
  FilterValue,
  SorterResult,
  SortOrder,
  TablePaginationConfig,
} from 'antd/es/table/interface';
import { VesselAdmin, VesselTableAdmin } from '@/interfaces/vessel.interface';
import './componentYachtsTable.scss';
import { getSearchWith } from '@/utils/functions/getSearchWith';
import { getAdminYachtsQuery } from '@/utils/api/getAllVessels';
import { tableColl } from '@/utils/constants';
import TableImage from '../TableImage/TableImage';
type Props = {
  yachtsResponse: VesselTableAdmin;
};

interface TableParams {
  pagination?: TablePaginationConfig;
  filters?: Record<string, FilterValue>;
}

const YachtsTable = ({ yachtsResponse }: Props) => {
  const searchParams = useSearchParams();
  const { currentPage, totalItems, yachts } = yachtsResponse;
  const [yachtsTable, setYachtsTable] = useState(yachts);
  const [current, setCurrent] = useState<number>(currentPage);
  const [loading, setLoading] = useState(false);

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: current,
      defaultCurrent: currentPage,
      defaultPageSize: totalItems,
      align: 'center',
      total: totalItems,
      disabled: loading,
      pageSize: yachts.length,
    },
  });
  const columns: TableColumnsType<VesselAdmin> = [
    {
      title: 'Id',
      dataIndex: 'yacht_id',
      sorter: true,
    },
    {
      title: 'Photo',
      dataIndex: 'yacht_main_image_key',
      render: (yacht_main_image_key) => {
        return (
          <TableImage
            yachtsTable={yachtsTable}
            yacht_main_image_key={yacht_main_image_key}
          />
        );
      },
    },
    ...tableColl.map((coll) => ({
      title: coll.title,
      dataIndex: coll.dataIndex,
      sorter: coll.sorter,
    })),
    {
      title: 'Email',
      dataIndex: 'yacht_owner_email',
      className: 'emailCol',
      width: 128,
      render: (yacht_created_at) => {
        return (
          <>
            {yacht_created_at.slice(0, 7) + '...'}
            <button className='buttonEmailCopy'></button>
          </>
        );
      },
    },
    {
      title: 'Date',
      dataIndex: 'yacht_created_at',
      sorter: true,
    },
    {
      title: 'Action',
      dataIndex: 'action_btn',
      className: 'actionsBtn',
      render: () => {
        return (
          <>
            <button className='buttonAction'></button>
            <button className='buttonAction'></button>
          </>
        );
      },
    },
  ];

  const handleUpdateTableRequest = (
    page: number,
    sorter: SorterResult<VesselAdmin>
  ) => {
    setLoading(true);
    const params = new URLSearchParams(searchParams);
    const queryParams = getSearchWith(params, {
      sortBy: (sorter.field as SortOrder) || null,
      orderBy: sorter.order || null,
      page: page,
    });

    getAdminYachtsQuery(queryParams)
      .then((yachtsResponse) => {
        const newYachts = yachtsResponse as VesselTableAdmin;
        setYachtsTable(newYachts.yachts);
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onChangeTable: TableProps<VesselAdmin>['onChange'] = (
    pagination,
    filters,
    sorter
  ) => {
    setTableParams({
      pagination,
    });

    handleUpdateTableRequest(current, sorter as SorterResult<VesselAdmin>);
  };

  return (
    <div className='tableContainer'>
      3
      <Table
        className='crmYachtsTable'
        columns={columns}
        dataSource={yachtsTable}
        loading={loading}
        onChange={onChangeTable}
        pagination={tableParams.pagination}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default YachtsTable;
