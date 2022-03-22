const clockObject = require('../Clock');

let clock = new clockObject.Clock();

/*
 * Next functions test if the object is correctly initialized
 * and if ALL the events are set as passed if they are so
 */

//Setting a Monday at 20:51 --> all events should be set as passed
clock.time = new Date("22 November 2021 20:51")

test('clock-object-initialization', () => {
    clock.checkEvents(false);
    expect(clock.checkEstimatesMilestone(false)).toEqual(true);
    expect(clock.checkOrdersAcceptedMilestone(false)).toEqual(true);
    expect(clock.checkProductsAvailabilityMilestone(false)).toEqual(true);
    expect(clock.checkWalletsOkMilestone(false)).toEqual(true);
})

//Setting a Monday at 18 --> only WalletsOK check should be passed

test('clock-object-initialization', () => {
    clock.time.setHours(18)
    clock.time.setMinutes(0)
    clock.checkEvents(false)
    expect(clock.checkEstimatesMilestone(false)).toEqual(true);
    expect(clock.checkOrdersAcceptedMilestone(false)).toEqual(true);
    expect(clock.checkProductsAvailabilityMilestone(false)).toEqual(true);
    expect(clock.checkWalletsOkMilestone(false)).toEqual(false);
})

//Setting Monday at 8:59 and Sunday at 23 --> only orders accepted and product estimates should be passed

test('clock-object-initialization', () => {
    clock.time.setHours(8)
    clock.time.setMinutes(59)
    expect(clock.checkEstimatesMilestone(false)).toEqual(true);
    expect(clock.checkOrdersAcceptedMilestone(false)).toEqual(true);
    expect(clock.checkProductsAvailabilityMilestone(false)).toEqual(true);
    expect(clock.checkWalletsOkMilestone(false)).toEqual(false);
})

test('clock-object-initialization', () => {
    clock.time.setDate(21)
    clock.time.setHours(23)
    clock.time.setMinutes(0)
    expect(clock.checkEstimatesMilestone(false)).toEqual(true);
    expect(clock.checkOrdersAcceptedMilestone(false)).toEqual(true);
    expect(clock.checkProductsAvailabilityMilestone(false)).toEqual(true);
    expect(clock.checkWalletsOkMilestone(false)).toEqual(false);
})

//Setting Saturday at 19 --> only product estimations should be passed

test('clock-object-initialization', () => {
    clock.time.setDate(20)
    clock.time.setHours(19)
    clock.time.setMinutes(0)
    clock.checkEvents(false);
    expect(clock.checkEstimatesMilestone(false)).toEqual(true);
    expect(clock.checkOrdersAcceptedMilestone(false)).toEqual(false);
    expect(clock.checkProductsAvailabilityMilestone(false)).toEqual(false);
    expect(clock.checkWalletsOkMilestone(false)).toEqual(false);
})

//Setting Saturday at 8:59 --> no events should be passed

test('clock-object-initialization', () => {
    clock.time.setHours(8)
    clock.time.setMinutes(59)
    expect(clock.checkEstimatesMilestone(false)).toEqual(true);
    expect(clock.checkOrdersAcceptedMilestone(false)).toEqual(false);
    expect(clock.checkProductsAvailabilityMilestone(false)).toEqual(false);
    expect(clock.checkWalletsOkMilestone(false)).toEqual(false);
})

/*
 * Next functions test if setting time corresponding
 * to an event is set correctly
*/

//Testing farmer products estimationd and checking time and other events
test('clock- set an event', () => {
    clock.time.setDate(18);
    expect(clock.setFarmerEstimatesMilestone(false)).toEqual(false);
    expect(clock.checkEstimatesMilestone(false)).toEqual(true);
    expect(clock.checkOrdersAcceptedMilestone(false)).toEqual(false);
    expect(clock.checkProductsAvailabilityMilestone(false)).toEqual(false);
    expect(clock.checkWalletsOkMilestone(false)).toEqual(false);
})

//Testing if the event is passed the set function should return false
test('clock- set an event', () => {
    clock.time.setDate(20);
    clock.time.setHours(9);
    clock.time.setMinutes(0);
    expect(clock.setFarmerEstimatesMilestone(false)).toEqual(false);
})

//Testing order accepted and checking time and other events
test('clock- set an event', () => {
    clock.time.setDate(18);
    expect(clock.setOrdersAcceptedMilestone(false)).toEqual(true);
    expect(clock.checkEstimatesMilestone(false)).toEqual(true);
    expect(clock.checkOrdersAcceptedMilestone(false)).toEqual(true);
    expect(clock.checkProductsAvailabilityMilestone(false)).toEqual(false);
    expect(clock.checkWalletsOkMilestone(false)).toEqual(false);
})

//Testing if it is a sunday
test('clock- set an event', () => {
    clock.time.setDate(21);
    clock.time.setHours(19);
    clock.time.setMinutes(0);
    clock.checkEvents(false);
    expect(clock.setOrdersAcceptedMilestone(false)).toEqual(true);
})

//Testing if the event is passed the set function should return false
test('clock- set an event', () => {
    clock.time.setDate(21);
    clock.time.setHours(23);
    clock.time.setMinutes(0);
    expect(clock.setOrdersAcceptedMilestone(false)).toEqual(false);
})


//Testing availability confirmed and checking time and other events
test('clock- set an event', () => {
    clock.time.setDate(18);
    expect(clock.setAvailabilityConfirmedMilestone(false)).toEqual(true);
    expect(clock.checkEstimatesMilestone(false)).toEqual(true);
    expect(clock.checkOrdersAcceptedMilestone(false)).toEqual(true);
    expect(clock.checkProductsAvailabilityMilestone(false)).toEqual(true);
    expect(clock.checkWalletsOkMilestone(false)).toEqual(false);
})

//Testing if it is monday
test('clock- set an event', () => {
    clock.time.setDate(22);
    clock.time.setHours(8);
    clock.time.setMinutes(0);
    clock.checkEvents(false);
    expect(clock.setAvailabilityConfirmedMilestone(false)).toEqual(true);
})

//Testing if it is sunday
test('clock- set an event', () => {
    clock.time.setDate(21);
    clock.time.setHours(8);
    clock.time.setMinutes(0);
    clock.checkEvents(false);
    expect(clock.setAvailabilityConfirmedMilestone(false)).toEqual(true);
})

//Testing if the event is passed the set function should return false
test('clock- set an event', () => {
    clock.time.setDate(22);
    clock.time.setHours(19);
    clock.time.setMinutes(0);
    expect(clock.setAvailabilityConfirmedMilestone(false)).toEqual(false);
})

//Testing availability confirmed and checking time and other events
test('clock- set an event', () => {
    clock.time.setDate(18);
    expect(clock.setWalletOKMilestone(false)).toEqual(true);
    expect(clock.checkEstimatesMilestone(false)).toEqual(true);
    expect(clock.checkOrdersAcceptedMilestone(false)).toEqual(false);
    expect(clock.checkProductsAvailabilityMilestone(false)).toEqual(true);
    expect(clock.checkWalletsOkMilestone(false)).toEqual(true);
})

//Testing if it is monday
test('clock- set an event', () => {
    clock.time.setDate(22);
    clock.time.setHours(19);
    clock.time.setMinutes(0);
    clock.checkEvents(false);
    expect(clock.setWalletOKMilestone(false)).toEqual(true);
})

//Testing if it is sunday
test('clock- set an event', () => {
    clock.time.setDate(21);
    clock.time.setHours(8);
    clock.time.setMinutes(0);
    clock.checkEvents(false);
    expect(clock.setWalletOKMilestone(false)).toEqual(true);
})

//Testing if the event is passed the set function should return false
test('clock- set an event', () => {
    clock.time.setDate(22);
    clock.time.setHours(23);
    clock.time.setMinutes(0);
    expect(clock.setWalletOKMilestone(false)).toEqual(false);
})


/* ---- RESET Function ---- */

//Testing Invalid date format
test('clock-reset', () => {
    expect(clock.reset("feferg")).toEqual(false);
})

//Testing a day that is not Tuesday
test('clock-reset', () =>{
    expect(clock.reset("22 November 2021")).toEqual(false);
})

//Testing a day that is Tuesday
test('clock-reset', () =>{
    expect(clock.reset("23 November 2021")).toEqual(true);
})