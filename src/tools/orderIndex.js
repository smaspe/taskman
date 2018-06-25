/**
 * Creates a new index positionned alphabetically between before and after
 * 
 * @param {String} before 
 * @param {String} after 
 */
// TODO Unit tests
// Test cases: 
// - 005, 010
// - 19, 20
// TODO pad 1 extra 0 so there should never be the i === len-1 case?
export function insert(before, after) {
    if (!before) {
        before = '0';
    }
    if (!after) {
        after = ''.padEnd(before.length, '9');
    }
    if (before >= after) {
        throw new Error(`No index between ${before} and ${after}`);
    }
    before = before.padEnd(after.length, '0');
    after = after.padEnd(before.length, '0');

    const len = before.length;
    let newIndex = '';
    for (let i = 0; i < len; i++) {
        const bChar = before[i];
        const aChar = after[i];
        if (bChar === aChar) {
            newIndex += bChar;
        } else {
            const bInt = parseInt(bChar, 10);
            const aInt = parseInt(aChar, 10);
            const halfStep = Math.floor((aInt - bInt) / 2);
            if (halfStep !== 0) {
                // Enough room to put an index between those 2
                newIndex += `${halfStep + bInt}`;
            } else if (i === len - 1) {
                // Last character, adding 5
                newIndex += `${bChar}5`;
            } else {
                let nines = 0;
                let j = i + 1;
                let found = false;
                for (; j < len; j++) {
                    if (before[j] === '9' && after[j] === '0') {
                        nines++;
                    } else {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    newIndex += bChar;
                    newIndex = newIndex.padEnd(nines + newIndex.length, '9');
                    newIndex += '5';
                } else {
                    const newBInt = parseInt(before[j], 10);
                    const newAInt = parseInt(after[j], 10);
                    const mean = Math.floor((newAInt - (10 - newBInt)) / 2);

                    if (mean >= 0) {
                        newIndex += aChar;
                        newIndex = newIndex.padEnd(nines + newIndex.length, '0');
                        newIndex += mean;
                    } else {
                        newIndex += bChar;
                        newIndex = newIndex.padEnd(nines + newIndex.length, '9');
                        newIndex += (10 + mean);
                    }
                }
                // Example: 197, 204. A good index would be 200 or 201, but 199 is ok too
            }
            break;
        }
    }
    if (newIndex >= after || newIndex <= before) {
        throw new Error(`Failed to generate new index between ${before} and ${after}`);
    }
    return newIndex;
}
