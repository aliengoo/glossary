"use strict";

import {invokeAsync} from '../_common/api/restApi';
import keymirror from 'keymirror';

const GlossaryInitialState = Immutable.Map({
  fetching: false,
  err: null,
  entry: Immutable.fromJS({}),
  entries: Immutable.Iterator([])
});

const GlossaryContext = "glossary";

// ACTIONS
const GlossaryActionTypes = keymirror({
  createGlossaryEntry: null,
  getGlossaryEntry: null,
  updateGlossaryEntry: null
});

/**
 * Creates a new glossary entry
 * @param entry
 * @returns {*}
 */
function createGlossaryEntryAction(entry) {
  return invokeAsync(
    "POST", "/api/glossary/entry", null, entry, GlossaryActionTypes.createGlossaryEntry, GlossaryContext);
}

/**
 * Gets a glossary entry based on the entry._id
 * @param id
 * @returns {*}
 */
function getGlossaryEntryAction(id) {
  return invokeAsync(
    "GET", `/api/glossary/entry/${id}`, null, null, GlossaryActionTypes.getGlossaryEntry, GlossaryContext);
}

/**
 * Updates an existing glossary entry
 * @param entry
 * @returns {*}
 */
function updateGlossaryEntryAction(entry) {
  return invokeAsync(
    "PUT", `api/glossary/entry/${entry._id}`, null, entry, GlossaryActionTypes.updateGlossaryEntry, GlossaryContext);
}

/**
 * Main reducer function for the glossary property of application state.
 * @param state
 * @param action
 * @returns {*}
 */
function glossaryReducer(state = GlossaryInitialState, action) {

  if (action.context !== GlossaryContext) {
    return state;
  }

  switch (action.type) {
    case GlossaryActionTypes.createGlossaryEntry:
      break;
    case GlossaryActionTypes.getGlossaryEntry:
      break;
    case GlossaryActionTypes.updateGlossaryEntry:
      break;
  }
}

// ************************ EXPORTS ************************
export {
  GlossaryInitialState,
  GlossaryContext,
  GlossaryActionTypes

  createGlossaryEntryAction,
  getGlossaryEntryAction,
  updateGlossaryEntryAction,

  glossaryReducer
}