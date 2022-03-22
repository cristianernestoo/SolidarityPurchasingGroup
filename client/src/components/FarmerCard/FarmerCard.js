import React from 'react';
import './FarmerCard.css';

function FarmerCard(props) {
    return(
        <div className={props.confirmed ? 'farmer-card-container' : 'farmer-card-container-disabled'} title={props.confirmed ? '' : 'Not confirmed product'}>
            <div className='farmer-img-container'>
                <img src={props.img} alt={props.title}/>
            </div>
            <div className='farmer-card-content'>
                <div className='farmer-card-title' style={{overflowX:"hidden", overflowY:"hidden"}}>
                    <h3 style={{fontSize: "1.3rem", margin: "0", padding: "0"}}>{props.title}</h3>
                </div>
                <div className='farmer-card-body-p'>
                    <p style={{margin: "0", padding: "0"}}>{props.body}</p> 
                </div>  
                <hr className='solid'/>
                <div className='farmer-card-subinfo'>
                    <h3 style={{fontSize: "1.3rem", margin: "0", padding: "0"}}> Price </h3>
                    <h4 style={{fontSize: "1.9rem", margin: "0", padding: "0", justifyContent: "left", fontWeight: "bold"}}>€{props.subinfo.toFixed(2)}</h4>
                </div>  
            </div>
            <div className='farmer-card-button'>
                <button>
                    View details
                </button>

            </div>

        </div>


    );

}

export default FarmerCard;