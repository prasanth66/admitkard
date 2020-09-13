import React from 'react';
import {Navbar,Image,FormControl,Form} from 'react-bootstrap';
import CompanyLogo from '../images/CompanyLogo.png';
import AddQuestion from './AddQuestionComponent';

class NavBar extends React.Component{
    constructor(props){
        super(props);
        
        this.state={searchData:this.props.question.searchValue};
           
      }

     

    handleSearchChange = (event)=>{
   
   this.setState({searchData:event.target.value});

   let search=event.target.value;
   let searchResults=this.props.question.allQuestions.questions.map((question)=>{
       let query=question.query.toLowerCase();
       let tags=question.tags[0].toLowerCase();
       if(query.includes(search) || tags.includes(search))
       return question;
       return;
   });
   searchResults = searchResults.filter(function (e) {
    return e !==undefined;
   });
   this.props.searchEngine(searchResults,search)
   
    
    }
    render(){
        return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
        <Navbar.Brand href="#home">
        <Image
        alt="CompanyLogo"
        src={CompanyLogo} 
        width="70"
        height="50"
        className="d-inline-block align-top"
        thumbnail  /> {' '}
        <span className="align-middle">
            <span className="greenColour">Q</span>uestion 
            <span className="blueColour"> B</span>ank
        </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
       
      <FormControl type="text" 
      id="search" 
      placeholder="Search" 
       
      onChange={this.handleSearchChange}
      value={this.state.searchData}
      
      />

        <AddQuestion  update={this.props.updatePage}/>
        </Navbar.Collapse>
        
    </Navbar>
        )
    }
}

export default NavBar;