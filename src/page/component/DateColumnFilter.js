import DateRangePicker from "react-bootstrap-daterangepicker";
import React, { useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import store from "store";

export function DateColumnFilter({ column: { filterValue, setFilter, id } }) {
  useEffect(() => {
    if (store.get(id)) {
      setFilter(store.get(id));
    }
  }, [id]);

  const handleApply = (event, picker) => {
    const start = new Date(picker.startDate);
    const end = new Date(picker.endDate);
    const startStr =
      start.getMonth() + 1 + "/" + start.getDate() + "/" + start.getFullYear();
    const endStr =
      end.getMonth() + 1 + "/" + end.getDate() + "/" + end.getFullYear();
    setFilter(startStr + "-" + endStr);
    store.set(id, startStr + "-" + endStr);
  };

  const handleCancel = () => {
    setFilter(undefined);
    store.set(id, "undefined");
  };

  return (
    <div className="input-group">
      <DateRangePicker
        showDropdowns={true}
        onApply={handleApply}
        onCancel={handleCancel}
      >
        <button type="button" className="btn btn-sm btn-outline-info">
          <i className="bi-calendar3" />
        </button>
      </DateRangePicker>
      <input
        type="text"
        className="form-control form-control-sm"
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
          store.set(id, e.target.value || undefined);
        }}
      />
      <button
        type="button"
        name="resetFilter"
        className="btn btn-sm"
        onClick={(e) => {
          setFilter(undefined);
          store.set(id, undefined);
          const buttons = document.getElementsByName("resetFilter");
          for (let i = 0; i < buttons.length; i++) {
            buttons[i].blur();
          }
        }}
      >
        <i className="bi-x-lg text-danger" />
      </button>
    </div>
  );
}
