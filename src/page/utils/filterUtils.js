export function dateRangeFilterFn(rows, id, filterValue) {
  const dates = filterValue.split("-");
  const start = new Date(dates[0]);
  const end = new Date(dates[1]);
  return rows.filter((row) => {
    const time = new Date(row.values[id]);
    return time >= start && time <= end;
  });
}

export function accurateTextFilterFn(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return !!rowValue
      ? String(rowValue)
          .toLowerCase()
          .startsWith(String(filterValue).toLowerCase())
      : true;
  });
}
