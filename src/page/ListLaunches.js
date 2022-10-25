import React, { useEffect, useState } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import { DefaultColumnFilter } from "./component/DefaultColumnFilter";
import { DateColumnFilter } from "./component/DateColumnFilter";
import { dateRangeFilterFn, accurateTextFilterFn } from "./utils/filterUtils";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { LoadingModal } from "./component/LoadingModal";
import { SortNumericDownAlt, SortNumericUpAlt } from "react-bootstrap-icons";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

function getColumnSize(id) {
  if (id === "id" || id === "action" || id === "folder" || id === "endDate") {
    return "col col-sm-1";
  }
}

function getColumnStyle(id) {
  return { textAlign: "center" };
}

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache(),
});

export default function ListLaunches() {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    client
      .query({
        query: gql`
          query GetLaunches {
            launches {
              mission_name
              rocket {
                rocket_name
                rocket_type
              }
              launch_date_local
            }
          }
        `,
      })
      .then((result) => {
        console.log("hi", result.data.launches);
        setData(
          result.data.launches.map((r, index) => {
            return {
              id: index,
              missionName: r.mission_name,
              rocketName: r.rocket.rocket_name,
              rocketType: r.rocket.rocket_type,
              launchDate: r.launch_date_local,
            };
          })
        );
      });
  }, []);
  console.log("launches", data);

  useEffect(() => {
    if (data.length > 0) {
      setShowLoading(false);
    }
  }, [data]);

  const filterTypes = React.useMemo(
    () => ({
      dateRange: dateRangeFilterFn,
      accurateText: accurateTextFilterFn,
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const columns = React.useMemo(
    () => [
      { Header: "Mission Name", accessor: "missionName", id: "displayName" },
      { Header: "Rocket Name", accessor: "rocketName", id: "apiKey" },
      { Header: "Rocket Type", accessor: "rocketType", id: "sdk" },
      {
        Header: "Launch Date",
        accessor: "launchDate",
        Filter: DateColumnFilter,
        filter: "dateRange",
        Cell: ({
          cell: {
            row: { values },
          },
        }) => {
          return (
            <div className="text-center">
              {values.launchDate.substr(0, 10).replaceAll("-", "/")}
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageCount,
    gotoPage,
  } = useTable(
    {
      autoResetSortBy: false,
      columns,
      data,
      defaultColumn,
      filterTypes,
      manualSortBy: true,
      disableSortRemove: false,
      disableMultiSort: false,
      disableMultiRemove: false,
      defaultCanSort: true,
      initialState: {
        pageIndex: 0,
        pageSize: 20,
      },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <>
      <LoadingModal showLoading={showLoading} />
      <div className="d-inline-flex" style={{ height: "70px" }}>
        <h3 className="pt-3 ps-1">List Launches</h3>
      </div>
      <hr />
      <Table
        {...getTableProps()}
        responsive={true}
        borderless={false}
        className="table-responsive-sm  align-content-center "
        style={{ verticalAlign: "middle" }}
      >
        <thead className="text-dark">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="text-center">
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  onClick={() =>
                    column.toggleSortBy &&
                    (column.isSortedDesc === undefined
                      ? column.toggleSortBy(false, true)
                      : column.toggleSortBy(undefined, true))
                  }
                >
                  {column.render("Header")}
                  {column.canSort && (
                    <span
                      className={
                        column.isSorted ? "float-end" : "invisible float-end"
                      }
                    >
                      {column.isSortedDesc ? (
                        <SortNumericDownAlt />
                      ) : (
                        <SortNumericUpAlt />
                      )}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <thead className="text-dark">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Filter")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <>
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={
                          !row.original.isStage
                            ? {}
                            : { backgroundColor: "#AAAAAA", color: "#444444" }
                        }
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={(e) => {
          const page = e.selected ? Number(e.selected) : 0;
          gotoPage(page);
        }}
        pageRangeDisplayed={10}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
