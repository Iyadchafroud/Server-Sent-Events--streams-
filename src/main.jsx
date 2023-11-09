/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import * as React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
function App() {
  const columnHelper = createColumnHelper();

  const [data, setData] = React.useState([]);
  console.log(data);
  const [count, setcount] = React.useState(0);
  const [columnstest, setColumntest] = React.useState([]);
  const columns = columnstest.map((column) => {
    return columnHelper.accessor(column, {
      cell: (info) => info.getValue(),
    });
  });
  React.useEffect(() => {
   
    try {
      const eventSource = new EventSource(
        "http://localhost:8080/api_etk_article_bd/v1//cards/franchise_franchise_chayma_ben_brahim/876b4010-a1f5-59ee-6516-00759ace26ef/items"
      );

      eventSource.addEventListener("structure", (event) => {
        console.log(event.data);
        setColumntest(JSON.parse(event.data));
      });
      eventSource.addEventListener("rows", (event) => {
       
        setData((pre) => [...pre, JSON.parse(event.data).data]);
        console.log(event.data);
      });
      eventSource.addEventListener("end", (event) => {
        eventSource.close();

      });
    } catch {
      console.log("error");
    }
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
      <button onClick={() => setcount(5)} className="border p-2">
        Rerender
      </button>
    </div>
  );
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.createRoot(rootElement).render(<App />);
