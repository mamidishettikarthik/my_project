
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";

const App = () => {
  const [items, setItem] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  let limit = 5;
  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=${limit}`
      );
      const data = await res.json();
      const total = res.headers.get("x-total-count");
      setpageCount(Math.ceil(total / 12));
      setItem(data);
    };
    getComments();
  }, []);

  const fetchComments = async (currentPage) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=12`
    );
    const data = await res.json();
    return data;
  };

  const handleClick = async (data) => {
    let currentPage = data.selected + 1;
    const commentsFormServer = await fetchComments(currentPage);
    setItem(commentsFormServer);
  };

  return (
    <div>
      <div className="row m-2">
        {items.map((item) => {
          return (
            <div key={item.id} className="col-sm-6 col-md-4 v my-2">
              <div className="card shadow-sm w-100" style={{ minHeight: 225 }}>
                <div className="card-body">
                  <h5 className="card-title text-center h2">Id :{item.title} </h5>
                  <h6 className="card-subtitle mb-2 text-muted text-center">
                    {item.body}
                  </h6>
                  <p className="card-text">{item.body}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handleClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default App;