import React, { useEffect, useRef, useState, type JSX } from 'react';
import { cn } from '~/libs/utils';

export type LeftStickyTableProps<T> = {
  tableOption: LeftStickyTableOption;
  columns: LeftStickyTableColumn<T>[];
  rows: T[];
};

export type LeftStickyTableOption = {
  /** テーブルサイズ */
  tableSize: Size;
  colmunHeight: number;
  /** 行 高さ */
  rowHeight: number;
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
  label: string;
  /** セル ブラウザ標準ツールチップ表示内容 */
  title: (row: T) => string;
  /** ヘッダクリックハンドラ */
  handleHeaderClick: () => void;
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
  label: string;
  /** 列幅 */
  width: number;
  /** セル ブラウザ標準ツールチップ表示内容 */
  title: (row: T) => string;
  /** セル 表示内容 */
  elem: (row: T) => JSX.Element;
  /** ヘッダクリックハンドラ */
  handleHeaderClick: () => void;
  /** 列リサイズ可能かどうか true:リサイズ可能(default), false: リサイズ不可 */
  resizable?: boolean;
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

type ResizeHandleProps = {
  columnIndex: number;
  childColumnIndex?: number;
  onMouseDown: (e: React.MouseEvent, columnIndex: number, childColumnIndex?: number) => void;
};

function ResizeHandle({ columnIndex, childColumnIndex, onMouseDown }: ResizeHandleProps) {
  return (
    <div
      className="w-[10px] cursor-col-resize absolute top-0 right-0 h-full hover:bg-blue-400 bg-transparent"
      onMouseDown={(e) => onMouseDown(e, columnIndex, childColumnIndex)}
    />
  );
}

export default function LeftStickyTable<T>({ tableOption, columns, rows }: LeftStickyTableProps<T>) {
  const topScrollRef = useRef<HTMLDivElement>(null);
  const topInnerRef = useRef<HTMLDivElement>(null);
  const mainScrollRef = useRef<HTMLDivElement>(null);
  const [columunsState, setColumunsState] = useState<LeftStickyTableColumn<T>[]>(columns);

  const startX = useRef(0);
  const startWidth = useRef(0);
  const columnIndex = useRef<number>(null);
  const columnChildIndex = useRef<number | undefined>(null);

  const syncWidth = () => {
    const topInner = topInnerRef.current;
    const mainScroll = mainScrollRef.current;

    if (!topInner || !mainScroll) return;
    topInner.style.width = `${mainScroll.scrollWidth}px`;
  };

  const onMouseDown = (e: React.MouseEvent, index: number, childIndex?: number) => {
    document.body.style.cursor = 'col-resize'; //ポインターを固定
    document.body.style.userSelect = 'none'; //移動範囲内の文字選択をしないようにする

    columnIndex.current = index;
    columnChildIndex.current = childIndex;
    startX.current = e.clientX;
    const targetColumn = sameIndexColumn(columunsState, index);
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
    if (columnIndex.current == null || columnChildIndex.current === null) return;
    if (columnChildIndex.current !== undefined) {
      const targetColumn = sameIndexHasChildColumn(columunsState, columnIndex.current)!;
      setColumunsState((prev) =>
        prev.map((x) =>
          x.index === targetColumn.index && hasChildColumn(x)
            ? {
                ...x,
                childColumn: x.childColumn.map((child) =>
                  child.index === columnChildIndex.current
                    ? { ...child, width: Math.round(startWidth.current + diff) }
                    : child,
                ),
              }
            : x,
        ),
      );
    } else {
      const targetColumn = sameIndexHasNotChildColumn(columunsState, columnIndex.current)!;
      setColumunsState((prev) =>
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

  //index重複チェック 重複時はthrow
  useEffect(() => {
    if (new Set(columns).size !== columns.length)
      throw new Error(`LeftStickyTableのcolumns要素内のindexが重複しています。indexはuniqueにしてください`);
  }, []);

  //上部スクロールバー同期処理
  useEffect(() => {
    const topScroll = topScrollRef.current;
    const topInner = topInnerRef.current;
    const mainScroll = mainScrollRef.current;

    if (!topScroll || !topInner || !mainScroll) return;

    let syncing = false;

    syncWidth();
    window.addEventListener('resize', syncWidth);

    const onTopScroll = () => {
      if (syncing) return;
      syncing = true;
      mainScroll.scrollLeft = topScroll.scrollLeft;
      syncing = false;
    };

    const onMainScroll = () => {
      if (syncing) return;
      syncing = true;
      topScroll.scrollLeft = mainScroll.scrollLeft;
      syncing = false;
    };

    topScroll.addEventListener('scroll', onTopScroll);
    mainScroll.addEventListener('scroll', onMainScroll);

    return () => {
      window.removeEventListener('resize', syncWidth);
      topScroll.removeEventListener('scroll', onTopScroll);
      mainScroll.removeEventListener('scroll', onMainScroll);
    };
  }, []);

  //上部横スクロールバーのwidth設定 縦スクロールバー表示状態によって右端サイズの調整
  useEffect(() => {
    const topScroll = topScrollRef.current;
    const mainScroll = mainScrollRef.current;

    if (!topScroll || !mainScroll) return;

    //縦スクロールバーのwidth
    const scrollbarWidth = mainScroll.offsetWidth - mainScroll.clientWidth;
    topScroll.style.width = (tableOption.tableSize.width - scrollbarWidth).toString() + 'px';
  }, [topScrollRef, mainScrollRef, rows]); //データ要素数の変更時にも発火

  const headerColor = 'bg-gray-300';
  const borderColor = 'border-gray-500';
  const rowColor = 'bg-gray-100';
  const rowOddColor = 'bg-gray-200';

  return (
    <div className="p-2 bg-blue-50">
      {/* 上部 横スクロールバー 下部スクロールバーと同期*/}
      <div className="flex bg-white">
        <div ref={topScrollRef} className={`overflow-x-auto overflow-y-hidden h-4`}>
          <div ref={topInnerRef} />
        </div>
      </div>

      <div
        ref={mainScrollRef}
        className={cn('bg-white overflow-y-auto text-xs border', borderColor)}
        style={{ height: tableOption.tableSize.height, width: tableOption.tableSize.width }}
      >
        <div className="flex">
          {/* ヘッダ */}
          <div className={`flex bg-gray-200`}>
            <div className={`flex items-center z-10 sticky left-0`}>
              {extractLeftColumns(columns).map((leftColumn, i) => (
                <div key={`left-pane-${i}`}>
                  {/** left header */}
                  <div className={cn('sticky top-0', headerColor)}>
                    <div className={'text-sm font-bold'}>
                      <div
                        className={cn(
                          'flex item-center justify-center whitespace-nowrap overflow-x-hidden border-r border-b',
                          borderColor,
                        )}
                        style={{
                          height: hasChildColumn(leftColumn) ? tableOption.colmunHeight / 2 : tableOption.colmunHeight,
                          width:
                            leftColumn.type === 'HasChild'
                              ? sameIndexHasChildColumn(columunsState, leftColumn.index)!
                                  .childColumn.map(getWidth)
                                  .reduce((a, b) => a + b, 0)
                              : getWidth(sameIndexColumn(columunsState, leftColumn.index)),
                        }}
                        onClick={leftColumn.handleHeaderClick}
                      >
                        {leftColumn.label}
                      </div>
                      <ResizeHandle columnIndex={leftColumn.index} onMouseDown={onMouseDown} />
                    </div>
                    {/** 2段組み要素があれば表示 */}
                    {leftColumn.type === 'HasChild' && (
                      <div className="flex items-center justify-center whitespace-nowrap overflow-x-hidden">
                        {leftColumn.childColumn.map((childColumn, i) => (
                          <div
                            key={`right-child-col-${i}`}
                            className={cn(
                              'flex item-center justify-center text-sm font-bold whitespace-nowrap overflow-x-hidden border-r border-b',
                              borderColor,
                              headerColor,
                            )}
                            style={{
                              height: tableOption.colmunHeight / 2,
                              width: sameIndexHasChildColumn(columunsState, leftColumn.index)!.childColumn!.find(
                                (x) => x.index === childColumn.index,
                              )!.width!,
                            }}
                            onClick={childColumn.handleHeaderClick}
                          >
                            {childColumn.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {/** left body */}
                  {rows.map((row, rowIndex) => (
                    <div
                      key={`left-row-${rowIndex}`}
                      className={cn(
                        `flex items-center whitespace-nowrap overflow-x-hidden border-r border-b `,
                        borderColor,
                        rowIndex % 2 ? rowColor : rowOddColor,
                      )}
                      style={{
                        height: tableOption.rowHeight,
                        width: getWidth(sameIndexColumn(columunsState, leftColumn.index)),
                      }}
                    >
                      {hasChildColumn(leftColumn) ? <></> : leftColumn.elem(row)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="flex items-center">
              {extractRightColumns(columns).map((rightColumn, i) => (
                <div key={`right-pane-${i}`}>
                  {/** right header */}
                  <div className={cn('sticky top-0', headerColor)}>
                    <div className={'text-sm font-bold'}>
                      <div
                        className={cn(
                          'box-border flex item-center justify-center whitespace-nowrap overflow-x-hidden border-r border-b',
                          borderColor,
                        )}
                        style={{
                          height: hasChildColumn(rightColumn) ? tableOption.colmunHeight / 2 : tableOption.colmunHeight,
                          width:
                            rightColumn.type === 'HasChild'
                              ? 'auto'
                              : getWidth(sameIndexColumn(columunsState, rightColumn.index)),
                        }}
                        onClick={rightColumn.handleHeaderClick}
                      >
                        {rightColumn.label}
                      </div>
                      {hasChildColumn(rightColumn) ? (
                        <></>
                      ) : (
                        <ResizeHandle columnIndex={rightColumn.index} onMouseDown={onMouseDown} />
                      )}
                    </div>
                    {/** 2段組み要素があれば表示 */}
                    {hasChildColumn(rightColumn) && (
                      <div className="flex items-center justify-center whitespace-nowrap overflow-x-hidden">
                        {rightColumn.childColumn.map((childColumn, i) => (
                          <div
                            key={`right-child-col-${i}`}
                            className={cn('relative')}
                            style={{
                              width: sameIndexHasChildColumn(columunsState, rightColumn.index)!.childColumn!.find(
                                (x) => x.index === childColumn.index,
                              )!.width,
                            }}
                          >
                            <div
                              className={cn(
                                'flex item-center justify-center text-sm font-bold whitespace-nowrap overflow-x-hidden box-border border-r border-b',
                                borderColor,
                                headerColor,
                              )}
                              style={{ height: tableOption.colmunHeight / 2 }}
                              onClick={childColumn.handleHeaderClick}
                            >
                              {childColumn.label}
                            </div>
                            <ResizeHandle
                              columnIndex={rightColumn.index}
                              childColumnIndex={childColumn.index}
                              onMouseDown={onMouseDown}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {/** right body */}
                  {rows.map((row, rowIndex) => (
                    <React.Fragment key={`right-row-${rowIndex}`}>
                      {hasChildColumn(rightColumn) ? (
                        // {/** 2段組み/1段組みの切り替え */}
                        <div className="flex items-center justify-center h-full whitespace-nowrap overflow-x-hidden">
                          {rightColumn.childColumn.map((childColumn, childRowIndex) => (
                            <div
                              key={`right-child-row-${childRowIndex}`}
                              className={cn(
                                'h-full flex items-center box-border border-r border-b',
                                borderColor,
                                rowIndex % 2 ? rowColor : rowOddColor,
                              )}
                              style={{
                                height: tableOption.rowHeight,
                                width: sameIndexHasChildColumn(columunsState, rightColumn.index)!.childColumn!.find(
                                  (x) => x.index === childColumn.index,
                                )!.width,
                              }}
                              title={childColumn.title(row)}
                            >
                              {childColumn.elem(row)}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div
                          className={cn(
                            `flex items-center whitespace-nowrap overflow-x-hidden box-border  border-r border-b`,
                            borderColor,
                            rowIndex % 2 ? rowColor : rowOddColor,
                          )}
                          style={{
                            height: tableOption.rowHeight,
                            width: getWidth(sameIndexColumn(columunsState, rightColumn.index)),
                          }}
                          title={rightColumn.title(row)}
                        >
                          {rightColumn.elem(row)}
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
