import React, { useState } from "react";
import{Button,Row,Col,Container} from 'react-bootstrap';
import ConfirmModal from  '../../main/FieldOPS/ConfirmModal';
import {DELETE_ACCOUNT} from '../../../module/CRUD';
import {signout} from '../../../module/Helper';
import { toast } from "react-toastify";
//Component for showing user account details
const AccountModal = (props) => {
    const[isConfirming,setConfirm]=useState(false)
    
    const{close}=props
    //Event handler for opening confirm modal
    const handelOpenConfirm =()=>{
        setConfirm(true);
    }
    //Event handler for closing confirm modal
    const handelCloseConfirm =()=>{
        setConfirm(false);
    }
    //Function for deleting users account
    const onConfirm= async()=>{
        try{
            const response= await DELETE_ACCOUNT()
            toast.success(`${response.data.message}`);
            signOut()
        }catch(e){
            toast.warning(`${e.response.data.message}`);
        }
        
        
        
    }
    //Function to sign out user once account is deleted
    const signOut = () => {
        signout(() => props.history.push("/login"));
    
        
      };
    const message ='By Hitting Confirm your account will be deleted with all associated data'
  return (
    <div className="my-modal-Account-bg">
      <div className="my-modal-Account">
        {isConfirming? <ConfirmModal confirm={onConfirm} closeDelete={handelCloseConfirm} message={message}/>:null}
       
      <Container className="flex" style={{ padding: "15px", width: "100%", height: "100%" }}>
          <Row className='justify-content-center'>
            <Col  xs={{ order: 6 }} >
                <h1>
                    Account Details
                </h1>
            </Col>
            
            <Col  md='auto' xs={{ order: 12 }} >
                 <Button variant="danger" className="closeAccount" onClick={close} >
                    Back
                </Button>
            </Col>
               
          </Row>
        
        <Row className='justify-content-left'>
            <Col className="text-right" md={{span:3}}>
                <h3 >
                    Username:
                </h3>
            </Col>
            <Col lassName="text-left"  md='auto'>
                <h3 style={{color:'grey'}}>
                    Liam
                </h3>
            </Col>
          
        </Row>     
        <Row className='justify-content-left'>
            <Col className="text-right" md={{span:3}}>  
                <h3 >
                    Email:
                </h3>
            </Col>
            <Col lassName="text-left" md='auto'>
                <h3 style={{color:'grey'}}>
                    liamkeatonhendricks@gmail.com
                </h3>
            </Col>
        </Row>
        <Row className='justify-content-center'>
        <       Button variant="danger" className="closeAccount" onClick={handelOpenConfirm}>
                   DELETE ACCOUNT
                </Button>
        </Row>
        
      </Container>
         
      </div>
    </div>
  );
};

export default AccountModal;
