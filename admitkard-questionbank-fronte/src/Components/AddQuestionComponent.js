import React from 'react';
import {Modal,Button,Form,Col,Row} from 'react-bootstrap';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure()
var tag=""
var Question

const TagsInput = props => {
	const [tags, setTags] = React.useState(props.tags);
	const removeTags = indexToRemove => {
    
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    tag="";
    
    for(let i=0;i<tags.length-1;i++){
      tag+=(tags[i]);
      if(i!==tags.length-2)
      tag+=","
     
    }
    
	};
	const addTags = event => {
		if (event.target.value !== "") {
			setTags([...tags, event.target.value]);
			props.selectedTags([...tags, event.target.value]);
			event.target.value = "";
		}
	};
	return (
		<div className="tags-input">
			<ul id="tags">
				{tags.map((tag, index) => (
					<li key={index} className="tag">
						<span className='tag-title'>{tag}</span>
						<span className='tag-close-icon'
							onClick={() => removeTags(index)}
						>
							x
						</span>
					</li>
				))}
			</ul>
			<input
				type="text"
				onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
				placeholder="Press enter to add tags"
			/>
		</div>
	);
};

function MyVerticallyCenteredModal(props) {

  const selectedTags = tags => {
    tag="";
    
    for(let i=0;i<tags.length;i++){
      tag+=tags[i];
      if(i!==tags.length-1)
      tag+=","
    }
	};
    return (
      
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" >
            ADD A NEW QUESTION HERE
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form >
           <Form.Group as={Row} >
           <Form.Label column sm={2}>
            Query :-
            </Form.Label>
           <Col sm={8}>
           <Form.Control id="query"  placeholder="Enter your query here ..!!" />
           </Col>
           </Form.Group>
           <Form.Group as={Row} >
           <Form.Label column sm={2}>
            Topic :-
            </Form.Label>
           <Col sm={8}>
           <Form.Control id="topic"  placeholder="Enter your topic here !!!!!!" />
           </Col>
           </Form.Group>
           <Form.Group as={Row} >
           <Form.Label column sm={2}>
            Tags :-
            </Form.Label>
           <Col sm={8}>
           <div className="Tags">
			<TagsInput selectedTags={selectedTags}  tags={[]}/>
	   	</div>
           </Col>
           </Form.Group>
          </form>
           
          </Modal.Body>
         <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button variant="primary" type="submit" id="submit" onClick={()=>Question(props.onHide)} >Submit</Button>
  
  
        </Modal.Footer>
      </Modal>
    );
  }

  
function AddQuestion(props) {
  
  Question= async function addQuestion(close){
    
    let query=document.getElementById("query").value.trim();
    let topic=document.getElementById("topic").value.trim();
    tag=tag.trim();
    console.log(tag)
    if(query.length>0 && topic.length>0 && tag.length>0 ){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          query:query,
          topic:topic,
          tags:tag
         })
    };
  
    fetch('http://localhost:8000/question/add', requestOptions)
          .then(response => response.json())
          .then(data => console.log("Added question"))
          .catch((ex) => {
            console.log('parsing failed', ex)
          });
        
          toast.success("Question Added Successfully.....!",{autoClose:3000});
          await  props.update();
          document.getElementById("submit").addEventListener("click",close())
         
          
    }
  
    else{
     toast.error("Fill All The Fields...!",{autoClose:3000})
    
    }
        
   
          
  };
  
    const [modalShow, setModalShow] = React.useState(false);
    
    return (
      <>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          + ADD QUESTION
        </Button>
  
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }

export default AddQuestion;