class DateLib{

    /** 
     * @param int numDays (Today = 0, Tomorrow = 1, After tomorrow = 2)
     * return 
     * string day : Sunday - Saturday
     * string month : January - December 
     * int date : 1 - 31
     * fullDate : 2017-08-04 
     */
    static getNextDay(numDays) {

        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let dateObj = new Date()
        dateObj.setDate(dateObj.getDate() + numDays)        

        let dayName = days[dateObj.getDay()]
        let monthName = months[dateObj.getMonth()]
        let dateNumber = dateObj.getDate()
        let fullDate = this.getFullDate(dateObj)

        return { day: dayName, month: monthName, date: dateNumber, fullDate: fullDate }
        
    }

    static getFullDate(dateObj){
        let fullDate =  dateObj.getFullYear()+'-'+("0" + (dateObj.getMonth() + 1)).slice(-2)+'-'+("0" + dateObj.getDate()).slice(-2)
        return fullDate
    }

    static currentDate(){
        let now = new Date()
        return this.getFullDate(now)
    }


}

export default DateLib;