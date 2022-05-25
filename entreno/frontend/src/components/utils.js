class Util {

    static extraerFechaDeUTC(utc) {
        let date = new Date(utc);
        let mes = date.getUTCMonth()+1;
        return date.getUTCDate()+'/'+mes+'/'+date.getUTCFullYear();
    }

    static extraerFechaISO8601DeUTC(utc) {
        let date = new Date(utc);
        let mes = date.getUTCMonth()+1;
        let mesStr = mes.toString();
        if (mesStr.length<2)
            mesStr = '0'+mesStr;
        return date.getUTCFullYear()+'-'+mesStr+'-'+date.getUTCDate();
    }
}

export default Util;