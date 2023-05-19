import Pagination from "react-bootstrap/Pagination";


export default function PageControlPanel(props) {
  const currentPage = props.currentPage || 0;
  const onPageSelect = props.onPageSelect || function(pageIndex){ }
  const firstPage = props.firstPage || 0;
  const lastPage = props.lastPage || 0;

  const gotoNextPage = () => onPageSelect(Math.min(lastPage, currentPage + 1));

  const gotoPreviousPage = () => onPageSelect(Math.max(0, currentPage - 1));

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
