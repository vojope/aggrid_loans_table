import React from "react";
import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/dist/styles/ag-grid.css";
// import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { GridReadyEvent, GridApi, ColumnApi, ColDef, ColumnMenuTab, ColumnVisibleEvent, DisplayedColumnsChangedEvent } from "ag-grid-community";
import { fetchData, fetchLargeData, Athlete } from "./api";

const columnDefs: ColDef[] = [
  {
    headerName: "ID",
    field: "id",
    // width: 70,
    minWidth: 70,
    maxWidth: 70,
    pinned: "left",
    suppressMenu: true,
    suppressColumnsToolPanel: true,
  },
  {
    headerName: "Athlete",
    field: "athlete",
    // width: 150,
    minWidth: 150,
    maxWidth: 150,
    editable: true,
    pinned: "left",
    suppressMenu: true,
    suppressColumnsToolPanel: true,
  },
  {
    headerName: "Age",
    field: "age",
    // width: 90,
    // minWidth: 50,
    // maxWidth: 100,
    minWidth: 200,
    editable: true,
  },
  {
    headerName: "Athlete Country",
    field: "country",
    // width: 120,
    minWidth: 220,
    initialHide: true,
  },
  {
    headerName: "Year",
    field: "year",
    // width: 90,
    minWidth: 190,
  },
  {
    headerName: "Date",
    field: "date",
    // width: 110,
    minWidth: 210,
  },
  {
    headerName: "Sport",
    field: "sport",
    // width: 110,
    minWidth: 210,
  },
  {
    headerName: "Gold",
    field: "gold",
    // width: 100,
    minWidth: 200,
  },
  {
    headerName: "Silver",
    field: "silver",
    // width: 100,
    minWidth: 200,
  },
  {
    headerName: "Bronze",
    field: "bronze",
    // width: 100,
    minWidth: 200,
  },
  {
    headerName: "Age1",
    field: "age",
    // width: 90,
    // minWidth: 50,
    // maxWidth: 100,
    editable: true,
  },
  {
    headerName: "Athlete Country1",
    field: "country",
    // width: 120,
    initialHide: true,
  },
  {
    headerName: "Year1",
    field: "year",
    // width: 90,
  },
  {
    headerName: "Date1",
    field: "date",
    // width: 110,
  },
  {
    headerName: "Sport1",
    field: "sport",
    // width: 110,
  },
  {
    headerName: "Gold1",
    field: "gold",
    // width: 100,
  },
  {
    headerName: "Silver1",
    field: "silver",
    // width: 100,
  },
  {
    headerName: "Bronze1",
    field: "bronze",
    // width: 100,
  },
  {
    headerName: "Total",
    field: "total",
    // width: 100,
    minWidth: 70,
    maxWidth: 70,
    pinned: "right",
    suppressMenu: true,
    suppressColumnsToolPanel: true,
  },
];

function Grid() {
  const [rowData, setRowData] = React.useState<Athlete[]>([]);
  
  React.useEffect(() => {
    fetchData().then((d) => setRowData(d));
    // fetchLargeData().then((d) => setRowData(d));
  }, []);

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
      // flex: 1,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      columnsMenuParams: {
        suppressColumnFilter: true,
        suppressColumnSelectAll: true,
        suppressColumnExpandAll: true,
        suppressSyncLayoutWithGrid: true
      },
    },
    suppressMovableColumns: true,
    suppressContextMenu: true,
    suppressRowClickSelection: true,
    suppressDragLeaveHidesColumns: true,
    postProcessPopup: postProcessPopup,
  };

  const onGridReady = (params: GridReadyEvent) => {
    // apiRef?.current?.columnApi.autoSizeAllColumns();
    // alert(apiRef?.current?.columnApi.getDisplayedCenterColumns())
    params.columnApi.autoSizeAllColumns();
  };

  const onColumnVisible = (ev: ColumnVisibleEvent) => {
    const {column, columnApi, api} = ev;
    const columns =  columnApi.getDisplayedCenterColumns();
    columns.length;
    // columnApi.autoSizeAllColumns();
    api.sizeColumnsToFit();
    // alert(column?.getColId() + ' :: ' + column?.isVisible());
  };

  const onDisplayedColumnsChanged = (ev: DisplayedColumnsChangedEvent) => {
    const {columnApi} = ev;
  };
  

  return (
    <div style={{ height: "80vh" }}>
      <div
        style={{ height: "100%", width: "100%" }}
        className="ag-theme-balham"
      >
        <AgGridReact
          columnDefs={columnDefs}
          // onGridReady={onGridReady}
          rowData={rowData}
          {...gridOptions}
          onColumnVisible = {onColumnVisible}
          onDisplayedColumnsChanged =  {onDisplayedColumnsChanged}
        />
      </div>
    </div>
  );
}

export default Grid;