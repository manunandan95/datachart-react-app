import React, { useState } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form } from "react-bootstrap";
import 'bootstrap-css-only/css/bootstrap.min.css';
import Chart from './components/Chart'

function App() {
  const [chartName] = useState('');
  const [template, setTemplateValues] = useState('');
  const [keyValues, setKeyValues] = useState([]);
  const [dataValues, setDataValues] = useState([]);
  const [formValues, setFormValues] = useState([]);
  const [key, setKey] = useState('')
  const [value, setValue] = useState('')
  const [chartValues, setChartValues] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleForm = (e) => {
    e.preventDefault();
    setFormValues(formValues.concat([{ x: key, y: value }]))
    setKeyValues(keyValues.concat(key))
    setDataValues(dataValues.concat(value))
    setKey('')
    setValue('')
    setShow(false);
  }

  const handleChart = (e) => {
    e.preventDefault();

    setChartValues(chartValues.concat([{
      name: chartName,
      type: template,
      labels: keyValues,
      data: dataValues,
    }]));
    setKey('')
    setValue('')
    setTemplateValues('')
  }

  const clearForm = (e) => {
    e.preventDefault()
    setFormValues([])
    setKeyValues([])
    setDataValues([])
  }


  return (
    <Container>
      <Row >
        <Col className="col-12 col-lg-6 p-3" >


          <form style={{ width: '100%', marginTop: "30px" }}>
            <select className="browser-default custom-select" value={template} onChange={e => setTemplateValues(e.target.value)} required>
              <option>Choose your Template</option>
              <option value={'line'}>Line</option>
              <option value={'bar'}>Bar</option>
              <option value={'pie'}>Pie</option>
              <option value={'doughnut'}>Doughnut</option>
            </select>
            {/* <input className="pad" type="submit" value="Submit New Template" /> */}

            <div style={{ minHeight: "380px", marginTop: "20px" }}>
              <Table responsive>
                <thead className="thead-light">
                  <tr>
                    <th>Tag</th>
                    <th>Data</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {formValues.map((f, i) => {
                    return (
                      <tr key={i} className="table">
                        <td>{f.x}</td>
                        <td>{f.y}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </div>
            <Button variant="warning" style={{ minWidth: "40%" }} className="btn btn-primary mr-2 mb-3" onClick={handleShow} >
              Add Data
            </Button>

            <Button variant="danger" style={{ minWidth: "40%" }} className="btn btn-primary mr-2 mb-3" onClick={clearForm}>
              Reset Data
            </Button>
            <Button variant="success" style={{ minWidth: "82%" }} className="btn btn-primary mr-2 mb-3" type="submit" onClick={handleChart} disabled={template === '' || keyValues.length <= 0 || dataValues.length <= 0}>
              Submit
            </Button>
          </form>
          <Modal show={show} onHide={handleClose} animation={false} >
            <Modal.Header closeButton>
              <Modal.Title>Add Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Enter Tag</Form.Label>
                  <Form.Control type="text" placeholder="Enter tag" value={key} onChange={e => setKey(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Enter Data</Form.Label>
                  <Form.Control type="number" placeholder="Enter Data" value={value} onChange={e => setValue(e.target.value)} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
          </Button>
              <Button variant="primary" onClick={handleForm} disabled={key.length <= 0 || value.length <= 0} >
                Save Changes
          </Button>
            </Modal.Footer>
          </Modal>
        </Col>
        <Col className="col-12 col-lg-6 p-3">
          {chartValues.map((e, i) => {
            return (
              <Chart style={{ height: '300px' }} key={i} cName={e.name} cType={e.type} cLabels={e.labels} cData={e.data} />
            );
          })}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
