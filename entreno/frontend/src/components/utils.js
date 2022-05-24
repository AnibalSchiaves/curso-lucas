class Util {

    static extraerFechaDeUTC(utc) {
        let date = new Date(utc);
        let mes = date.getUTCMonth()+1;
        return date.getUTCDate()+'/'+mes+'/'+date.getUTCFullYear();
    }
}

export default Util;