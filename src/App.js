import './App.css';
import { useEffect, useState } from 'react';
import { Col, Form, Row, Table, Button } from 'react-bootstrap';

function App() {

  const [data, set_data] = useState([
    {
      "movie":"The Nun",
      "rating":"4.2",
      "duration":"2:15"
    },
    {
      "movie":"Forest Gump",
      "rating":"4.4",
      "duration":"3:15"
    },
    {
      "movie":"Gladiator",
      "rating":"3.2",
      "duration":"2:30"
    },
    {
      "movie":"Armageddon",
      "rating":"4.6",
      "duration":"2:10"
    },
  ]);
  const [search_data, set_search_data] = useState([]);
  const [search, set_search] = useState('');
  const [new_data, set_new_data] = useState({'movie':'', 'rating':'', 'duration':''});
  const [entry, set_entry] = useState(false);

  useEffect(() => {
    handleSearch(search)
  }, [entry])

  const addNewMovie = () => {
    var check = data.filter((movie => ((movie.movie).toLowerCase()) == (new_data.movie).toLowerCase()))
    if (check.length){
      data.map((d, index) => {
        if(check[0].movie == d.movie) {
          var temp = [...data]
          temp[index].movie = new_data.movie
          temp[index].rating = new_data.rating
          temp[index].duration = new_data.duration
          set_data(temp)
        }
      })
    }
    else{
      console.log('else')
      var temp = [...data];
      temp.unshift(new_data);
      set_data(temp)
    }
    set_new_data({'movie':'', 'rating':'', 'duration':''})
    set_entry(!entry)
  }

  const handleSearch = (search) => {
    set_search(search)
    var temp = []
    if (search.trim()){
      data.filter((d => ((d.movie).toLowerCase()).includes(search.toLowerCase()))).map(movie => 
        temp.push(movie)
      )
      set_search_data(temp)
    }
    else if (search.trim() == '') {
      temp = [...data]
      set_data(temp)
    }
  }

  return (
    <div className="App">
      <div>
        <h3 className='text-left'>Rate your favourite movies</h3>
        <Form className='mt-5'>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextMovie">
            <Form.Label column sm="2">Movie</Form.Label>
            <Col sm="6">
              <Form.Control type="text" placeholder="Enter movie name" value={new_data.movie} onChange={(e) => set_new_data({
                ...new_data,
                movie: e.target.value
              })} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextRating">
            <Form.Label column sm="2">Rating</Form.Label>
            <Col sm="6">
              <Form.Control type="text" placeholder="Enter movie rating" value={new_data.rating} onChange={(e) => set_new_data({
                ...new_data,
                rating: e.target.value
              })} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextDuration">
            <Form.Label column sm="2">Duration</Form.Label>
            <Col sm="6">
              <Form.Control type="text" placeholder="Enter movie duration" value={new_data.duration} onChange={(e) => set_new_data({
                ...new_data,
                duration: e.target.value
              })} />
            </Col>
          </Form.Group>
          <Button onClick={() => addNewMovie()}>Submit</Button>
        </Form>
      </div>
      <Form className='mt-5'>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2">Search</Form.Label>
          <Col sm="6">
            <Form.Control type="text" placeholder="Search by movie name" value={search} onChange={(e) => handleSearch(e.target.value)} />
          </Col>
        </Form.Group>
      </Form>
      <Table striped bordered hover className='mt-5'>
        <thead>
          <tr>
            <th>Movie</th>
            <th>Rating</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {search.trim() == '' ? data.map((d) => 
            <tr>
              <td>{d.movie}</td>
              <td>{d.rating}</td>
              <td>{d.duration}</td>
            </tr>
          )
          :
          search_data.map((d) =>
          <tr>
            <td>{d.movie}</td>
            <td>{d.rating}</td>
            <td>{d.duration}</td>
          </tr>
          )
        }
        </tbody>
      </Table>
    </div>
  );
}

export default App;
