const FormatAddress = (addy) => {
    if(!addy) return addy;
    const windowWidth = window.innerWidth;
    if(windowWidth>600) return addy;
    const step = 4;
    return `${addy.substring(0,step+2)}...${addy.substring(addy.length-step,addy.length)}`;
}

const FormatTimestamp = thisDate => {
    const padTo2Digits = (num) => {
        return num.toString().padStart(2, '0');
    }

    if(typeof thisDate.getMonth !== 'function') return thisDate;

    const date = new Date(thisDate);

    // Extract date components
    const year = date.getFullYear();
    const month = padTo2Digits(date.getMonth() + 1); // Months are 0-based in JavaScript
    const day = padTo2Digits(date.getDate());

    // Extract time components
    let hours = date.getHours();
    const minutes = padTo2Digits(date.getMinutes());

    // Format hours to 12-hour format and set AM/PM
    let period = 'AM';
    if (hours >= 12) {
        period = 'PM';
        if (hours > 12) hours -= 12; // Convert to 12-hour format
    }
    hours = padTo2Digits(hours);

    // Combine the components into a string
    return `${year}-${month}-${day} ${hours}:${minutes} ${period}`;
}

module.exports = { FormatAddress, FormatTimestamp }