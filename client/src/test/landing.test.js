import React from 'react';
import renderer from 'react-test-renderer';
import AccountModal from '../Components/main/Account/AccountModal';


describe('SnapShot testing for Landing', () => {
   
    it('<Landing />', () => {
        
        const tree = renderer.create(<AccountModal />).toJSON();
        expect(tree).toMatchSnapshot();
      });
  
})
