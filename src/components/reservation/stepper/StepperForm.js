import React, { useContext, useEffect, useState } from 'react'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import StepperCheckin from './StepperCheckin';
import StepperCheckout from './StepperCheckout';
import { Row, Button, Col, Spinner } from 'react-bootstrap';
import StepperUserForm from './StepperUserForm';
import StepperConfirmation from './StepperConfirmation';
import FeedbackToTheUser from '../FeedbackToTheUser';
import { Link, NavLink } from 'react-router-dom'
import userContext from '../../../context/user-context';

function getSteps() {
  return ['Érkezés', 'Távozás', 'Adatok', 'Véglegesítés'];
}

const StepperForm = ({reservationsToCheckin,
  bookingData,
  setBookingData,
  reservationsToCheckout,
  lastCheckoutDate,
  validationErrors,
  setCheckedCheckbox,
  checkedCheckbox,
  reserveForUser,
  isLoadingReservationsForUser,
  setLastCheckoutDate,
  successReservation,
  reserveAdminForUser
}) => {

  const { user } = useContext(userContext)

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  }

  // if(successReservation){
  //   setTimeout(() => {
  //     handleReset()
  //   }, 4000)
  // }
  
  useEffect(() => {
    if(successReservation) handleNext()
  }, [successReservation])
  

  useEffect(() => { 

    if(bookingData.checkin && reservationsToCheckout.length !== 0){
      const found = reservationsToCheckout.find(element => element > bookingData.checkin);
      setLastCheckoutDate(found)
    }

  }, [bookingData.checkin, reservationsToCheckout])


  return (
    <>
      <Stepper activeStep={activeStep} alternativeLabel className="px-0 py-4">
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length 
        ? (
          <>
            {/* <Typography >All steps completed</Typography> */}
            <FeedbackToTheUser />
            {/* <Button
                className="stepper-button border-0 rounded-0 me-4 w-25"
                // size="sm" 
                disabled={activeStep === 0 || isLoadingReservationsForUser || successReservation}
                // onClick={handleReset}
                >
                Foglalásaim
              </Button> */}
            {/* <Button onClick={handleReset}>Reset</Button> */}
          </>
          ) 
        : activeStep === 0 
        ? <StepperCheckin  
            reservationsToCheckin={reservationsToCheckin}
            bookingData={bookingData}
            setBookingData={setBookingData}
          /> 
        : activeStep === 1 
        ? <StepperCheckout  
            reservationsToCheckout={reservationsToCheckout}
            bookingData={bookingData}
            setBookingData={setBookingData}
            lastCheckoutDate={lastCheckoutDate}
          />
        : activeStep === 2 
        ? <StepperUserForm 
            bookingData={bookingData} 
            validationErrors={validationErrors} 
            setBookingData={setBookingData} 
            setCheckedCheckbox={setCheckedCheckbox} 
            checkedCheckbox={checkedCheckbox} 
            reserveForUser={reserveForUser} 
            isLoadingReservationsForUser={isLoadingReservationsForUser}
          />
        : <StepperConfirmation
            bookingData={bookingData} 
            validationErrors={validationErrors}
            reserveForUser={reserveForUser}
          />
        
        // !successReservation 
        // ? <StepperConfirmation
        //     bookingData={bookingData} 
        //     validationErrors={validationErrors}
        //     reserveForUser={reserveForUser}
        //   />
        // : <FeedbackToTheUser />
      }
      <Row className="my-4">
        <Col>
          {activeStep === steps.length - 1 
          ? (
            <>
              <Button
                className="stepper-button border-0 rounded-0 me-4 w-25"
                // size="sm" 
                disabled={activeStep === 0 || isLoadingReservationsForUser}
                // disabled={activeStep === 0 || isLoadingReservationsForUser || successReservation}
                onClick={handleBack}
                >
                Vissza
              </Button>
              <Button
                disabled={isLoadingReservationsForUser}
                // disabled={isLoadingReservationsForUser || successReservation}
                className="stepper-button-submit border-0 rounded-0 w-25"                  
                onClick={() => {
                  user.admin ? reserveAdminForUser() : reserveForUser()
                }}
              >
                {isLoadingReservationsForUser && <Spinner
                  className="me-2"
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />}
                {!isLoadingReservationsForUser ? "Küldés" : "Küldés..."}
              </Button>
            </>)
          : successReservation 
          ?  (
            <NavLink as={Link} to='/auth/current_reservation' onClick={handleReset} className="stepper-success-button border-0 rounded-0 me-4 w-25">Foglalásaim</NavLink>
            // <Button
            //   className="stepper-button border-0 rounded-0 me-4 w-25"
            //   // size="sm" 
            //   disabled={activeStep === 0 || isLoadingReservationsForUser}
            //   // onClick={handleReset}
            //   >
            //   Foglalásaim (ez egy link lesz)
            // </Button>
          ) 
          : (
            <>
              <Button
                className="stepper-button border-0 rounded-0 me-4 w-25"
                // size="sm" 
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Vissza
              </Button>
              <Button 
                className="stepper-button border-0 rounded-0 w-25"
                disabled={
                  (activeStep === 0 && !bookingData.checkin) || 
                  (activeStep === 1 && !bookingData.checkout) ||
                  (!user.admin && activeStep === 2 && (
                    !bookingData.firstname || 
                    !bookingData.lastname || 
                    !bookingData.email || 
                    !bookingData.phone || 
                    !bookingData.persons || 
                    !checkedCheckbox
                  )) ||
                  (user.admin && activeStep === 2 && (
                    !bookingData.firstname || 
                    !bookingData.lastname || 
                    !bookingData.email || 
                    !bookingData.phone || 
                    !bookingData.persons
                  ))
                }
                // size="sm" 
                onClick={handleNext}
              >
                Tovább
              </Button>
            </>
          )}
        </Col>
        {/* <Button
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button> */}
      </Row>
    </>
  )
}

export default StepperForm
