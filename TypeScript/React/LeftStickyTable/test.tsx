import { useState } from 'react';
import { LeftStickyTable, type LeftStickyTableColumn, type LeftStickyTableOption } from '~/components/LeftStickyTable';
import { Card } from '~/components/ui/card';

type DummyRow = {
  id: number;
  kind: string;
  value1: string;
  value2: string;
  value3: string;
  code: string;
  name: string;
  checked?: boolean;
};

const rows: DummyRow[] = [
  {
    checked: true,
    id: 0,
    kind: '通常',
    value1: 'value1-1',
    value2: 'test2-1',
    value3: 'test3-1',
    code: 'X0000',
    name: 'X000名称',
  },
  {
    checked: false,
    id: 1,
    kind: '通常',
    value1: 'value1-2',
    value2: 'test2-2',
    value3: 'test3-2',
    code: 'X0000',
    name: 'X000名称',
  },
  {
    id: 2,
    kind: '優先',
    value1: 'value1-2aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    value2: 'test2-3',
    value3: 'test3-3',
    code: 'X0000',
    name: 'X000名称',
  },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
  { id: 3, kind: '優先', value1: 'value1-2', value2: 'test2-4', value3: 'test3-4', code: 'X0000', name: 'X000名称' },
];
const columns: LeftStickyTableColumn<DummyRow>[] = [
  {
    type: 'HasNotChild',
    sticky: true,
    index: 0,
    label: (
      <LeftStickyTable.Cell.Center>
        <LeftStickyTable.Cell.Checkbox checked={false} />
      </LeftStickyTable.Cell.Center>
    ),
    width: 40,
    title: (row) => row.id.toString(),
    elem: (row) => (
      <LeftStickyTable.Cell.Center>
        <LeftStickyTable.Cell.Checkbox checked={row.checked!} />
      </LeftStickyTable.Cell.Center>
    ),
    notSortable: true,
    notResizable: true,
  },
  {
    type: 'HasNotChild',
    sticky: true,
    index: 1,
    label: <LeftStickyTable.Cell.Header>ID</LeftStickyTable.Cell.Header>,
    width: 120,
    title: (row) => row.id.toString(),
    elem: (row) => (
      <div className="flex items-center text-center w-full">
        <a className="text-blue-600 underline w-full">{row.id}</a>
      </div>
    ),
  },
  {
    type: 'HasNotChild',
    sticky: true,
    index: 2,
    width: 120,
    label: <LeftStickyTable.Cell.Header>種別</LeftStickyTable.Cell.Header>,
    title: (row) => row.kind,
    elem: (row) => (
      <LeftStickyTable.Cell.Center>
        <div className="h-1/2">{row.kind}</div>
        <div className="h-1/2">2row</div>
      </LeftStickyTable.Cell.Center>
    ),
    // childColumn: [
    //   {
    //     type: 'HasNotChild',
    //     sticky: true,
    //     index: 1,
    //     label: '種別',
    //     width: 120,
    //     title: (row) => row.kind,
    //     elem: (row) => (
    //       <div className="h-full">
    //         <div className="h-1/2">{row.kind}</div>
    //         <div className="h-1/2">2row</div>
    //       </div>
    //     ),
    //     handleHeaderClick() {},
    //   },
    // ],
  },
  {
    type: 'HasChild',
    index: 3,
    label: 'code/name',
    title: (row) => row.value1,
    childColumn: [
      {
        type: 'HasNotChild',
        index: 0,
        label: 'code',
        width: 80,
        title: (row) => row.code,
        elem: (row) => <LeftStickyTable.Cell.Left>{row.code}</LeftStickyTable.Cell.Left>,
      },
      {
        type: 'HasNotChild',
        index: 1,
        label: 'name',
        width: 80,
        title: (row) => row.name,
        elem: (row) => <LeftStickyTable.Cell.Center>{row.name}</LeftStickyTable.Cell.Center>,
      },
      {
        type: 'HasNotChild',
        index: 2,
        label: 'other',
        width: 80,
        title: (row) => row.name,
        elem: (row) => <LeftStickyTable.Cell.Right>other</LeftStickyTable.Cell.Right>,
        handleHeaderClick(sortDirection) {
          alert(sortDirection);
        },
      },
      // {
      //   type: 'HasNotChild',
      //   index: 2,
      //   label: 'therd',
      //   width: 80,
      //   title: (row) => row.name,
      //   elem: (row) => <span>{row.name}</span>,
      //   handleHeaderClick: () => alert('name clicked'),
      // },
      // {
      //   type: 'HasNotChild',
      //   index: 3,
      //   label: 'therd',
      //   width: 80,
      //   title: (row) => row.name,
      //   elem: (row) => <span>{row.name}</span>,
      //   handleHeaderClick: () => alert('name clicked'),
      // },
      // {
      //   type: 'HasNotChild',
      //   index: 4,
      //   label: 'therd',
      //   width: 80,
      //   title: (row) => row.name,
      //   elem: (row) => <span>{row.name}</span>,
      //   handleHeaderClick: () => alert('name clicked'),
      // },
      // {
      //   type: 'HasNotChild',
      //   index: 5,
      //   label: 'therd',
      //   width: 80,
      //   title: (row) => row.name,
      //   elem: (row) => <span>{row.name}</span>,
      //   handleHeaderClick: () => alert('name clicked'),
      // },
    ],
  },
  {
    type: 'HasNotChild',
    index: 4,
    label: <LeftStickyTable.Cell.Center>値1</LeftStickyTable.Cell.Center>,
    width: 160,
    title: (row) => row.value1,
    elem: (row) => <span>{row.value1}</span>,
  },
  {
    type: 'HasNotChild',
    index: 5,
    label: '値2',
    width: 160,
    title: (row) => row.value1,
    elem: (row) => (
      <div>
        <div>{row.value2}</div>
      </div>
    ),
    handleHeaderClick: (sort) => alert(sort),
  },
  {
    type: 'HasNotChild',
    index: 6,
    label: '値3',
    width: 160,
    title: (row) => row.value2,
    elem: (row) => <span>{row.value2}</span>,
  },
];

export default function Test() {
  const [rowsState, setRowsState] = useState<DummyRow[]>(rows);
  return (
    <div className="felx">
      {/* <Card className="h-1/3 w-[800px] p-4 mt-20 flex items-center">
        old
        <ScrollableTable />
      </Card> */}
      <Card className="h-1/3 w-[800px] p-4 my-10 flex items-center">
        new
        <button onClick={() => setRowsState(Math.floor(Math.random() * 2) ? rows.slice(0, 3) : [])}>rows change</button>
        <LeftStickyTable.Table
          containerSize={{
            height: 320,
            width: window.innerWidth * 0.5,
          }}
          columns={columns}
          rows={rowsState}
          tableOption={{
            borderColor: '#dcdcdc',
            column: {
              defaultSort: {
                target: 'child',
                columnIndex: 2,
                sorted: 'ASC',
              },
              height: 36,
              backgroundColor: '#f5f5f5',
              textColor: '#0000FF',
            },
            row: {
              height: 24,
              evenNumberBackgroundColor: '#FFFFFF',
              oddNumberBackgroundColor: '#F2F2F2',
            },
          }}
        />
      </Card>
    </div>
  );
}
