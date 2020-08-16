import axios from "axios";
const chai = require("chai");
const CRUD = require("../module/CRUD");
const Helper = require("../module/Helper");
//const chai = require('chai');
jest.mock("axios");
global.window = {};

describe("Testing CRUD", function () {
  it("should send user data to be deleted", async ()=> {
    const message = { message: "Account Deleted" };
    const resp = { message: "Account Deleted" };

    axios.get.mockImplementationOnce(() => Promise.resolve(resp));
    await expect(CRUD.DELETE_ACCOUNT()).resolves.toEqual(message);
    //return CRUD.DELETE_ACCOUNT().then((data) => expect(data).toEqual(message));
  });

  it("Should get the document", async () =>{
    const FieldOps='ROC';
    const docType='application/pdf'
    const message = { data: "data" };
    const resp = { data: "data" };
    axios.get.mockImplementationOnce(() => Promise.resolve(resp));
    await expect(CRUD.DELETE_ACCOUNT(FieldOps,docType)).resolves.toEqual(resp);
    //return CRUD.DELETE_ACCOUNT(FieldOps,docType).then((data) => expect(data).toEqual(message));
  });

  //   it('Should return correct path', function() {
  //         let key = 'token';
  //         let value = '1234';
  //         let expected = '1234';
  //         Helper.setCookie(key,value);
  //         const actual =cookies.get(key);
  //         expect(actual).to.equal(expected);
  //     });
});


