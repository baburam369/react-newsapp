import React, { Component } from "react";
import NewsItem from "./NewsItem";
import "../news.css";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  //capitalize first letter of category items
  newsCategory = this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1);
  
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title = `NewsNinja - ${this.newsCategory}`;
  }

 

  async fetchNews(page) {
    const { country, category, pageSize, setProgress } = this.props;
    setProgress(35)
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${this.props.apiKey}&page=${page}&pageSize=${pageSize}`;
    
    try {
    
     
      const response = await fetch(url);
      const data = await response.json();
      setProgress(55)
 

      this.setState({
        articles: data.articles,
        loading: false,
        totalResults: data.totalResults,
        page,
      });
    
    } catch (error) {
      console.error("Error fetching news:", error);
    }
    setProgress(100)
  }

  componentDidMount() {
    this.fetchNews(1);
  }


  fetchMoreData = async () => {
    const { country, category, pageSize } = this.props;
    const nextPage = this.state.page + 1;
  
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${this.props.apiKey}&page=${nextPage}&pageSize=${pageSize}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      // Check if there are new articles to append
      
        this.setState({
          articles:  this.state.articles.concat(data.articles),
          totalResults: data.totalResults,
          page: nextPage
  
        });
      
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };
  

  render() {
    let { articles, loading, totalResults } = this.state;

    return (
      <>
        <div className="container my-3">
          <h2 className="text-center mt-2 mb-4">NewsNinja - Top {this.newsCategory} Headlines </h2>
          {this.state.loading && <Spinner />}
          <InfiniteScroll
            dataLength = {articles.length}
            next ={this.fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner/>} 
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
              ))
          
          }
          </div>
          </div>
          </InfiniteScroll>
        </div>
      </>
    );
  }
}