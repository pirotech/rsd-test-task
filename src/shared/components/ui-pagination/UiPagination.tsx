import * as React from 'react';
import ReactPaginate from 'react-paginate';
import './UiPagination.scss';

interface IProps {
  forcePage: number;
  pageCount: number;
  onPageChange: Function;
}

const UiPagination: React.FC<IProps> = ({ forcePage, pageCount, onPageChange }: IProps) => {
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

export default UiPagination;
