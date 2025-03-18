import arrowDown from "../assets/icons/arrow-down.svg";

function FilterDepartment() {
  return (
    <div>
      <div></div>
      <button>
        დეპარტამენტი
        <img src={arrowDown} alt="Arrow" />
      </button>
      <div>
        <ul></ul>
      </div>
    </div>
  );
}

export default FilterDepartment;
