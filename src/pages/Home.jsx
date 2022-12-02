import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import Forms from '../form/Forms';

const Home = () => (
  <main>
    <div className="bg-light p-5 mb-5">
      <h1>React + Bootstrap v4</h1>
      <p>React template with Bootstrap version v4</p>
      <p>
        <Button variant="primary">Learn more</Button>
      </p>
    </div>
    <Container>
      <Forms />
    </Container>
  </main>
);

export default Home;
