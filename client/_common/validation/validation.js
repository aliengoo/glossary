"use strict";

import Immutable from 'immutable';

const ContainerValidityState = Immutable.Map({});

export function validateElementInContainer(element, containerValidityState = ContainerValidityState) {
  const elementName = element.getAttribute('name');

  if (!elementName) {
    throw "validateElementInContainer: element must have a name";
  }

  element.checkValidity();

  return containerValidityState.set(elementName, Immutable.fromJS(element.validity));
}

export function evaluateContainerValidity(containerValidityState = ContainerValidityState) {

  let isValid = true;

  var usernameValidity = containerValidityState.get('username');
  console.log("usernameValidity:", usernameValidity.get('valid'));

  for(let entry in containerValidityState.entries()) {
    console.log(entry);
    //if (isValid && validity && validity.get('valid') === false) {
    //  isValid = false;
    //}
  }

  return containerValidityState.set('$isValid', isValid);
}


export function validateContainer(container, containerValidityState = ContainerValidityState) {

  let runningState = containerValidityState;

  $(container).find('select[name], input[name], textarea[name]').each((index, element) => {
    runningState = validateElementInContainer(element, runningState);
  });

  return evaluateContainerValidity(runningState);
}