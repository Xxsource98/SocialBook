const ConvertDate = (date: Date | string) => {
    if (date) {
        const inDate = new Date(date)
        const currentDate = new Date()

        const secondsDiff = parseInt(((currentDate.getTime() - inDate.getTime()) / 1000).toFixed(0))
        const minutesDiff = parseInt((secondsDiff / 60).toFixed(0))
        const hoursDiff = parseInt((minutesDiff / 60).toFixed(0))
        const daysDiff = parseInt((hoursDiff / 24).toFixed(0))

        if (daysDiff >= 1) return `${daysDiff} day${daysDiff > 2 ? 's' : ''} ago`
        if (daysDiff < 1 && minutesDiff > 60) return `${hoursDiff} hour${hoursDiff > 2 ? 's' : ''} ago`
        if (minutesDiff < 60 && secondsDiff > 60) return `${minutesDiff} minute${minutesDiff > 2 ? 's' : ''} ago`
        if (secondsDiff < 60) return `${secondsDiff} second${secondsDiff > 2 ? 's' : ''} ago`
    }

    return 'invalid'
}

export default ConvertDate
