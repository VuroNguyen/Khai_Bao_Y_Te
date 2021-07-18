import moment from 'moment';
import 'moment/locale/vi';
import React, { useEffect, useState } from 'react';
moment.locale('vi');

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function SystemTime() {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        let secTimer = setInterval(() => {
            setCurrentTime(new moment().format('HH:mm:ss'))
        }, 1000)

        return () => clearInterval(secTimer);
    }, []);

    return (
        <div>
            {capitalizeFirstLetter(moment().format(`dddd, DD/MM/YYYY ㅤHH:mm:ss`))}
        </div>
    )
}

export default SystemTime