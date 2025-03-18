import styles from "./FilterList.module.css";
import x from "../assets/icons/x.svg";

function FilterList({
  selectedFilters,
  handleEachFilterDelete,
  deleteAllFilters,
}) {
  return (
    <div>
      <ul className={styles.filtersBox}>
        {selectedFilters.department.map((eachDep) => {
          return (
            <li key={eachDep.id} className={styles.eachFilter}>
              <p>{eachDep.name}</p>
              <button
                className={styles.removeFilter}
                onClick={() => handleEachFilterDelete("department", eachDep.id)}
              >
                <img
                  src={x}
                  alr="filter remove button"
                  className={styles.removeFilterX}
                />
              </button>
            </li>
          );
        })}
        {selectedFilters.priority.map((eachDep) => {
          return (
            <li key={eachDep.id} className={styles.eachFilter}>
              {eachDep.name}
              <button
                className={styles.removeFilter}
                onClick={() => handleEachFilterDelete("priority", eachDep.id)}
              >
                <img
                  src={x}
                  alr="filter remove button"
                  className={styles.removeFilterX}
                />
              </button>
            </li>
          );
        })}
        {selectedFilters.employee !== null ? (
          <li className={styles.eachFilter}>
            {selectedFilters.employee?.name} {selectedFilters.employee?.surname}
            <button
              className={styles.removeFilter}
              onClick={() =>
                handleEachFilterDelete("employee", selectedFilters.employee.id)
              }
            >
              <img
                src={x}
                alr="filter remove button"
                className={styles.removeFilterX}
              />
            </button>
          </li>
        ) : (
          ""
        )}
        {selectedFilters.employee !== null ||
        selectedFilters.department.length > 0 ||
        selectedFilters.priority.length > 0 ? (
          <li className={styles.clearAllFiltersDiv}>
            <button
              onClick={deleteAllFilters}
              className={styles.clearAllFilters}
            >
              გასუფთავება
            </button>
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
}

export default FilterList;
