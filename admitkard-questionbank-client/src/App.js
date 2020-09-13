import React from 'react';
import './App.css';
import Navbar from './Components/NavBarComponent';
import Questions from './Components/QuestionComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component{

  constructor(props){
    super(props);

    this.searchHandler = this.searchHandler.bind(this);
    this.update = this.update.bind(this);

    this.state={
      allQuestions:{
        topic:"",
        query:"",
        tags:[]
      },
      filter:{
        topic:"",
        query:"",
        tags:[]
      },
      searchValue:""
      
    };
  }
  update() {
     this.callAPI();
    }
  async searchHandler(searchResults,search) {
    
   await this.setState({
      filter: searchResults,
      searchValue:search
    });
  }

     callAPI(){
     fetch("http://localhost:8000/question/fetch")
      .then(res =>res.json())
      .then((res)=>{
        
        this.setState({
          allQuestions:res,
          filter:res
        })
        
        
      })
      .catch((ex) => {
        console.log('parsing failed', ex)
      });
    };

  async componentWillMount(){
   await  this.callAPI();
    
    }
  

  render(){
    return (
   
      <div>
            {(() => {
              if(this.state.filter.questions!==undefined ){
                
                return(
                      <div>
                        <Navbar question={this.state} searchEngine = {this.searchHandler} updatePage={this.update}/>    
                        {this.state.filter.questions.map((question, index) => {
                        
                         return <div key={index} ><Questions  question={question} /></div>
                         
                    })}
                  
                      </div>
                    )
              }
              else if(this.state.filter.length!==0){
                let questions=[];
                for(let i=0;i<this.state.filter.length;i++){
                  questions.push(this.state.filter[i]);
                  
                }
        
                return(
                  <div>
                    <Navbar question={this.state} searchEngine = {this.searchHandler} updatePage={this.update}/>    
                    
                    {questions.map((question, index) => {
                        
                        return <div key={index} ><Questions  question={question} /></div>
                      })}
                
                  </div>
                )
                
              }
              else
              return <Navbar question={this.state} searchEngine = {this.searchHandler}/>;
              
            })()}
        </div>
        );
  }
}



export default App;
