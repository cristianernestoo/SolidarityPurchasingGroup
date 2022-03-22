import 'react-calendar/dist/Calendar.css';
import React, { useEffect, useState } from 'react';
import { ButtonGroup, Button, ButtonToolbar } from 'react-bootstrap';
import {BsFillArrowRightSquareFill, BsFillArrowLeftSquareFill} from 'react-icons/bs'
import Calendar from 'react-calendar';

function VirtualClock(props){
    const [hour, setHour] = useState();
    const [date, setDate] = useState();

    const [flagSaturday, setFlagSaturday] = useState(false);
    const [flagSunday, setFlagSunday] = useState(false);
    const [flagMonday9, setFlagMonday9] = useState(false);
    const [flagMonday20, setFlagMonday20] = useState(false);
    const clock = props.clock;

    useEffect(() => {
        setDate(props.clock.time);
        console.log(props.clock.time);
        setHour(props.clock.time.getHours());
        let day = props.clock.time.getDay();
        console.log(day)
        switch(day) {
            case 6 :
                if(clock.checkEstimatesMilestone()){
                    clock.setFarmerEstimatesMilestone();
                    setFlagSaturday(true);
                }
                break;
            case 0 :
                setFlagSaturday(true);
                if(clock.checkOrdersAcceptedMilestone()){
                    clock.setOrdersAcceptedMilestone();
                    setFlagSunday(true);
                }
                break;
            case 1 :
                setFlagSaturday(true);
                setFlagSunday(true);
                if(clock.checkProductsAvailabilityMilestone()){
                    clock.setAvailabilityConfirmedMilestone();
                    setFlagMonday9(true);
                }
                if(clock.checkWalletsOkMilestone()){
                    clock.setWalletOKMilestone();
                    setFlagMonday20(true);
                }
                break; 
            default:
                break;
        }
    }, []);


    function nextWeekdayDate(date, day_in_week) {
        var ret = new Date(date);
        ret.setDate(ret.getDate() + (day_in_week - 1 - ret.getDay() + 7) % 7 + 1);
        let data = ret.toString().split(" ")
        let day = data[2]
        let month = data[1]
        let year = data[3]
        clock.reset(day + " " + month + " " + year);
        resetFlag();
        return ret;
    }

    function resetFlag(){
        setFlagSaturday(false);
        setFlagSunday(false);
        setFlagMonday9(false);
        setFlagMonday20(false);
    }

    function handleSaturday(){
        clock.setFarmerEstimatesMilestone();
        setFlagSaturday(true);
    }

    function handleSunday(){
        if(flagSaturday === false){
            clock.setFarmerEstimatesMilestone();
        }
        clock.setOrdersAcceptedMilestone();
        setFlagSunday(true);
    }

    function handleMonday9(){
        if(!flagSaturday){
            clock.setFarmerEstimatesMilestone();
        }
        if(!flagSunday){
            clock.setOrdersAcceptedMilestone();
        }
        clock.setAvailabilityConfirmedMilestone();
        setFlagMonday9(true);
    }

    function handleMonday20(){
        if(!flagSaturday){
            clock.setFarmerEstimatesMilestone();
        }
        if(!flagSunday){
            clock.setOrdersAcceptedMilestone();
        }
        if(!flagMonday9){
            clock.setAvailabilityConfirmedMilestone();
        }
        console.log(flagSaturday)
        clock.setWalletOKMilestone();
        setFlagMonday20(true);
    }


    return (
        <>
            <ButtonToolbar>
                <ButtonGroup size="lg" className="clock mx-auto">
                    <Button variant="outline-success" disabled={flagSaturday || flagSunday || flagMonday9 || flagMonday20} onClick={() => handleSaturday()}>
                        Saturday 09:00
                    </Button>
                    <Button variant="outline-success" disabled={flagSunday || flagMonday9 || flagMonday20} onClick={() => handleSunday()}>
                        Sunday 23:00
                    </Button>
                    <Button variant="outline-success"  disabled={flagMonday9 || flagMonday20} onClick={() => handleMonday9()}>
                        Monday 09:00
                    </Button>
                    <Button variant="outline-success" disabled={flagMonday20} onClick={() => handleMonday20()}>
                        Monday 20:00
                    </Button>
                </ButtonGroup>
            </ButtonToolbar>
            <div className='calendar-container d-flex justify-content-center mt-3'>
                <Calendar onChange={setDate} value={date} minDate={new Date()} minDetail='month' maxDate={new Date(2021, 12, 1)}/>
            </div>
            <div className='d-flex justify-content-center mt-3'>
                <Button variant="success" className='ml-3 mr-1' onClick={()=> setDate(nextWeekdayDate(date, 2) )}>
                    Next week
                    <BsFillArrowRightSquareFill className='ml-3 mr-1' size={30} fill="green"/>
                </Button>
            </div>
            <h1 className='text-center mt-3'></h1>
        </>
    )
}
export default VirtualClock;
