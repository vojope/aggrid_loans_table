import React from "react";
import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/dist/styles/ag-grid.css";
// import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { GridReadyEvent, GridApi, ColumnApi, ColDef, ColumnMenuTab, ColumnVisibleEvent, DisplayedColumnsChangedEvent } from "ag-grid-community";
import { fetchData, fetchLargeData, Athlete } from "./api";

const pinnedColumnsProperties = (pinned: 'left' | 'right') => ({
  pinned: pinned,
  suppressMenu: true,
  suppressColumnsToolPanel: true,
});

function Grid() {
  const [rowData, setRowData] = React.useState<Athlete[]>([]);
  
  React.useEffect(() => {
    fetchData().then((d) => setRowData(d));
    // fetchLargeData().then((d) => setRowData(d));
  }, []);

  const apiRef = React.useRef<any>(null);

  // Move this to an upper component that wraps grid and another component to simulate changing tabs
  const [value, setValue] = React.useState<string[]>(['age', 'country', 'year', 'date', 'sport', 'gold', 'silver', 'bronze']); 

  const columnDefs: ColDef[] = [
    {
      headerName: "ID",
      field: "id",
      // width: 70,
      minWidth: 70,
      maxWidth: 70,
      ...pinnedColumnsProperties('left'),
    },
    {
      headerName: "Athlete",
      field: "athlete",
      // width: 150,
      minWidth: 150,
      maxWidth: 150,
      editable: true,
      ...pinnedColumnsProperties('left'),

    },
    {
      headerName: "Age",
      field: "age",
      // width: 90,
      // minWidth: 50,
      // maxWidth: 100,
      minWidth: 100,
      editable: true,
      hide: !value.includes('age'),
    },
    {
      headerName: "Athlete Country",
      field: "country",
      // width: 120,
      minWidth: 120,
      initialHide: true,
      hide: !value.includes('country'),
    },
    {
      headerName: "Year",
      field: "year",
      // width: 90,
      minWidth: 90,
      hide: !value.includes('year'),
    },
    {
      headerName: "Date",
      field: "date",
      // width: 110,
      minWidth: 110,
      hide: !value.includes('date'),
    },
    {
      headerName: "Sport",
      field: "sport",
      // width: 110,
      minWidth: 250,
      hide: !value.includes('sport'),
      flex: 1.9,
      suppressColumnsToolPanel: true,
    },
    {
      headerName: "Gold",
      field: "gold",
      // width: 100,
      minWidth: 100,
      hide: !value.includes('gold'),
    },
    {
      headerName: "Silver",
      field: "silver",
      // width: 100,
      minWidth: 100,
      hide: !value.includes('silver'),
    },
    {
      headerName: "Bronze",
      field: "bronze",
      // width: 100,
      minWidth: 100,
      hide: !value.includes('bronze'),
    },
    {
      headerName: "Total",
      field: "total",
      // width: 100,
      minWidth: 70,
      maxWidth: 70,
      ...pinnedColumnsProperties('right'),
      flex: 0.5,
    },
  ];

  const postProcessPopup = React.useCallback((params) => {
    // check callback is for menu
    if (params.type !== 'columnMenu') {
      return;
    }
    // const columnId = params.column ? params.column.getId() : undefined;
    // if (columnId === 'gold') {
      const ePopup = params.ePopup;
      let oldTopStr = ePopup.style.top;
      // remove 'px' from the string (AG Grid uses px positioning)
      oldTopStr = oldTopStr.substring(0, oldTopStr.indexOf('px'));
      const oldTop = parseInt(oldTopStr);
      const newTop = oldTop + 25;
      ePopup.style.top = newTop + 'px';
    // }
  }, []);

  const gridOptions = {
    defaultColDef: {
      menuTabs: ["columnsMenuTab"] as ColumnMenuTab[],
      flex: 1,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      columnsMenuParams: {
        suppressColumnFilter: true,
        suppressColumnSelectAll: true,
        suppressColumnExpandAll: true,
        suppressSyncLayoutWithGrid: true
      },
      suppressMenu: true,
    },
    suppressMovableColumns: true,
    suppressContextMenu: true,
    suppressRowClickSelection: true,
    suppressDragLeaveHidesColumns: true,
    postProcessPopup: postProcessPopup,
  };

  const onGridReady = (ev: GridReadyEvent) => {
    // apiRef?.current?.columnApi.autoSizeAllColumns();
    // alert(apiRef?.current?.columnApi.getDisplayedCenterColumns())
    // ev.columnApi.autoSizeAllColumns();
    apiRef.current=ev.api;
    ev.api.sizeColumnsToFit();
  };

  const onColumnVisible = (ev: ColumnVisibleEvent) => {
    const {column, columnApi, api} = ev;
    const columns =  columnApi.getDisplayedCenterColumns();
    columns.length;
    // columnApi.autoSizeAllColumns();
    api.sizeColumnsToFit();
    // column && (column.isVisible() ? setValue([...value, column.getColId()]) : setValue(value.filter((v) => v!==column.getColId())));
    setValue(columns.map((column) => column.getColId()));
    // alert(column?.getColId() + ' :: ' + column?.isVisible());
  };

  const onDisplayedColumnsChanged = (ev: DisplayedColumnsChangedEvent) => {
    const {columnApi} = ev;
  };
  

  return (
    <div style={{ height: "60vh", width: "60vh" }}>
      <button style={{width: '100px'}} id='columnButton' onClick={(ev) => apiRef.current.showColumnMenuAfterMouseClick('id', ev)}>Show</button>
      <div
        style={{ height: "100%", width: "100%" }}
        className="ag-theme-balham"
      >
        <AgGridReact
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          rowData={rowData}
          {...gridOptions}
          onColumnVisible = {onColumnVisible}
          onDisplayedColumnsChanged =  {onDisplayedColumnsChanged}
          ref={apiRef}
        />
      </div>
    </div>
  );
}

export default Grid;