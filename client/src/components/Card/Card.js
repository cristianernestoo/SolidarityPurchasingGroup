import React from 'react';
import './Card.css';

function Card(props) {
    return(
        <div className='card-container'>
            <div className='img-container'>
                <img src={props.img} alt={props.title}/>
            </div>
            <div className='card-content'>
                <div className='card-title' style={{overflowX:"hidden", overflowY:"hidden"}}>
                    <h3 style={{fontSize: "1.3rem", margin: "0", padding: "0"}}>{props.title}</h3>
                </div>
                <div className='card-body-p'>
                    <p style={{margin: "0", padding: "0"}}>{props.body}</p> 
                </div>  
                <hr className='solid'/>
                <div className='card-subinfo'>
                    <h3 style={{fontSize: "1.3rem", margin: "0", padding: "0"}}> Price </h3>
                    <h4 style={{fontSize: "1.9rem", margin: "0", padding: "0", justifyContent: "left", fontWeight: "bold"}}>€{props.subinfo.toFixed(2)}</h4>
                </div>  
            </div>
            <div className='card-button'>
                <button>
                    Add to cart
                </button>

            </div>

        </div>


    );

}

export default Card;