const axios = require('axios')
const CRUD = require("../module/CRUD");



afterEach(() => {
  jest.clearAllMocks();
}); 
jest.mock("axios")

describe('Testing axios CRUD functions', function() {
  it("Should make API request for getting user accounts", async () => {
    // Arrange
    const response = { message: "Test Passed" };
    axios.mockReturnValue(new Promise(r => r(response)));
    // Act
    const result = await CRUD.GET_USER_ACCOUNTS();

    // Assert
    expect(axios).toHaveBeenCalledTimes(1);
    expect(result).toBe(response);
    
  });
 
  it("Should make API request for deleting field ops", async () => {
    // Arrange
    const response = { message: "Test Passed" };
    axios.mockReturnValue(new Promise(r => r(response)));
    // Act
    const result = await CRUD.DELETE_FIELD_OPS();

    // Assert
    expect(axios).toHaveBeenCalledTimes(1);
    expect(result).toBe(response); 
    
  });


  
  it("Should make API request for deleting account", async () => {
    // Arrange
    const response = { message: "Test Passed" };
    axios.delete.mockReturnValue(new Promise(r => r(response)));
    // Act
    const result = await CRUD.DELETE_ACCOUNT();

    // Assert
    expect(axios).toHaveBeenCalledTimes(1);
    expect(result).toEqual(response); 
    
  });

  it("Should make API request for view documents", async () => {
    // Arrange
    const response = { message: "Test Passed" };
    axios.mockReturnValue(new Promise(r => r(response)));
     // Act
    const result = await CRUD.VIEW_DOCUMENT("Test","Test");
      
    // Assert
    expect(axios).toHaveBeenCalledTimes(1);
    expect(result).toBe(response); 
    
  });

  it("Should make API request for admin update account", async () => {
    // Arrange
    const response = { message: "Test Passed" };
    axios.mockReturnValue(new Promise(r => r(response)));
     // Act
    const result = await CRUD.ADMIN_UPDATE_ACCOUNT("Test","Test","Test","Test","Test");
      
    // Assert
    expect(axios).toHaveBeenCalledTimes(1);
    expect(result).toBe(response); 
    
  });

  it("Should make API request for delete event", async () => {
    // Arrange
    const response = { message: "Test Passed" };
    axios.mockReturnValue(new Promise(r => r(response)));
     // Act
    const result = await CRUD.DELETE_EVENT();
      
    // Assert
    expect(axios).toHaveBeenCalledTimes(1);
    expect(result).toBe(response); 
    
  });

  it("Should make API request for update file ops", async () => {
    // Arrange
    const response = { message: "Test Passed" };
    axios.mockReturnValue(new Promise(r => r(response)));
     // Act
    const result = await CRUD.UPDATE_FIELD_OPS([]);
      
    // Assert
    expect(axios).toHaveBeenCalledTimes(1);
    expect(result).toBe(response); 
    
  });

  it("Should make API request for get events", async () => {
    // Arrange
    const response = { message: "Test Passed" };
    axios.mockReturnValue(new Promise(r => r(response)));
     // Act
    const result = await CRUD.GET_EVENTS();
      
    // Assert
    expect(axios).toHaveBeenCalledTimes(1);
    expect(result).toBe(response); 
    
  });

  it("Should make API request for get events", async () => {
    // Arrange
    const response = { message: "Test Passed" };
    axios.mockReturnValue(new Promise(r => r(response)));
     // Act
    const result = await CRUD.LATEST_USER_DATA();
      
    // Assert
    expect(axios).toHaveBeenCalledTimes(1);
    expect(result).toBe(response); 
    
  });
  it("Should make API request for update events", async () => {
    // Arrange
    const response = { message: "Test Passed" };
    axios.mockReturnValue(new Promise(r => r(response)));
     // Act
    const result = await CRUD.UPDATE_EVENT(
      "Test",
      "Test",
      "Test",
      "Test",
      "Test",
      "Test",
      "Test",
      "Test",
      "Test",
      "Test",
      "Test"
    );
      
    // Assert
    expect(axios).toHaveBeenCalledTimes(1);
    expect(result).toBe(response); 
    
  });

  it("Should make API request for creat events", async () => {
    // Arrange
    const response = { message: "Test Passed" };
    axios.mockReturnValue(new Promise(r => r(response)));
     // Act
    const result = await CRUD.CREATE_EVENT(
      "Test",
      "Test",
      "Test",
      "Test",
      "Test",
      "Test",
      "Test",
      "Test",
      "Test",
      "Test"
    );
      
    // Assert
    expect(axios).toHaveBeenCalledTimes(1);
    expect(result).toBe(response); 
    
  });
});



 


