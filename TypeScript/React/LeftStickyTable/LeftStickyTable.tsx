import React, { useEffect, useRef, useState, type JSX } from 'react';
import { cn } from '~/libs/utils';
import { SyncScrollBar, useSyncScroll } from './SyncScrollBar';
import { SyncRow, SyncRowProvider, useSyncRow } from './SyncRow';

export type LeftStickyTableProps<T> = {
  containerSize: Size;
  tableOption: LeftStickyTableOption;
  columns: LeftStickyTableColumn<T>[];
  rows: T[];
};

export type LeftStickyTableOption = {
  borderColor: React.CSSProperties['borderColor'];
  column: {
    defaultSort: SortedColumn;
    height: number;
    backgroundColor: React.CSSProperties['backgroundColor'];
    textColor: React.CSSProperties['color'];
  };
  row: {
    height: number;
    evenNumberBackgroundColor: React.CSSProperties['backgroundColor'];
    oddNumberBackgroundColor: React.CSSProperties['backgroundColor'];
  };
};

type Size = {
  height: number;
  width: number;
};

export type LeftStickyTableColumn<T> = HasChildColumn<T> | HasNotChildColumn<T>;

export type HasChildColumn<T> = {
  type: 'HasChild';
  /** 左固定列かどうか true:左固定列*/
  sticky?: boolean;
  /** 表示順序 左から */
  index: number;
  /** 列名称 */
  label: React.ReactNode;
  /** セル ブラウザ標準ツールチップ表示内容 */
  title: (row: T) => string;
  /** ヘッダクリックハンドラ */
  handleHeaderClick?: () => void;
  /** 子列 */
  childColumn: Omit<HasNotChildColumn<T>, 'childColumn'>[];
};

export type HasNotChildColumn<T> = {
  type: 'HasNotChild';
  /** 左固定列かどうか true:左固定列*/
  sticky?: boolean;
  /** 表示順序 左から */
  index: number;
  /** 列名称 */
  label: React.ReactNode;
  /** 列幅 */
  width: number;
  /** セル ブラウザ標準ツールチップ表示内容 */
  title: (row: T) => string;
  /** セル 表示内容 */
  elem: (row: T, rowIndex: number) => JSX.Element;
  /** ヘッダクリックハンドラ */
  handleHeaderClick?: (sortDirection: SortDirection | null) => void;
  /** ソート可能かどうか true:ソート不可 */
  notSortable?: boolean;
  /** 列リサイズができるかどうか true:リサイズ不可 */
  notResizable?: boolean;
};

const extractLeftColumns = <T,>(columns: LeftStickyTableColumn<T>[]) => columns.filter((x) => x.sticky);
const extractRightColumns = <T,>(columns: LeftStickyTableColumn<T>[]) => columns.filter((x) => !x.sticky);
const hasChildColumn = <T,>(column: LeftStickyTableColumn<T>): column is HasChildColumn<T> =>
  column.type === 'HasChild';
const HasNotChildColumn = <T,>(column: LeftStickyTableColumn<T>): column is HasNotChildColumn<T> =>
  column.type === 'HasNotChild';
const sameIndexColumn = <T,>(columns: LeftStickyTableColumn<T>[], index: number) =>
  columns.find((x) => x.index === index)!;
const sameIndexHasChildColumn = <T,>(
  columns: LeftStickyTableColumn<T>[],
  index: number,
): HasChildColumn<T> | undefined => columns.filter(hasChildColumn).find((x) => x.index === index);
const sameIndexHasNotChildColumn = <T,>(
  columns: LeftStickyTableColumn<T>[],
  index: number,
): HasNotChildColumn<T> | undefined => columns.filter(HasNotChildColumn).find((x) => x.index === index);
const getWidth = <T,>(column: LeftStickyTableColumn<T>) =>
  column.type === 'HasNotChild'
    ? column.width
    : column.childColumn.map((child) => child.width).reduce((a, b) => a + b, 0);

function Table<T>({ containerSize, tableOption, columns, rows }: LeftStickyTableProps<T>) {
  return (
    <SyncScrollBar.Root width={containerSize.width} height={containerSize.height}>
      {/** テーブル範囲選択でのテキスト選択はなし */}
      <div className="p-2 bg-blue-50 select-none">
        <SyncScrollBar.Follower />
        <SyncScrollBar.Base
          className={cn('bg-white overflow-y-auto text-xs border')}
          style={{ borderColor: tableOption.borderColor }}
        >
          <StickyTableContent tableOption={tableOption} columns={columns} rows={rows} />
        </SyncScrollBar.Base>
      </div>
    </SyncScrollBar.Root>
  );
}

function HeaderCell({ children }: { children: React.ReactNode }) {
  return <div className="px-2 text-center">{children}</div>;
}

function CenterCell({ children }: { children: React.ReactNode }) {
  return <div className="px-2 text-center w-full select-text">{children}</div>;
}

function LeftCell({ children }: { children: React.ReactNode }) {
  return <div className="px-2 text-left w-full select-text">{children}</div>;
}

function RightCell({ children }: { children: React.ReactNode }) {
  return <div className="px-2 text-right w-full select-text">{children}</div>;
}

function CheckBoxCell({ checked, ...props }: React.HTMLAttributes<HTMLInputElement> & { checked: boolean }) {
  return (
    <div className="flex items-center justify-center">
      <input {...props} type="checkbox" checked={checked} />
    </div>
  );
}

function StickyTableContent<T>({ tableOption, columns, rows }: Omit<LeftStickyTableProps<T>, 'containerSize'>) {
  const [columnsState, setColumnsState] = useState<LeftStickyTableColumn<T>[]>(columns);
  const [sortedState, setSortedState] = useState<SortedColumn>(tableOption.column.defaultSort);
  const { syncWidthByVerticalScrollbar } = useSyncScroll();

  //index重複チェック 重複時はthrow
  useEffect(() => {
    const childColumns = columns
      .filter(hasChildColumn)
      .map((x) => x.childColumn)
      .flatMap((x) => x);
    const hasNotChildColumns = columns.filter(HasNotChildColumn);

    const isDuplicated =
      new Set(childColumns.map((x) => x.index)).size !== childColumns.length ||
      new Set(hasNotChildColumns.map((x) => x.index)).size !== hasNotChildColumns.length;

    if (isDuplicated)
      throw new Error(`LeftStickyTableのcolumns要素内のindexが重複しています。indexはuniqueにしてください`);
  }, []);

  // 縦スクロールバー表示状態によるwidth同期
  useEffect(() => {
    syncWidthByVerticalScrollbar();
  }, [rows]);

  /** 行データなし */
  if (rows.length === 0) {
    return (
      <div className="flex flex-col">
        {/** all header 左列固定はなし */}
        <div className={`flex bg-gray-200`}>
          <div className={`flex items-center`}>
            {columns.map((allColumn) => (
              <StickyTableHeader
                tableOption={tableOption}
                columunsState={columnsState}
                setColumnsState={setColumnsState}
                sortedState={sortedState}
                setSortedState={setSortedState}
                column={allColumn}
              />
            ))}
          </div>
        </div>
        {/** dummy row */}
        <div
          className={cn('flex items-center justify-center bg-white border', tableOption.borderColor)}
          style={{
            height: tableOption.column.height,
            width: columnsState
              .map((x) => (hasChildColumn(x) ? x.childColumn.map((y) => y.width) : x.width))
              .flatMap((x) => x)
              .reduce((a, b) => a + b, 0),
          }}
        >
          データがありません
        </div>
      </div>
    );
  }
  /** 行データあり */
  return (
    <SyncRowProvider>
      <div className="flex">
        <div className={`flex bg-gray-200`}>
          <div className={`flex items-center z-10 sticky left-0`}>
            {extractLeftColumns(columns).map((leftColumn, i) => (
              <div key={`left-pane-${i}`}>
                {/** left header */}
                <StickyTableHeader
                  tableOption={tableOption}
                  columunsState={columnsState}
                  setColumnsState={setColumnsState}
                  sortedState={sortedState}
                  setSortedState={setSortedState}
                  column={leftColumn}
                />
                {/** left body */}
                {rows.map((row, rowIndex) => (
                  <SyncRow rowIndex={rowIndex}>
                    <StickyTableRow
                      key={`left-row-${rowIndex}`}
                      rowIndex={rowIndex}
                      tableOption={tableOption}
                      columunsState={columnsState}
                      column={leftColumn}
                      row={row}
                    />
                  </SyncRow>
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center">
            {extractRightColumns(columns).map((rightColumn, i) => (
              <div key={`right-pane-${i}`}>
                {/** right header */}
                <StickyTableHeader
                  tableOption={tableOption}
                  columunsState={columnsState}
                  setColumnsState={setColumnsState}
                  sortedState={sortedState}
                  setSortedState={setSortedState}
                  column={rightColumn}
                />
                {/** right body */}
                {rows.map((row, rowIndex) => (
                  <SyncRow rowIndex={rowIndex}>
                    <StickyTableRow
                      key={`right-row-${rowIndex}`}
                      rowIndex={rowIndex}
                      tableOption={tableOption}
                      columunsState={columnsState}
                      column={rightColumn}
                      row={row}
                    />
                  </SyncRow>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SyncRowProvider>
  );
}

type StickyTableHeaderProps<T> = {
  tableOption: LeftStickyTableOption;
  columunsState: LeftStickyTableColumn<T>[];
  setColumnsState: React.Dispatch<React.SetStateAction<LeftStickyTableColumn<T>[]>>;
  sortedState: SortedColumn;
  setSortedState: React.Dispatch<React.SetStateAction<SortedColumn>>;
  column: LeftStickyTableColumn<T>;
};

type SortedColumn = { target: 'parent' | 'child'; columnIndex: Number; sorted: SortDirection };
type SortDirection = 'ASC' | 'DESC';

function StickyTableHeader<T>({
  tableOption,
  columunsState,
  setColumnsState,
  sortedState,
  setSortedState,
  column,
}: StickyTableHeaderProps<T>) {
  const sortMark = (target: 'parent' | 'child', index: number) => {
    return (
      <span>
        {sortedState.target === target && sortedState.columnIndex === index
          ? sortedState.sorted === 'ASC'
            ? '▼'
            : '▲'
          : null}
      </span>
    );
  };

  const handleSort = (target: 'parent' | 'child', index: number) => {
    let nextSortDirection: SortDirection = 'ASC';
    setSortedState((prev) => {
      if (prev.target === target && prev.columnIndex === index) {
        nextSortDirection = prev.sorted === 'ASC' ? 'DESC' : 'ASC';
        return { ...prev, target: target, sorted: nextSortDirection };
      } else {
        nextSortDirection = 'ASC';
        return { target: target, columnIndex: index, sorted: nextSortDirection };
      }
    });
    return nextSortDirection;
  };

  if (hasChildColumn(column)) {
    //2段構成列の場合
    return (
      <div
        className={cn('sticky top-0 font-bold')}
        style={{ backgroundColor: tableOption.column.backgroundColor, color: tableOption.column.textColor }}
      >
        <div>
          <div
            className={cn(
              'box-border flex item-center justify-center whitespace-nowrap overflow-x-hidden border-r border-b',
            )}
            style={{
              height: tableOption.column.height / 2,
              width: 'auto',
              borderColor: tableOption.borderColor,
            }}
            onClick={() => {
              column.handleHeaderClick?.();
            }}
          >
            {column.label}
          </div>
        </div>
        <div className="flex items-center justify-center whitespace-nowrap overflow-x-hidden">
          {column.childColumn.map((childColumn, i) => (
            <div
              key={`right-child-col-${i}`}
              className={cn('relative')}
              style={{
                width: sameIndexHasChildColumn(columunsState, column.index)!.childColumn!.find(
                  (x) => x.index === childColumn.index,
                )!.width,
              }}
            >
              <div
                className={cn(
                  'flex item-center justify-center font-bold whitespace-nowrap overflow-x-hidden box-border border-r border-b',
                )}
                style={{ height: tableOption.column.height / 2, borderColor: tableOption.borderColor }}
                onClick={() => {
                  if (!childColumn.notSortable) {
                    const nextSortDirection = handleSort('child', childColumn.index);
                    childColumn.handleHeaderClick?.(nextSortDirection);
                  } else {
                    childColumn.handleHeaderClick?.(null);
                  }
                }}
              >
                {childColumn.label}
                {!childColumn.notSortable ? sortMark('child', childColumn.index) : null}
              </div>
              {!childColumn.notResizable && (
                <ResizeHandle
                  columnsState={columunsState}
                  setColumnsState={setColumnsState}
                  columnIndex={column.index}
                  childColumnIndex={childColumn.index}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    //1段構成列の場合
    return (
      <div className={cn('sticky top-0 font-bold')}>
        <div
          className={cn(
            'box-border flex items-center justify-center whitespace-nowrap overflow-x-hidden border-r border-b',
          )}
          style={{
            height: tableOption.column.height,
            width: getWidth(sameIndexColumn(columunsState, column.index)),
            backgroundColor: tableOption.column.backgroundColor,
            color: tableOption.column.textColor,
            borderColor: tableOption.borderColor,
          }}
          onClick={() => {
            if (!column.notSortable) {
              const nextSortDirection = handleSort('parent', column.index);
              column.handleHeaderClick?.(nextSortDirection);
            } else {
              column.handleHeaderClick?.(null);
            }
          }}
        >
          {column.label}
          {!column.notSortable ? sortMark('parent', column.index) : null}
        </div>
        {!column.notResizable && (
          <ResizeHandle columnsState={columunsState} setColumnsState={setColumnsState} columnIndex={column.index} />
        )}
      </div>
    );
  }
}

type StickyTableRowProps<T> = {
  rowIndex: number;
  tableOption: LeftStickyTableOption;
  columunsState: LeftStickyTableColumn<T>[];
  column: LeftStickyTableColumn<T>;
  row: T;
};

function StickyTableRow<T>({ rowIndex, tableOption, columunsState, column, row }: StickyTableRowProps<T>) {
  const { hoverIndex } = useSyncRow();
  const hoverBackgroudColor = '#dbeafe';
  const baseBackgroundColor =
    rowIndex % 2 ? tableOption.row.oddNumberBackgroundColor : tableOption.row.evenNumberBackgroundColor;
  const isHover = hoverIndex === rowIndex;
  if (hasChildColumn(column)) {
    //2段構成列の場合
    return (
      <div className="flex items-center justify-center h-full whitespace-nowrap overflow-x-hidden">
        {column.childColumn.map((childColumn, childRowIndex) => (
          <div
            key={`right-child-row-${childRowIndex}`}
            className={cn('h-full flex items-center box-border border-r border-b')}
            style={{
              height: tableOption.row.height,
              width: sameIndexHasChildColumn(columunsState, column.index)!.childColumn!.find(
                (x) => x.index === childColumn.index,
              )!.width,
              borderColor: tableOption.borderColor,
              backgroundColor: isHover ? hoverBackgroudColor : baseBackgroundColor,
            }}
            title={childColumn.title(row)}
          >
            {childColumn.elem(row, rowIndex)}
          </div>
        ))}
      </div>
    );
  } else {
    //1段構成列の場合
    return (
      <div
        className={cn(`flex items-center whitespace-nowrap overflow-x-hidden box-border border-r border-b`)}
        style={{
          height: tableOption.row.height,
          width: getWidth(sameIndexColumn(columunsState, column.index)),
          borderColor: tableOption.borderColor,
          backgroundColor: isHover ? hoverBackgroudColor : baseBackgroundColor,
        }}
        title={column.title(row)}
      >
        {column.elem(row, rowIndex)}
      </div>
    );
  }
}

type ResizeHandleProps<T> = {
  columnsState: LeftStickyTableColumn<T>[];
  setColumnsState: React.Dispatch<React.SetStateAction<LeftStickyTableColumn<T>[]>>;
  columnIndex: number;
  childColumnIndex?: number;
};

function ResizeHandle<T>({ columnsState, setColumnsState, columnIndex, childColumnIndex }: ResizeHandleProps<T>) {
  const startX = useRef(0);
  const startWidth = useRef(0);
  const selectedColumnIndex = useRef<number>(null);
  const selectedChildColumnIndex = useRef<number | undefined>(null);
  const { syncWidth } = useSyncScroll();

  const onMouseDown = (e: React.MouseEvent, index: number, childIndex?: number) => {
    document.body.style.cursor = 'col-resize'; //ポインターを固定
    document.body.style.userSelect = 'none'; //移動範囲内の文字選択をしないようにする

    selectedColumnIndex.current = index;
    selectedChildColumnIndex.current = childIndex;
    startX.current = e.clientX;
    const targetColumn = sameIndexColumn(columnsState, index);
    if (hasChildColumn(targetColumn)) {
      startWidth.current = targetColumn.childColumn.find((x) => x.index === childIndex)!.width;
    } else {
      startWidth.current = targetColumn.width;
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    const diff = e.clientX - startX.current;
    if (selectedColumnIndex.current == null || selectedChildColumnIndex.current === null) return;
    if (selectedChildColumnIndex.current !== undefined) {
      const targetColumn = sameIndexHasChildColumn(columnsState, selectedColumnIndex.current)!;
      setColumnsState((prev) =>
        prev.map((x) =>
          x.index === targetColumn.index && hasChildColumn(x)
            ? {
                ...x,
                childColumn: x.childColumn.map((child) =>
                  child.index === selectedChildColumnIndex.current
                    ? { ...child, width: Math.round(startWidth.current + diff) }
                    : child,
                ),
              }
            : x,
        ),
      );
    } else {
      const targetColumn = sameIndexHasNotChildColumn(columnsState, selectedColumnIndex.current)!;
      setColumnsState((prev) =>
        prev.map((x) => (x.index === targetColumn.index ? { ...x, width: Math.round(startWidth.current + diff) } : x)),
      );
    }
    syncWidth();
  };

  const onMouseUp = () => {
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  return (
    <div
      className="w-[10px] cursor-col-resize absolute top-0 right-0 h-full hover:bg-blue-300 bg-transparent"
      onMouseDown={(e) => onMouseDown(e, columnIndex, childColumnIndex)}
    />
  );
}

type LeftStickyTableType = {
  Table: typeof Table;
  Cell: {
    Header: typeof HeaderCell;
    Center: typeof CenterCell;
    Left: typeof LeftCell;
    Right: typeof RightCell;
    Checkbox: typeof CheckBoxCell;
  };
};

export const LeftStickyTable = {
  Table,
  Cell: {
    Header: HeaderCell,
    Center: CenterCell,
    Left: LeftCell,
    Right: RightCell,
    Checkbox: CheckBoxCell,
  },
} satisfies LeftStickyTableType;
