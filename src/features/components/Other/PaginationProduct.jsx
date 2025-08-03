import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductPage, setCurrentPage, setProductSize } from '../../../slice/productPageSlice';

export default function PaginationProduct() {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.productPageSlice);
  const request = data.request;
  const respond = data.respond;

  const productSize = request.productSize;
  const latest = request.latest;
  const currentPage = request.currentPage;

  const totalElements = respond.totalElements;
  const pageNumber = respond.pageNumber;
  const currentPageNumber = pageNumber + 1;
  const totalPages = respond.totalPages;
  const numberOfElements = respond.numberOfElements;

  const first = respond.first;
  const last = respond.last;

  const [currentPageLc, setCurrentPageLc] = useState(currentPageNumber);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);

  // Shared classes
  const pageItemBaseClass = 'flex h-6 md:h-8 w-8 md:w-10 items-center rounded-md justify-center text-black/50';
  const pageItemHoverClass = 'cursor-pointer hover:text-primary';
  const pageItemActiveClass = 'bg-primary text-white';
  const pageItemDisabledClass = 'opacity-20';
  const dotsClass = 'flex h-6 md:h-8 w-8 md:w-10 items-center justify-center text-black/50 hover:text-primary';

  useEffect(() => {
    setCurrentPageLc(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (latest === false || latest === null) {
      setFrom(pageNumber * productSize + 1);
      setTo(pageNumber * productSize + numberOfElements);
    } else {
      setFrom(totalElements - pageNumber * productSize);
      setTo(totalElements - pageNumber * productSize - numberOfElements + 1);
    }
  }, [latest, pageNumber, productSize, totalElements, numberOfElements]);

  const handlePageClick = (pagenumber) => {
    setCurrentPageLc(pagenumber);
    dispatch(setCurrentPage(pagenumber));
    dispatch(getProductPage());
    // scrollToProducts();
  };

  const scrollToProducts = () => {
    const productsElement = document.getElementById('products');
    if (productsElement) {
      const offset = 130;
      const elementPosition = productsElement.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  const handleChangeProductSize = (value) => {
    setCurrentPageLc(1);
    dispatch(setCurrentPage(1));
    dispatch(setProductSize(value));
    dispatch(getProductPage());
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Previous button
    pageNumbers.push(
      <span
        key='first'
        className={`${pageItemBaseClass} ${first ? pageItemDisabledClass : pageItemHoverClass}`}
        onClick={() => !first && handlePageClick(Math.max(1, currentPageLc - 1))}
      >
        <i className='fa-solid fa-chevron-left' />
      </span>
    );

    // Desktop version - original logic
    pageNumbers.push(
      <div key='desktop' className='hidden md:flex'>
        {renderDesktopPages()}
      </div>
    );

    // Mobile version - simplified logic
    pageNumbers.push(
      <div key='mobile' className='flex md:hidden'>
        {renderMobilePages()}
      </div>
    );

    // Next button
    pageNumbers.push(
      <span
        key='last'
        className={`${pageItemBaseClass} ${last ? pageItemDisabledClass : pageItemHoverClass}`}
        onClick={() => !last && handlePageClick(Math.min(totalPages, currentPageLc + 1))}
      >
        <i className='fa-solid fa-chevron-right' />
      </span>
    );

    return pageNumbers;
  };

  const renderDesktopPages = () => {
    const pages = [];
    const maxVisiblePages = 1;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(renderPageItem(i));
      }
    } else {
      // Original logic exactly as before
      pages.push(renderPageItem(1));

      if (currentPageLc > 3) {
        pages.push(renderDots('dots1'));
      }

      const startPage = Math.max(2, currentPageLc - 2);
      const endPage = Math.min(currentPageLc + 2, totalPages - 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(renderPageItem(i));
      }

      if (currentPageLc < totalPages - 2) {
        pages.push(renderDots('dots2'));
      }

      pages.push(renderPageItem(totalPages));
    }

    return pages;
  };

  const renderMobilePages = () => {
    const pages = [];

    if (totalPages <= 5) {
      // Show all pages if total <= 5
      for (let i = 1; i <= totalPages; i++) {
        pages.push(renderPageItem(i));
      }
    } else {
      if (currentPageLc <= 2) {
        // Case: 1 2 3 ... 9
        for (let i = 1; i <= 3; i++) {
          pages.push(renderPageItem(i));
        }
        pages.push(renderDots('dots'));
        pages.push(renderPageItem(totalPages));
      } else if (currentPageLc >= totalPages - 1) {
        // Case: 1 ... 7 8 9
        pages.push(renderPageItem(1));
        pages.push(renderDots('dots'));
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(renderPageItem(i));
        }
      } else if (currentPageLc === 3 || currentPageLc === totalPages - 2) {
        // Case: 1 2 3 4 ... 9 or 1 ... 6 7 8 9
        if (currentPageLc === 3) {
          // Show: 1 2 3 4 ... 9
          for (let i = 1; i <= 4; i++) {
            pages.push(renderPageItem(i));
          }
          pages.push(renderDots('dots'));
          pages.push(renderPageItem(totalPages));
        } else {
          // Show: 1 ... 6 7 8 9
          pages.push(renderPageItem(1));
          pages.push(renderDots('dots'));
          for (let i = totalPages - 3; i <= totalPages; i++) {
            pages.push(renderPageItem(i));
          }
        }
      } else {
        // Case: 1 ... 4 5 6 ... 9 (3 consecutive pages around current)
        pages.push(renderPageItem(1));
        pages.push(renderDots('dots1'));
        for (let i = currentPageLc - 1; i <= currentPageLc + 1; i++) {
          pages.push(renderPageItem(i));
        }
        pages.push(renderDots('dots2'));
        pages.push(renderPageItem(totalPages));
      }
    }

    return pages;
  };

  const renderPageItem = (pageNum) => {
    const isActive = currentPageLc === pageNum;
    return (
      <span
        key={pageNum}
        className={`${pageItemBaseClass} ${isActive ? pageItemActiveClass : pageItemHoverClass}`}
        onClick={() => handlePageClick(pageNum)}
      >
        {pageNum}
      </span>
    );
  };

  const renderDots = (key) => {
    return (
      <span key={key} className={dotsClass}>
        ...
      </span>
    );
  };

  return (
    <>
      <div className='relative flex w-full justify-center text-[8px] md:text-[14px]'>
        <div className='payload z-1 absolute left-0 flex h-full w-full items-center justify-between gap-1'>
          <div className='hidden md:block'>
            {from} <span className='text-black/30'>to</span> {to} <span className='text-black/30'>of</span> {totalElements}
          </div>
          <div className='block md:hidden'>
            {from} <span className='text-black/30'>{'->'}</span> {to} <span className='text-black/30'>/</span> {totalElements}
          </div>
          <div className='flex items-center gap-1'>
            <p className='hidden md:block'>Size</p>
            <input
              className='flex w-10 justify-center rounded-xl border border-black/50 px-2 py-1 text-center'
              type='text'
              value={productSize}
              onChange={(event) => handleChangeProductSize(event.target.value)}
            />
          </div>
        </div>

        <div className='z-10 flex'>{renderPageNumbers()}</div>
      </div>
    </>
  );
}
