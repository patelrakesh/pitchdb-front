/* eslint-disable linebreak-style */
import axios from 'axios';
import baseApiCalls from '../base-api-calls';

const OUTREACH_SEQUENCES_ENDPOINT = '/outreach-sequences/';

const outreachSequencesApi = {
  getAll: () => axios.get(baseApiCalls.BASE_URL + OUTREACH_SEQUENCES_ENDPOINT),

  getById: (id, withStages) => axios.get(baseApiCalls.BASE_URL + OUTREACH_SEQUENCES_ENDPOINT + id + '?withStages=' + withStages),

  createSequences: sequences => axios.post(baseApiCalls.BASE_URL + OUTREACH_SEQUENCES_ENDPOINT, sequences),

  createStage: (sequenceId, stage) => axios.post(baseApiCalls.BASE_URL + OUTREACH_SEQUENCES_ENDPOINT + sequenceId + "/stage", stage),

  removeSequence: sequenceId => axios.delete(baseApiCalls.BASE_URL + OUTREACH_SEQUENCES_ENDPOINT + sequenceId),

  getEmailReport: id => axios.get(baseApiCalls.BASE_URL + OUTREACH_SEQUENCES_ENDPOINT + id + "/email-validity"),

  createEmailReport: reportData => axios.put(baseApiCalls.BASE_URL + OUTREACH_SEQUENCES_ENDPOINT + reportData.outreachId + "/email-validity", reportData),

  addNote: (id, note) => axios.put(baseApiCalls.BASE_URL + OUTREACH_SEQUENCES_ENDPOINT + id + "/add-note", note),

  editNote: (id, idNote, note) => axios.put(baseApiCalls.BASE_URL + OUTREACH_SEQUENCES_ENDPOINT + id + "/edit-note/" + idNote, note),

  removeNote: (id, idNote) => axios.delete(baseApiCalls.BASE_URL + OUTREACH_SEQUENCES_ENDPOINT + id + "/remove-note/" + idNote)
};

export default outreachSequencesApi;