const Pagination = ({ postsPerPage, totalPosts, paginate, currPage }) => {
    const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
      <ul className = 'pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='pageItem'>
            <button onClick={() => paginate(number)} className={number===currPage ? "currNumber" : null}>
              {number}
            </button>
          </li>
        ))}
      </ul>
  );
  }
  
  export default Pagination
  