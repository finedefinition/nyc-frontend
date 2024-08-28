'use client';
import { useState } from 'react';
import {
  Pagination,
  PaginationProps,
  Table,
  TableColumnsType,
  TableProps,
} from 'antd';
import { SorterResult, SortOrder } from 'antd/es/table/interface';
import { VesselAdmin, VesselTableAdmin } from '@/interfaces/vessel.interface';
import './componentYachtsTable.scss';
import { getSearchWith } from '@/utils/functions/getSearchWith';
import { getAdminYachtsQuery } from '@/utils/api/getAllVessels';
import { tableColl } from '@/utils/constants';
import useCurrentSearchParams from '@/hooks/useCurrentSearchParams';
import TableImage from '../TableImage/TableImage';
import HeadSearch from '../HeadSearch/HeadSearch';

type Props = {
  yachtsResponse: VesselTableAdmin;
};

const YachtsTable = ({ yachtsResponse }: Props) => {
  const [currentSearchParams, setCurrentSearchParams] = useCurrentSearchParams();
  const [yachtsResponseData, setYachtsResponse] = useState(yachtsResponse);
  const [current, setCurrent] = useState<number>(yachtsResponseData.currentPage);
  const [sorter, setSorter] = useState<SorterResult<VesselAdmin> | object>({});
  const [loading, setLoading] = useState(false);

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
            yachtsTable={yachtsResponseData.yachts}
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
    page: number | string,
    sorter: SorterResult<VesselAdmin>
  ) => {
    setLoading(true);
    const params = new URLSearchParams(currentSearchParams);
    const queryParams = getSearchWith(params, {
      sortBy: (sorter.field as SortOrder) ?? null,
      orderBy: sorter.order ?? null,
      page: page.toString(),
    });
    
    setCurrentSearchParams(queryParams);
    
    getAdminYachtsQuery(queryParams)
      .then((yachtsResponse) => {
        const newYachts = yachtsResponse as VesselTableAdmin;
        // eslint-disable-next-line
        console.log(yachtsResponse);
        setYachtsResponse(newYachts);
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
    setSorter(sorter);
    handleUpdateTableRequest('current', sorter as SorterResult<VesselAdmin>);
  };

  const onChangePagination: PaginationProps['onChange'] = (page) => {
    setCurrent(page);
    handleUpdateTableRequest(page, sorter);
  };

  return (
    <>
      <HeadSearch
        setLoading={(status: boolean) => {
          setLoading(status);
        }}
        setQuery={(query: string) => {
          setCurrentSearchParams(query);
        }}
        handleSubmit={() => {
          handleUpdateTableRequest(1, sorter)
        }}
        currentQuery={currentSearchParams}
        loading={loading}
      />
      <div className='tableContainer'>
        <Table
          className='crmYachtsTable'
          columns={columns}
          dataSource={yachtsResponseData.yachts}
          loading={loading}
          onChange={onChangeTable}
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
        <Pagination
          current={current}
          defaultPageSize={yachtsResponseData.totalItems}
          align={'center'}
          onChange={onChangePagination}
          total={yachtsResponseData.totalItems}
          disabled={loading}
          pageSize={yachtsResponseData.yachts.length}
        />
      </div>
    </>
  );
};

export default YachtsTable;
