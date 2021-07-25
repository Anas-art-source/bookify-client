
export const formatDate = (date) => {
    const dateNow = Date.now();
    const dateObj = new Date(date);
    const difference = dateNow - dateObj.getTime() 

    if (difference <= HoursToMilli(1) && difference <= MinutesToMilli(1) ) return `just now`; 
    if (difference <= HoursToMilli(1)) return `${Math.round(difference / (MinutesToMilli(1)))} min`; 
    if ( difference <= HoursToMilli(24) ) return  `${Math.round(difference / (HoursToMilli(1)))} hrs`
    if (difference <= DayToMilli(7)) return `${Math.round(difference / (DayToMilli(1)))} days`

    return `${dateObj.getDate()} ${dateObj.getMonth()} ${dateObj.getFullYear()} `

}

function MinutesToMilli (minute) {
    return minute * 60 * 1000
}

function HoursToMilli (hour) {
    return hour * 60 * 60 * 1000
}

function DayToMilli (day) {
    return day * 24 * 60 * 60 * 1000
} 


// FORMAT NAME 
export const capitalize = (name) => {
    return name.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
}

export const  roundingNumber = (number) => {
    return Math.ceil(number)
}