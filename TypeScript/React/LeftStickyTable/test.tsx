import type { LeftStickyTableColumn, LeftStickyTableOption } from '~/components/LeftStickyTable';
import LeftStickyTable from '~/components/LeftStickyTable';
import { Card } from '~/components/ui/card';

type DummyRow = {
  id: number;
  kind: string;
  value1: string;
  value2: string;
  value3: string;
  code: string;
  name: string;
};

const rows: DummyRow[] = [
  { id: 0, kind: '通常', value1: 'value1-1', value2: 'test2-1', value3: 'test3-1', code: 'X0000', name: 'X000名称' },
  { id: 1, kind: '通常', value1: 'value1-2', value2: 'test2-2', value3: 'test3-2', code: 'X0000', name: 'X000名称' },
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

const tableOption: LeftStickyTableOption = {
  tableSize: {
    height: 320,
    width: 1520,
  },
  colmunHeight: 54,
  rowHeight: 36,
};

const columns: LeftStickyTableColumn<DummyRow>[] = [
  {
    type: 'HasNotChild',
    sticky: true,
    index: 0,
    label: 'ID',
    width: 120,
    title: (row) => row.id.toString(),
    elem: (row) => (
      <div className="flex items-center text-center w-full">
        <a className="text-blue-600 underline w-full">{row.id}</a>
      </div>
    ),
    handleHeaderClick: () => alert('id clicked'),
  },
  {
    type: 'HasNotChild',
    sticky: true,
    index: 1,
    width: 120,
    label: '種別',
    title: (row) => row.kind,
    elem: (row) => (
      <div className="h-full">
        <div className="h-1/2">{row.kind}</div>
        <div className="h-1/2">2row</div>
      </div>
    ),
    handleHeaderClick: () => alert('kind clicked'),
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
    index: 2,
    label: 'code/name',
    title: (row) => row.value1,
    handleHeaderClick: () => alert('value1 clicked'),
    childColumn: [
      {
        type: 'HasNotChild',
        index: 0,
        label: 'code',
        width: 80,
        title: (row) => row.code,
        elem: (row) => <span>{row.code}</span>,
        handleHeaderClick: () => alert('code clicked'),
      },
      {
        type: 'HasNotChild',
        index: 1,
        label: 'name',
        width: 80,
        title: (row) => row.name,
        elem: (row) => <span>{row.name}</span>,
        handleHeaderClick: () => alert('name clicked'),
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
    index: 3,
    label: '値1',
    width: 160,
    title: (row) => row.value1,
    elem: (row) => <span>{row.value1}</span>,
    handleHeaderClick: () => alert('value1 clicked'),
  },
  {
    type: 'HasNotChild',
    index: 4,
    label: '値2',
    width: 160,
    title: (row) => row.value1,
    elem: (row) => (
      <div>
        <div>{row.value2}</div>
      </div>
    ),
    handleHeaderClick: () => alert('value2 clicked'),
  },
  {
    type: 'HasNotChild',
    index: 5,
    label: '値3',
    width: 160,
    title: (row) => row.value2,
    elem: (row) => <span>{row.value2}</span>,
    handleHeaderClick: () => alert('value3 clicked'),
  },
];

export default function Test() {
  return (
    <div className="felx">
      {/* <Card className="h-1/3 w-[800px] p-4 mt-20 flex items-center">
        old
        <ScrollableTable />
      </Card> */}
      <Card className="h-1/3 w-[800px] p-4 my-10 flex items-center">
        new
        <LeftStickyTable tableOption={tableOption} columns={columns} rows={rows} />
      </Card>
    </div>
  );
}
