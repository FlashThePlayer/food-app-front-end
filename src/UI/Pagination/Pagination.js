import React from "react";
import classes from "./Pagination.module.css";

const Pagination = (props) => {

    const totalPages = props.maxPages;
    const page = props.currentPage;
    let pageButtons = [];

    let displayPages = [page];

    const firstPage = 1;
    const negativePage = page - 3;
    const positviePage = page + 3;

    if (positviePage < totalPages) {
        for (let i = page + 1; i <= positviePage; i++) {
            displayPages.push(i);
        }
    } else if (page < totalPages) {
        for (let i = page + 1; i < totalPages; i++) {
            displayPages.push(i);
        }
    }

    if (negativePage > firstPage) {
        for (let i = page - 1; i >= negativePage; i--) {
            displayPages.push(i);
        }
    } else if (page > firstPage) {
        for (let i = page - 1; i > 1; i--) {
            displayPages.push(i);
        }
    }

    displayPages.sort();

    const pagesArray = displayPages.map((pageNumber) => {
        if(pageNumber === page) {
            return <button className={classes.active}>{pageNumber}</button>;
        } else {
            return <button>{pageNumber}</button>;
        }
    });

    if (page > firstPage) {
        pageButtons.push(<button>1</button>);
        if(negativePage - 1 > firstPage){
            pageButtons.push(<button>...</button>);
        }
    }

    if (pagesArray.length !== 0) {
        pagesArray.forEach(btn => pageButtons.push(btn))
    }

    if (page < totalPages) {
        if(positviePage < totalPages) {
            pageButtons.push(<button>...</button>);
        }
        pageButtons.push(<button>{totalPages}</button>);
    }


  return (
    <div className={classes.Pagination}>
      {page !== 1 ? (
        <button className={classes.PrevButton} onClick={props.prevPage}>
          prev
        </button>
      ) : null}
      <div className={classes.PageButton}>{pageButtons}</div>
      {page !== totalPages ? (
        <button className={classes.NextButton} onClick={props.nextPage}>
          next
        </button>
      ) : null}
    </div>
  );
};

export default Pagination;
