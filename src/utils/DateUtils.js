import { SECOND } from '../common/constants/Time.js';

/**
 * Utilidades para el manejo de fechas.
 */
class DateUtils {

    static now() {

        return new Date();

    }

    static timestamp() {

        return Date.now();

    }

    static secondsBetween(from, to) {

        const milliseconds = to.getTime() - from.getTime();

        return Math.max(
            Math.floor(milliseconds / SECOND),
            0
        );

    }

    static isExpired(date) {

        return date.getTime() <= Date.now();

    }

    static isFuture(date) {

        return date.getTime() > Date.now();

    }

}

export default DateUtils;