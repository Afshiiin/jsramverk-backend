process.env.NODE_ENV = 'test';

(async () => {
    const { expect } = await import('chai');
    const chaiHttp = (await import('chai-http/index.js')).default; 
  
    const chai = (await import('chai')).default;
    chai.use(chaiHttp);
    const server = app.listen(1337, () => console.log(`Example app listening on port ${1337}!`));

    chai.should();
    
    chai.use(chaiHttp);
    
    describe('Reports', () => {
        describe('GET /reports/kmom01', () => {
            it('200 HAPPY PATH', (done) => {
                chai.request(server)
                    .get("/reports/kmom01")
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.an("object");
                        res.body.data.should.be.an("array");
                        res.body.data.length.should.be.above(0);
    
                        done();
                    });
            });
        });
    
        describe('GET /reports/kmom02', () => {
            it('200 HAPPY PATH', (done) => {
                chai.request(server)
                    .get("/reports/kmom02")
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.an("object");
                        res.body.data.should.be.an("array");
                        res.body.data.length.should.be.above(0);
    
                        done();
                    });
            });
        });
    });
  })();
