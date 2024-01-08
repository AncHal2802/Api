import React from 'react'

import { Card, Button } from 'react-bootstrap';
import axios from 'axios';

const cardStyle = {
  marginBottom: '20px',
  transition: 'transform 0.3s ease-in-out',
  
};

const cardHoverStyle = {
  transform: 'scale(1.05)',
};

const h1Style = {
  fontSize: '2rem',
  marginBottom: '20px',
  textAlign: 'center',
};

const cardColumnsStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
};

const newsContainerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '20px',
};



class NewsCard extends React.Component {
    render() {
        return (
            <Card style={{ width: '18rem' }} className="card">
                <Card.Img variant="top" src={this.props.imgSrc} />
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text>
                        {this.props.description}
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        );
    }
}

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        newsData: [],
    };
}

componentDidMount() {
    // Replace 'YOUR_NEWS_API_KEY' with your actual News API key
    const apiKey = '95e823f044ff4fbbb2d89b2115f8a5a5';
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            this.setState({ newsData: data.articles });
        })
        .catch((error) => {
            console.error('Error fetching news data:', error);
        });
}
    render() {
      const { newsData } = this.state;
        return (
            <div style={newsContainerStyle} className="news-container">
                <h1 style={h1Style}>Top News</h1>
                <div style={cardColumnsStyle} className="card-columns">
                {newsData.map((newsItem, index) => (
                    <NewsCard 
                    key={index}
                    imgSrc={newsItem.urlToImage || 'https://via.placeholder.com/150'}
                    title={newsItem.title}
                    description={newsItem.description || 'No description available'}
                    />
                ))}
                </div>
            </div>
        );
    }
}

export default News;