import React, { useEffect } from "react";
import store from "store";

export function DefaultColumnFilter({
  column: { filterValue, setFilter, id },
}) {
  useEffect(() => {
    if (store.get(id)) {
      setFilter(store.get(id));
    }
  }, [id]);

  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control form-control-sm m-sm-auto"
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
