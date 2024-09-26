process.env.NODE_ENV = "test";
const { database } = require('../db/database.js'); // Assuming this is a CommonJS module
const mongoose = require('mongoose');
const server = require("../app");
const chai = require('chai');
const chaiHttp = require('chai-http');
const delDB  = require('../models/Doc.js');
chai.should();
chai.use(chaiHttp);


before((done) => {
  delDB.deleteMany({}, (err) => {
    if (err) return done(err);
    done();
  });
});

after((done) => {
  delDB.deleteMany({}, (err) => {
    if (err) return done(err);
    done();
  });
});


describe('POST Method /post', () => {
  it('201 HAPPY PATH', () => {
      const document = {
          '_method': 'post',
          name: "New Text",
          value: "Hello world!",
      };

      chai.request(server)
          .post("/post")
          .send(document)
          .then(function (res) {
              res.should.have.status(201);
          }).catch(function (err) {
              throw err;
          });
  });
});

/* 
describe("GET Method /get", () => {
  it("should GET all the items", async () => {
    try {

      const response = await chai.request(server).get("/get")
      .end((err,res)=>{
   
        res.should.have.status(200);
        res.body.length.should.be.above(0);
        res.body.should.be.an("array");
        for (const i in res.body) {
          res.body[i].should.be.an("object");
      }
  
      })
    } catch (error) {
      throw error;
    }
  });
});  */

describe("GET Method /get", () => {
  it("should GET all the items", async () => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZWFlMTBiYTdkNWI1NWM5Yjk1YWIzMSIsImlhdCI6MTcyNzM0ODAxMiwiZXhwIjoxNzI3NDM0NDEyfQ.IEJxxkvx7PxjJtb3753BjSDmhJy4irOwmbdXSdBpnE4';

      const response = await chai
        .request(server)
        .get("/get")
        .set('Authorization', `Bearer ${token}`) 

      response.should.have.status(200);
      response.body.length.should.be.above(0);
      response.body.should.be.an("array");
      
    
      for (const item of response.body) {
        item.should.be.an("object");
      }
    } catch (error) {
      throw error;
    }
  });
});


describe("Wronge endpoint /gett", () => {
  it("should GET all the items 2", async () => {
    try {

      const response = await chai.request(server).get("/gett")
      .end((err,res)=>{
   
        res.should.have.status(404);
  
      })
      
    
    } catch (error) {
      throw error;
    }
  });
});  




describe("PUT Method /put", () => {
  it("should GET all the items and then PUT an update", async () => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZWFlMTBiYTdkNWI1NWM5Yjk1YWIzMSIsImlhdCI6MTcyNzM0ODAxMiwiZXhwIjoxNzI3NDM0NDEyfQ.IEJxxkvx7PxjJtb3753BjSDmhJy4irOwmbdXSdBpnE4';

      // GET request
      const getResponse = await chai.request(server)
        .get("/get")
        .set('Authorization', `Bearer ${token}`); 

      getResponse.should.have.status(200);

      if (getResponse.body.length > 0) {
        const IdPut = getResponse.body[0]._id;

        const updateDocument = {
          id: IdPut,
          name: 'Test update document',
          value: 'update content'
        };

        // PUT request
        const putResponse = await chai.request(server)
          .put("/put")
          .set('Authorization', `Bearer ${token}`) 
          .send(updateDocument);

        putResponse.should.have.status(201);

        // Validate the updated document
        const updatedItem = await chai.request(server)
          .get(`/get`)
          .set('Authorization', `Bearer ${token}`); 

        if (updatedItem.body.length > 0) {
          updatedItem.body[0].should.have.property('name').eql('Test update document');
          updatedItem.body[0].should.have.property('value').eql('update content');
        }
      } else {
        throw new Error("No documents found to update");
      }
    } catch (error) {
      throw error;
    }
  });
});


  
/* describe("PUT Method /put", () => {
  it("should GET all the items and then PUT an update", async () => {
    try {
      // GET request
      const getResponse = await chai.request(server).get("/get");
      getResponse.should.have.status(200);

      if (getResponse.body.length > 0) {
        const IdPut = getResponse.body[0]._id; 

        const updateDocument = {
          id: IdPut,
          name: 'Test update document',
          value: 'update content'
        };

        // PUT request
        const putResponse = await chai.request(server)
          .put("/put")
          .send(updateDocument);

        putResponse.should.have.status(201);
        const updatedItem = await chai.request(server).get(`/get`);
        if (updatedItem.body.length > 0) {
          updatedItem.body[0].should.have.property('name').eql('Test update document');
          updatedItem.body[0].should.have.property('value').eql('update content');
        }
      } else {
        throw new Error("No documents found to update");
      }
    } catch (error) {
      throw error;
    }
  });
}); */


describe('DELETE method', () => {
  it('Delete the existed document', async () => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZWFlMTBiYTdkNWI1NWM5Yjk1YWIzMSIsImlhdCI6MTcyNzM0ODAxMiwiZXhwIjoxNzI3NDM0NDEyfQ.IEJxxkvx7PxjJtb3753BjSDmhJy4irOwmbdXSdBpnE4';

      // GET request
      const getResponse = await chai.request(server)
        .get("/get")
        .set('Authorization', `Bearer ${token}`);

      getResponse.should.have.status(200);

      if (getResponse.body.length > 0) {
        const IdDelete = getResponse.body[0]._id;

        const deleteDocument = {
          id: IdDelete
        };

        // DELETE request
        const deleteResponse = await chai.request(server)
          .delete("/delete")
          .set('Authorization', `Bearer ${token}`) 
          .send(deleteDocument);

        deleteResponse.should.have.status(200);

        // Verify the document is deleted
        const getAfterDeleteResponse = await chai.request(server)
          .get("/get")
          .set('Authorization', `Bearer ${token}`); 

        // Check if the document was actually deleted
        if (getAfterDeleteResponse.body.message !== "No valid entry found!") {
          throw new Error('Document was not deleted');
        }
      } else {
        throw new Error('No documents found to delete');
      }
    } catch (error) {
      throw error;
    }
  });
});


describe('DELETE method with not existed id', () => {
  it('Delete the not existed document', async () => {
      try {
        const idFake = "1234567"
        const updateDocument = {
          id: idFake
        };
        const putResponse = await chai.request(server)
          .delete("/delete")
          .send(updateDocument);
        putResponse.should.have.status(400);
    } catch (error) {
      throw error;
    }

  });
});