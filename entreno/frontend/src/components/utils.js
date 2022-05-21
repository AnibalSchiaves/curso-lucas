class Util {

    static extraerFechaDeUTC(utc) {
        let date = new Date(utc);
        let mes = date.getMonth()+1;
        return date.getDate()+'/'+mes+'/'+date.getFullYear();
    }
}

export default Util;