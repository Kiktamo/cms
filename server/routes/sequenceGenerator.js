var Sequence = require('../models/sequence');

var maxDocumentId;
var maxMessageId;
var maxContactId;
var sequenceId = null;

class SequenceGenerator {
  constructor() {
    this.initializeSequence();
  }

  async initializeSequence() {
    try {
      const sequence = await Sequence.findOne();
      
      if (sequence) {
        sequenceId = sequence._id;
        maxDocumentId = sequence.maxDocumentId;
        maxMessageId = sequence.maxMessageId;
        maxContactId = sequence.maxContactId;
      }
    } catch (err) {
      console.log('Failed to initialize sequence: ', err);
    }
  }

  async nextId(collectionType) {
    var updateObject = {};
    var nextId;

    switch (collectionType) {
      case 'documents':
        maxDocumentId++;
        updateObject = {maxDocumentId: maxDocumentId};
        nextId = maxDocumentId;
        break;
      case 'messages':
        maxMessageId++;
        updateObject = {maxMessageId: maxMessageId};
        nextId = maxMessageId;
        break;
      case 'contacts':
        maxContactId++;
        updateObject = {maxContactId: maxContactId};
        nextId = maxContactId;
        break;
      default:
        return -1;
    }

    try {
      // Using updateOne instead of update (which is deprecated)
      await Sequence.updateOne(
        {_id: sequenceId}, 
        {$set: updateObject}
      );
    } catch (err) {
      console.log("nextId error = " + err);
      return null;
    }

    return nextId;
  }
}

module.exports = new SequenceGenerator();