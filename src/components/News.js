import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import "../news.css";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  // const [fetching, setFetching] = useState(true);
  
  //capitalize first letter of category items
  const newsCategory =
    props.category.charAt(0).toUpperCase() + props.category.slice(1);


  const fetchNews = async (page) => {
    props.setProgress(35);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      props.setProgress(55);

      setLoading(false);

      if (data.articles && data.articles.length > 0) {
        setArticles(data.articles); 
        setTotalResults(data.totalResults);
        setPage(page);
      } else {
        // No articles found
        setArticles([]);
        setTotalResults(0);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
    props.setProgress(100);
    // setFetching(false);
  };

  useEffect(() => {
    document.title = `NewsNinja - ${newsCategory}`;
    fetchNews(1);
    // eslint-disable-next-line
  },[]);

  const fetchMoreData = async () => {
    const { country, category, apiKey, pageSize } = props;

    const nextPage = page + 1;

    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      // Check if there are new articles to append
      setArticles(articles.concat(data.articles));
      setTotalResults(data.totalResults);
      setPage(nextPage);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  return (
    <>
      <div className="container my-3">
        <h2 className="text-center mb-4">
          NewsNinja - Top {newsCategory} Headlines{" "}
        </h2>
        {loading && <Spinner />}
        {articles.length > 0 ? (
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner />}
          >
            <div className="container">
              <div className="row">
                {articles.map((item) => (
                  <div className="col-md-4" key={item.url}>
                    <NewsItem
                      title={item.title}
                      description={item.description}
                      author={item.author}
                      date={item.publishedAt}
                      imageUrl={item.urlToImage}
                      newsUrl={item.url}
                      url={item.url}
                      source={item.source}
                      isLoading={loading}
                    />
                  </div>
                ))}
              </div>
            </div>
          </InfiniteScroll>
        ) : (
          !loading && (
            <div className="col-md-12">
              <p className="text-center no-article page-load-error">
                No articles found. Please check back later.
              </p>
            </div>
          )
        )}
      </div>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 9,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
