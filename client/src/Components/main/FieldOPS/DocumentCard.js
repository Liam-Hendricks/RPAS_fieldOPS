import React, { Component } from "react";
import { Accordion, Button, Card, ProgressBar } from "react-bootstrap";
import { toast } from "react-toastify";
import {UPLOAD_DOCUMENT,VIEW_DOCUMENT} from '../../../module/CRUD';
import { Page } from "react-pdf";
import { Document } from "react-pdf/dist/entry.webpack";


//This compponent handles the loading ,uploading and displaying of PDF documents
class DocumentCard extends Component {
  //setting state of components
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      filename: "",
      Filedata: "",
      fileType: "",
      pageNumber: 1,
      uploadPercentage: 0,
      numPages: null,
      isLoading: false,
    };
  }
  
  //Function for getting a  document from database
  loadDoc = async (docType) => {
    const { selectedFieldOPS } = this.props;

    if (selectedFieldOPS !== "") {
      this.setState({ isLoading: true });

      try {
       const response = await VIEW_DOCUMENT(selectedFieldOPS,docType);
        if (response.data.length === 0) {
          toast.warning("No document found");
        }
        this.setState({ documents: response.data, isLoading: false });
      } catch (e) {
        this.setState({ documents: [] });
      }
    } else {
      toast.warning("Please select a Fields OPs");
    }
  };
  //Function for uploading a document to database
  onFormSubmit = async (e) => {
    const { filename, Filedata, fileType } = this.state;
    const { selectedFieldOPS } = this.props;
    if (Filedata !== null) {
      if (selectedFieldOPS === "") {
        toast.warning(`Please Select a Field Ops`);
      } else {
        let formData = new FormData();
        formData.append("file", Filedata);

        const options = {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            let percent = Math.floor((loaded * 100) / total);
            console.log(`${loaded}kb of ${total}kb | ${percent}%`);

            if (percent < 100) {
              this.setState({ uploadPercentage: percent });
            } else if (percent === 100) {
              this.setState({ uploadPercentage: percent });
            }
          },
        };
        try {
          const response = await UPLOAD_DOCUMENT(filename,Filedata,fileType,selectedFieldOPS,e.target.id,options)
            
          if (response.data.message === "File already exsist") {
            toast.warning(`${response.data.message} `);
          } else {
            toast.success(`${response.data.message} `);
          }
        } catch (e) {
          toast.warning(`${e.response.data.message}`);
        }
      }
    }
  };
  //Function for setting pages once document is loaded
  onDocumentLoadSuccess = (numPages) => {
    this.setState({ numPages: numPages });
  };
  //function for switching document when user browses computer
  onChange = (e) => {
    const name = e.target.files[0].name;
    const filetype = e.target.files[0].type;
    this.setState({
      uploadPercentage: 0,
      Filedata: "",
      filename: "",
      documents: "",
    });

    this.base46(e.target.files[0])
      .then((result) => {
        const b64 = result.replace(/^data:.+;base64,/, "");
        this.setState({
          fileType: filetype,
          filename: name,
          uploadPercentage: 0,
          Filedata: b64,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //function for converting file to base64 string
  base46 = (file) => {
    const promise = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
    return promise;
  };

  render() {
    const { card_name } = this.props;
    const { uploadPercentage, isLoading,documents} = this.state;

    const checkDocument = () => {
      const { documents, filename } = this.state;
      if (documents.length === 0) {
        if (filename === "") {
          return `Choose file`;
        } else {
          return filename;
        }
      } else {
        if (documents.length === 0) {
          return `Choose file`;
        } else {
          return documents.file.name;
        }
      }
    };
    const loadpdf = () => {
      const { documents, pageNumber, Filedata } = this.state;
      if (documents.length === 0) {
        if (Filedata === "") {
          return null;
        } else {
          return (
            <div>
              <Document
                file={`data:application/pdf;base64,${Filedata}`}
                onLoadSuccess={this.onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} />
              </Document>
            </div>
          );
        }
      } else {
        if (documents.length === 0) {
          return null;
        } else {
          return (
            <div>
              <Document
                file={`data:application/pdf;base64,${documents.file.file}`}
                onLoadSuccess={this.onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} />
              </Document>
            </div>
          );
        }
      }
    };
    const downloadPDF =(pdf)=> {
      const linkSource = `data:application/pdf;base64,${pdf}`;
      const downloadLink = document.createElement("a");
      const fileName = `${checkDocument()}`;
  
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
  }
    
    return (
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="info" eventKey={card_name}>
            {card_name}
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={card_name}>
          <Card.Body>
            <div
              className="input-group"
              style={{ width: "60%", marginRight: "auto", marginLeft: "auto" }}
            >
              <Button
                variant="secondary"
                id={card_name}
                onClick={() => this.loadDoc(card_name)}
                style={{marginRight:'15px'}}
              >
                Load Document
              </Button>
              <div className="input-group-prepend">
                <Button
                  variant="primary"
                  id={card_name}
                  onClick={this.onFormSubmit}
                  style={{marginRight:'15px'}}
                >
                  Upload
                </Button>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id={card_name}
                  aria-describedby="inputGroupFileAddon01"
                  onChange={this.onChange}
                />

                <label className="custom-file-label" htmlFor={card_name}>
                  {checkDocument()}
                </label>

              </div>
              {documents.length === 0?
                null:
                <Button 
                  variant='primary'  
                  style={{marginLeft:'15px'}} 
                  onClick={()=>downloadPDF(documents.file.file)}
                 
                >
                Download File
                </Button>
              }
             
            </div>

            <div style={{ height: "30px" }}>
              {uploadPercentage > 0 ? (
                <ProgressBar
                  now={100}
                  label={`Uploading file :${uploadPercentage}%`}
                />
              ) : null}
            </div>

            {isLoading ? (
              <div>
                <h3>Loading...</h3>
              </div>
            ) : (
              loadpdf()
            )}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  }
}

export default DocumentCard;
