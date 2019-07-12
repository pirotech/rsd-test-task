import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import './UiPagination.scss';


const UiPagination = ({ forcePage, pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      forcePage={forcePage}
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      breakClassName="ui-pagination__break"
      breakLinkClassName="ui-pagination__break-link"
      containerClassName="ui-pagination"
      pageClassName="ui-pagination__page"
      pageLinkClassName="ui-pagination__page-link"
      activeClassName="ui-pagination__page_active"
      activeLinkClassName="ui-pagination__link_active"
      previousClassName="ui-pagination__previous"
      nextClassName="ui-pagination__next"
      previousLinkClassName="ui-pagination__previous-link"
      nextLinkClassName="ui-pagination__next-link"
      disabledClassName="ui-pagination_disabled"
    />
  );
};

UiPagination.propTypes = {
  forcePage: PropTypes.number,
  pageCount: PropTypes.number,
  onPageChange: PropTypes.func,
};

export default UiPagination;
