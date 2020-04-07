import React from 'react';
import ReactPaginate from 'react-paginate';
import './paginate.css';

export default ({ pageCount, handlePageClick, forcePage }) =>
  <ReactPaginate
    previousLabel={"<"}
    nextLabel={">"}
    breakLabel={"..."}
    breakClassName={"break-me"}
    pageCount={pageCount > 0 ? pageCount : 1}
    marginPagesDisplayed={2}
    pageRangeDisplayed={2}
    onPageChange={handlePageClick}
    containerClassName={"pagination"}
    subContainerClassName={"pages pagination"}
    activeClassName={"pag-active"}
    disabledClassName={"pag-disabled"}
    forcePage={forcePage} />;
