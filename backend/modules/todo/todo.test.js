/* eslint-disable import/extensions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import status from 'http-status';
import app from '../../app.js';
import { list } from '../../utils/fixtures/list.fixture.js';

const { BAD_REQUEST, CREATED } = status;

chai.should();
chai.use(chaiHttp);

describe('/POST user creates a todo', () => {
  it('Should create a todo', (done) => {
    chai
      .request(app)
      .post('/api/v1/list')
      .send(list)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status');
        res.status.should.equal(CREATED);
        res.body.should.have.property('message');
        res.body.message.should.equal(
          'To DO has been created successfully',
        );
        res.body.should.have.property('data');
        res.body.data.should.be.an('object');
        res.body.data.should.have.property('_id');
        res.body.data.should.have.property('title');
        res.body.data.should.have.property('description');
        res.body.data.should.have.property('priority');
        res.body.data.should.have.property('createdAt');
        res.body.data.should.have.property('updatedAt');
        done();
      });
  });

  it('Should validate input fields', (done) => {
    chai
      .request(app)
      .post('/api/v1/list')
      .send('')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status');
        res.status.should.equal(BAD_REQUEST);
        res.body.should.have.property('message');
        res.body.message.should.be.an('array');
        done();
      });
  });
});
