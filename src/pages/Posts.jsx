import { useEffect, useState } from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import './post.css';

function Posts() {
  const [storeData, setStoreData] = useState([]);

  useEffect(() => {
    fetch('https://codebuddy.review/posts')
      .then(res => res.json())
      .then(data => {
        setStoreData([...data.data.posts]);
      });
  }, []);

  return (
    <div className="main">
      {storeData.map(item => (
        <div key={item.id} className="item">
          <Card>
            <Card.Img variant="top" src={item.image} />
            <Card.Body>
              <Card.Text>{item.writeup}</Card.Text>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  -{item.firstName} {item.lastName}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default Posts;
