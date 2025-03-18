import styles from "./FilterList.module.css";

function FilterList({ selectedFilters }) {
  return (
    <div>
      <ul>
        {selectedFilters.department.map((eachDep) => {
          return <li key={eachDep.id}>{eachDep.name}</li>;
        })}
        {selectedFilters.priority.map((eachDep) => {
          return <li key={eachDep.id}>{eachDep.name}</li>;
        })}
        <li>
          {selectedFilters.employee?.name} {selectedFilters.employee?.surname}
        </li>
      </ul>
    </div>
  );
}

export default FilterList;
