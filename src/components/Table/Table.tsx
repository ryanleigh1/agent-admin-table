import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { IUser } from "../../types/User";
import { useMemo, useState } from "react";
import Filter from "../Filter/Filter";
import { useUserContext } from "../../context/UserContext";
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/20/solid";
import { PageButton } from "./PaginationButtons/Buttons";
import { capitalizeFirstLetter } from "../../utils/utils";

interface TableProps {
  onCreateUserClick: () => void;
  onDeleteUserClick: (user: IUser) => void;
  onEditUserClick: (user: IUser) => void;
}

const Table: React.FC<TableProps> = ({
  onCreateUserClick,
  onDeleteUserClick,
  onEditUserClick,
}) => {
  const COLUMNS: ColumnDef<IUser>[] = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <span
          className={`px-2 min-w-[70px] inline-flex justify-center text-sm leading-5 font-semibold rounded-full ${
            row.original.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {capitalizeFirstLetter(row.original.status)}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2 max-w-1">
          <button className="text-gray-600" onClick={() => handleEdit(row.original)}>Edit</button>
          <span>|</span>
          <button
          className="text-gray-600"
            data-testid="delete-btn"
            onClick={() => handleDelete(row.original)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const columns = useMemo(() => COLUMNS, []);

  const [filterText, setFilterText] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const { users } = useUserContext();

  const handleDelete = (user: IUser) => {
    onDeleteUserClick(user);
  };

  const handleEdit = (user: IUser) => {
    onEditUserClick(user);
  };

  const table = useReactTable({
    columns,
    data: users,
    state: {
      globalFilter: filterText,
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setFilterText,
    onPaginationChange: setPagination,
  });

  const { getHeaderGroups, getRowModel } = table;

  if (users?.length === 0) {
    return <div>No users available.  Please make sure the json-server is running.</div>;
  }

  return (
    <div className="min-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <section className="flex items-center justify-between">
        <Filter filterValue={filterText} onFilterChange={setFilterText} />
        <button
          className="relative max-h-10 rounded-md inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-md font-medium text-gray-500 hover:bg-gray-50"
          data-testid="add-user-btn"
          onClick={onCreateUserClick}
        >
          Add User
        </button>
      </section>
      <table
        className="my-4 rounded-md min-w-[800px] divide-y divide-gray-200 "
        data-testid="user-table"
      >
        <thead className="bg-gray-50">
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  key={header.id}
                >
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
        <tbody className="bg-white divide-y divide-gray-200">
          {getRowModel()?.rows?.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4 font-medium whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="my-4 flex justify-between items-center gap-2">
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <PageButton
            className="rounded-l-md"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">First</span>
            <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
          </PageButton>
          <PageButton
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </PageButton>
          <PageButton
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </PageButton>
          <PageButton
            className="rounded-r-md"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Last</span>
            <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
          </PageButton>
        </nav>
        <span className="flex items-center gap-1">
          <div>Page</div>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default Table;
