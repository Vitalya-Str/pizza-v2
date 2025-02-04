import ReactPaginate from "react-paginate";
import style from "./Pagination.module.scss";
import { FC } from "react";

type PaginationType = {
  onChangePage: (value: number) => void;
};

const Pagination: FC<PaginationType> = ({ onChangePage }) => {
  return (
    <ReactPaginate
      className={style.pagination}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={3}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
