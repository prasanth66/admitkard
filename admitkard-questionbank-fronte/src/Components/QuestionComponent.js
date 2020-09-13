import React from 'react';

class Question extends React.Component{
    render(){
       return(
        <div className="questions-container">
            <p>Query:- {this.props.question.query}</p>
            <p>Topic:- {this.props.question.topic}</p>
            <p>Tags:- {this.props.question.tags}</p>
        </div>
       )
    }
}

export default Question;