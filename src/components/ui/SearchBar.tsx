import { FilterIcon } from "../icons/FilterIcon";
import { SearchIcon } from "../icons/SearchIcon";

export const SearchBar = () => {
  return (
    <div className="search-bar">
      <label className="input input-lg input-ghost flex justify-between items-center ">
        <span className="search-icon-in-search">
          <SearchIcon />
        </span>

        <input
          type="text"
          placeholder="Search by document text"
          className="input input-lg input-ghost  "
        />
        <span className="filter-icon-in-search">
          <FilterIcon />
        </span>
      </label>
    </div>
  );
};
