/**
 * groupParticipants function
 *
 * @param  {[Array]} participants [Array with ids of participants]
 * @desc Basic function to group participants into a object
 *       Each participant has the count of tasks resolved and the index
 *       of the first one resolved
 * @return { Object }
 */
function groupParticipants(arr) {
  var participants = {};

  // Looping the array
  arr.forEach(function(idParticipant, index) {
    // If it's a new participant
    // init counter and save index position
    if (!participants[idParticipant]) {
      participants[idParticipant] = {
        index: index,
        count: 1
      }
    } else {
      // If participant already exists
      // increment counter
      participants[idParticipant].count += 1;
    }
  });

  return participants;
}

/**
 * calculateWinner function
 * @param  {[object]} participants [Object with list of participants]
 * @desc   Calculates the winner of the competition. It will select the
 *         participant who resolved more tasks and in case of tie, the one
 *         who resolved before the first task
 * @return {[Number]}   [Id of the Participant]
 */
function calculateWinner(participants) {
  var winner = {};

  // Looping the object with each participant
  for(var key in participants) {
    // If we don't have any winner selected or
    // the new partipant resolved more tasks than the temporal winner or
    // the new partipant has the same number tasks but started to resolve first
    // Then we have a new temporal winner!
    if ((!winner.hasOwnProperty('idParticipant')) ||
        (participants[key].count > winner.count) ||
        ((participants[key].count === winner.count) &&
         (participants[key].index < winner.index ))) {
      winner.idParticipant = key;
      winner.count = participants[key].count;
      winner.index = participants[key].index;
    }
  }

  return winner.idParticipant;
}

function findWinner(arr) {
  // Validate parameter not undefined/array/not empty
  if ((typeof arr === 'undefined') ||
      (!Array.isArray(arr)) ||
      (!arr.length)) {
    return -1;
  }

  // Group data into an object to simplify process
  var participants = groupParticipants(arr);

  // Calculate winner passing object
  return calculateWinner(participants);
}


var results = [3, 1, 2, 3, 2, 2, 1, 2, 3];
var winner = findWinner(results);

console.log(winner);
