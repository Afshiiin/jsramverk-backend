process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();
chai.use(chaiHttp);


describe('Test the functionality of the landing page', () => {
    describe('GET /', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/hello/Afshin")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.msg.should.be.eq="Afshin"
                    done();
                });
        });
    });
});