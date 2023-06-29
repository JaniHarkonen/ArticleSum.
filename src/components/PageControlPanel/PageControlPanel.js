import Pagination from "react-bootstrap/Pagination";

export const DEFAULT_SETTINGS = {
  currentPage: 0,
  onPageSelect: (pageIndex) => {},
  firstPage: 0,
  lastPage: 0
};

/**
 * Provides a basic page control panel using Bootstrap's `Pagination`-components.
 * This component does not maintain a state, rather, the state must be contained 
 * in the parent component. The parent will then pass the first as well as the 
 * last page to the component that will function as limits when advancing or moving 
 * back through the pages.
 */
export default function PageControlPanel(props) {
  /**
   * A zero-based page that is currently open.
   */
  const currentPage = props.currentPage || DEFAULT_SETTINGS.currentPage;

  /**
   * Hook that updates the parent component when a page is changed.
   */
  const onPageSelect = props.onPageSelect || DEFAULT_SETTINGS.onPageSelect;

  /**
   * Zero-based first page index.
   */
  const firstPage = props.firstPage || DEFAULT_SETTINGS.firstPage;

  /**
   * Zero-based last page index.
   */
  const lastPage = props.lastPage || DEFAULT_SETTINGS.lastPage;

  /**
   * Moves to the next page or maintains the current page, if the 
   * next one is out of bounds.
   */
  const gotoNextPage = () => onPageSelect(Math.min(lastPage, currentPage + 1));

  /**
   * Moves to the previous page or maintains the current page, if the 
   * next one is out of bounds.
   */
  const gotoPreviousPage = () => onPageSelect(Math.max(0, currentPage - 1));

  /**
   * Creates the `Pagination.Item`-elements that represent page numbers 
   * in the control panel by iterating through page indicies starting 
   * from the `firstPage` and ending at `lastPage`.
   * 
   * @returns Array of JSX-elements forming the page number buttons.
   */
  const renderPageButtons = () => {
    const pageButtons = [];
    for( let i = firstPage; i < lastPage + 1; i++ )
    {
      pageButtons.push(
        <Pagination.Item
          key={"page-control-panel-page-button-" + i}
          active={currentPage === i}
          onClick={() => onPageSelect(i)}
        >
          {i + 1}
        </Pagination.Item>
      );
    }

    return pageButtons;
  }

  return (
    <Pagination>
      <Pagination.Prev onClick={gotoPreviousPage} />
        {renderPageButtons()}
      <Pagination.Next onClick={gotoNextPage} />
    </Pagination>
  );
}
