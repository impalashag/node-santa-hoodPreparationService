
const min_gifts = (params, callback) => {
  
    let hood_capacity = params.hood_capacity;
    const present_weights = params.present_weights;

    let valid_presents = [], condition = true, remainder = 0, lastPop = 0, lastPopDone = false;

    // Sorting the list of presents weights in the descending order
    present_weights.sort((b, a) => a - b);

    while (condition) {

        // Looping through each element of array to find remainder and store lowest available weight for that remiander in the output array
        present_weights.forEach( function (value) {
            if (value <= hood_capacity) {
                if (!lastPopDone || (lastPop > value)) {
                    remainder = hood_capacity%value
                    divisor = (hood_capacity-remainder)/value
                    hood_capacity= remainder
                    valid_presents = valid_presents.concat(Array(divisor).fill(value))
                }
                
            }
            
        })
        if (hood_capacity === 0) {
            // if remainder or hood_capacity has become zero that means set of weights has been formed
            condition = false

        } else if (hood_capacity > 0 && valid_presents.length === 0) {
            // checking the length of output array, if empty that means given set of weights are not valid
            condition = false;
            return callback('Unable to prepare hood with the given set of presents. Please provide a valid set of present weights', undefined)

        } else if (hood_capacity> 0) {

            if ((valid_presents[valid_presents.length - 1] === present_weights[present_weights.length -1]) && (valid_presents.length > 1)) {
                hood_capacity= hood_capacity+ valid_presents.pop()
                lastPop = valid_presents.pop()
                hood_capacity= hood_capacity+ lastPop
                lastPopDone = true
            } else {
                lastPop = valid_presents.pop()
                hood_capacity= hood_capacity+ lastPop
                lastPopDone = true
            }
        }
    }
    callback(undefined, valid_presents);
}

module.exports = min_gifts;