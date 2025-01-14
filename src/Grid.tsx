import React from "react";
import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/dist/styles/ag-grid.css";
// import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { GridReadyEvent, GridApi, ColumnApi, ColDef } from "ag-grid-community";
import { fetchData, fetchLargeData, Athlete } from "./api";

const columnDefs: ColDef[] = [
  {
    headerName: "ID",
    field: "id",
    // width: 70,
    pinned: "left",
  },
  {
    headerName: "Athlete",
    field: "athlete",
    // width: 150,
    editable: true,
    pinned: "left",
  },
  {
    headerName: "Age",
    field: "age",
    // width: 90,
    // minWidth: 50,
    // maxWidth: 100,
    editable: true,
  },
  {
    headerName: "Athlete Country",
    field: "country",
    // width: 120,
    initialHide: true,
  },
  {
    headerName: "Year",
    field: "year",
    // width: 90,
  },
  {
    headerName: "Date",
    field: "date",
    // width: 110,
  },
  {
    headerName: "Sport",
    field: "sport",
    // width: 110,
  },
  {
    headerName: "Gold",
    field: "gold",
    // width: 100,
  },
  {
    headerName: "Silver",
    field: "silver",
    // width: 100,
  },
  {
    headerName: "Bronze",
    field: "bronze",
    // width: 100,
  },
  {
    headerName: "Total",
    field: "total",
    // width: 100,
    maxWidth: 70,
    pinned: "right",
  },
];

function Grid() {
  const [rowData, setRowData] = React.useState<Athlete[]>([]);
  const apiRef = React.useRef<any>(null);
  const onGridReady = (params: GridReadyEvent) => {
    apiRef?.current?.columnApi.autoSizeAllColumns();
  };

  React.useEffect(() => {
    fetchData().then((d) => setRowData(d));
    // fetchLargeData().then((d) => setRowData(d));
  }, []);

  const gridOptions = {
    defaultColDef: {
      menuTabs: ["columnsMenuTab"],
      // flex: 1,
      // wrapHeaderText: true,
      // autoHeaderHeight: true,
    },
    suppressMovableColumns: true,
  };

  return (
    <div style={{ height: "80vh" }}>
      <div
        style={{ height: "100%", width: "100%" }}
        className="ag-theme-balham"
      >
        <AgGridReact
          rowSelection="multiple"
          suppressRowClickSelection
          suppressDragLeaveHidesColumns
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          rowData={rowData}
          {...gridOptions}
          ref={apiRef}
        />
      </div>
    </div>
  );
}

export default Grid;
