const { query } = require('../config/db');

// const getConnectedCall = async (req, res) => {

//     const { manager_id } = req.params;
//     const { startDate, endDate, startTime, endTime } = req.query;

//     if (!startDate || !endDate) {
//         return res.status(400).json({ error: 'Both startDate and endDate are required' });
//     }

//     const queryStartTime = startTime || '00:00:00';
//     const queryEndTime = endTime || '23:59:59';


//     const queryStartDateTime = `${startDate} ${queryStartTime}`;
//     const queryEndDateTime = `${endDate} ${queryEndTime}`;

//     try {
//         const querySql = `
//             SELECT 
//                 c.call_datetime,
//                 c.calltype,
//                 c.custphone,
//                 a.agentname,
//                 c.agent,
//                 c.agent_dial_start,
//                 c.agent_answered_at,
//                 c.agent_disconnected_at,
//                 c.agent_duration,
//                 c.customer_duration,
//                 c.customer_dial_start,
//                 c.customer_answered_at,
//                 c.customer_disconnected_at,
//                 c.api_response,
//                 c.recording_file,
//                 c.agent_disposition,
//                 c.customer_disposition

//             FROM customcdr c

//             JOIN rs_agentmobile a ON c.agent = a.agentmobile
//             WHERE a.manager_id = ?
//             AND c.call_datetime BETWEEN ? AND ?
//               AND c.agent_disposition = 'ANSWERED'
//               AND c.customer_disposition = 'ANSWERED';
//         `;

//         const cdrData = await query(querySql, [manager_id, queryStartDateTime, queryEndDateTime]);

//         return res.json({ manager_id, cdr_data: cdrData });

//     } catch (err) {
//         console.error('Error fetching inbound CDR data:', err);
//         return res.status(500).json({ error: 'Failed to fetch inbound CDR data' });
//     }
// };

// const getNotconnectedCall = async (req, res) => {
//     const { manager_id } = req.params;
//     const { startDate, endDate, startTime, endTime } = req.query;

//     if (!startDate || !endDate) {
//         return res.status(400).json({ error: 'Both startDate and endDate are required' });
//     }

//     const queryStartTime = startTime || '00:00:00';
//     const queryEndTime = endTime || '23:59:59';


//     const queryStartDateTime = `${startDate} ${queryStartTime}`;
//     const queryEndDateTime = `${endDate} ${queryEndTime}`;

//     try {
//         const querySql = `
//             SELECT 
//                 c.call_datetime,
//                 c.calltype,
//                 c.custphone,
//                 a.agentname,
//                 c.agent,
//                 c.agent_dial_start,
//                 c.agent_answered_at,
//                 c.agent_disconnected_at,
//                 c.agent_duration,
//                 c.customer_duration,
//                 c.customer_dial_start,
//                 c.customer_answered_at,
//                 c.customer_disconnected_at,
//                 c.api_response,
//                 c.recording_file,
//                 c.agent_disposition,
//                 c.customer_disposition

//             FROM customcdr c

//             JOIN rs_agentmobile a ON c.agent = a.agentmobile
//             WHERE a.manager_id = ?
//               AND c.call_datetime BETWEEN ? AND ?
//               AND c.agent_disposition = 'ANSWERED'
//               AND c.customer_disposition = 'NO ANSWER';
//         `;

//         const cdrData = await query(querySql, [manager_id, queryStartDateTime, queryEndDateTime]);

//         return res.json({ manager_id, cdr_data: cdrData });

//     } catch (err) {
//         console.error('Error fetching inbound CDR data:', err);
//         return res.status(500).json({ error: 'Failed to fetch inbound CDR data' });
//     }
// };

// const getMissedOutboundCall = async (req, res) => {
//     const { startDate, endDate, startTime, endTime } = req.query;

//     if (!startDate || !endDate) {
//         return res.status(400).json({ error: 'Both startDate and endDate are required' });
//     }

//     const queryStartTime = startTime || '00:00:00';
//     const queryEndTime = endTime || '23:59:59';


//     const queryStartDateTime = `${startDate} ${queryStartTime}`;
//     const queryEndDateTime = `${endDate} ${queryEndTime}`;

//     try {
//         const querySql = `
//             SELECT 
//                 c.call_datetime,
//                 c.calltype,
//                 c.custphone,
//                 a.agentname,
//                 c.agent,
//                 c.agent_dial_start,
//                 c.agent_answered_at,
//                 c.agent_disconnected_at,
//                 c.agent_duration,
//                 c.customer_duration,
//                 c.customer_dial_start,
//                 c.customer_answered_at,
//                 c.customer_disconnected_at,
//                 c.api_response,
//                 c.recording_file,
//                 c.agent_disposition,
//                 c.customer_disposition

//             FROM customcdr c

//             JOIN rs_agentmobile a ON c.agent = a.agentmobile

//             WHERE c.call_datetime BETWEEN ? AND ?

// AND (
//     (c.agent_disposition = 'ANSWERED' AND c.customer_disposition = 'NO ANSWER')
//     OR 
//     (c.agent_disposition = 'NO ANSWER' AND c.customer_disposition IS NULL)
// )
// AND c.calltype = 'Outbound';

//         `;

//         const cdrData = await query(querySql, [queryStartDateTime, queryEndDateTime]);

//         return res.json({ cdr_data: cdrData });

//     } catch (err) {
//         console.error('Error fetching inbound CDR data:', err);
//         return res.status(500).json({ error: 'Failed to fetch inbound CDR data' });
//     }
// };


// const getMissedOutboundCall = async (req, res) => {
//     const { manager_id } = req.params;
//     const { startDate, endDate, startTime, endTime, filter } = req.query;


//     if (!startDate || !endDate) {
//         return res.status(400).json({ error: 'Both startDate and endDate are required' });
//     }


//     const queryStartTime = startTime || '00:00:00';
//     const queryEndTime = endTime || '23:59:59';


//     const queryStartDateTime = `${startDate} ${queryStartTime}`;
//     const queryEndDateTime = `${endDate} ${queryEndTime}`;

//     // console.log(`Start DateTime: ${queryStartDateTime}, End DateTime: ${queryEndDateTime}`);


//     let filterCondition = "";

//     if (filter === 'missedByCustomer') {
//         filterCondition = "(c.agent_disposition = 'ANSWERED' AND c.customer_disposition = 'NO ANSWER')";
//     } else if (filter === 'missedByAgent') {
//         filterCondition = "(c.agent_disposition = 'NO ANSWER' AND c.customer_disposition IS NULL)";
//     } else if (filter === 'all') {
//         filterCondition = `
//             ((c.agent_disposition = 'ANSWERED' AND c.customer_disposition = 'NO ANSWER') 
//             OR 
//             (c.agent_disposition = 'NO ANSWER' AND c.customer_disposition IS NULL))
//         `;
//     } else {
//         return res.status(400).json({ error: 'Invalid filter provided' });
//     }

//     try {

//         const querySql = `
//             SELECT 
//                 c.call_datetime,
//                 c.calltype,
//                 c.custphone,
//                 a.agentname,
//                 c.agent,
//                 c.agent_dial_start,
//                 c.agent_answered_at,
//                 c.agent_disconnected_at,
//                 c.agent_duration,
//                 c.customer_duration,
//                 c.customer_dial_start,
//                 c.customer_answered_at,
//                 c.customer_disconnected_at,
//                 c.api_response,
//                 c.recording_file,
//                 c.agent_disposition,
//                 c.customer_disposition
//             FROM customcdr c
//             JOIN rs_agentmobile a ON c.agent = a.agentmobile
//             WHERE a.manager_id = ?
//             AND c.call_datetime BETWEEN ? AND ?
//             AND c.calltype = 'Outbound'
//             AND ${filterCondition};
//         `;

//         // console.log(`Executing SQL Query: ${querySql}`);


//         const cdrData = await query(querySql, [manager_id, queryStartDateTime, queryEndDateTime]);


//         return res.json({ manager_id, cdr_data: cdrData });

//     } catch (err) {
//         console.error('Error fetching missed outbound CDR data:', err);
//         return res.status(500).json({ error: 'Failed to fetch missed outbound CDR data' });
//     }
// };




// const getMissedCall = async (req, res) => {
//     const { manager_id } = req.params;
//     const { startDate, endDate, startTime, endTime } = req.query;

//     if (!startDate || !endDate) {
//         return res.status(400).json({ error: 'Both startDate and endDate are required' });
//     }

//     const queryStartTime = startTime || '00:00:00';
//     const queryEndTime = endTime || '23:59:59';


//     const queryStartDateTime = `${startDate} ${queryStartTime}`;
//     const queryEndDateTime = `${endDate} ${queryEndTime}`;

//     try {
//         const querySql = `
//             SELECT 
//                 c.call_datetime,
//                 c.calltype,
//                 c.custphone,
//                 a.agentname,
//                 c.agent,
//                 c.agent_dial_start,
//                 c.agent_answered_at,
//                 c.agent_disconnected_at,
//                 c.agent_duration,
//                 c.customer_duration,
//                 c.customer_dial_start,
//                 c.customer_answered_at,
//                 c.customer_disconnected_at,
//                 c.api_response,
//                 c.recording_file,
//                 c.agent_disposition,
//                 c.customer_disposition

//             FROM customcdr c

//             JOIN rs_agentmobile a ON c.agent = a.agentmobile
//             WHERE a.manager_id = ?
//               AND c.call_datetime BETWEEN ? AND ?
//               AND c.calltype = 'Incomming Call'
//               AND c.agent_disposition = 'NO ANSWER';
//         `;

//         const cdrData = await query(querySql, [manager_id, queryStartDateTime, queryEndDateTime]);

//         return res.json({ manager_id, cdr_data: cdrData });

//     } catch (err) {
//         console.error('Error fetching inbound CDR data:', err);
//         return res.status(500).json({ error: 'Failed to fetch inbound CDR data' });
//     }
// };



/*******************************************************************
 *                                             ********************************************************************* 
 *                                                                                                *****************************************************/

/***************************************                Connected calls               **************************************/

const getConnectedCall = async (req, res) => {

    const { manager_id } = req.params;
    const { startDate, endDate, startTime, endTime } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Both startDate and endDate are required' });
    }

    const queryStartTime = startTime || '00:00:00';
    const queryEndTime = endTime || '23:59:59';


    const queryStartDateTime = `${startDate} ${queryStartTime}`;
    const queryEndDateTime = `${endDate} ${queryEndTime}`;

    try {

        let querySql;
        let queryParams = [queryStartDateTime, queryEndDateTime];

        if (manager_id == 2) {

            querySql = `
            SELECT 
                c.call_datetime,
                c.calltype,
                c.custphone,
                a.agentname,
                c.agent,
                c.agent_dial_start,
                c.agent_answered_at,
                c.agent_disconnected_at,
                c.agent_duration,
                c.customer_duration,
                c.customer_dial_start,
                c.customer_answered_at,
                c.customer_disconnected_at,
                c.api_response,
                c.recording_file,
                c.agent_disposition,
                c.customer_disposition

            FROM customcdr c

            JOIN rs_agentmobile a ON c.agent = a.agentmobile
            WHERE c.call_datetime BETWEEN ? AND ?
              AND c.agent_disposition = 'ANSWERED'
              AND c.customer_disposition = 'ANSWERED';
        `;
        } else {

            querySql = `
            SELECT 
                c.call_datetime,
                c.calltype,
                c.custphone,
                a.agentname,
                c.agent,
                c.agent_dial_start,
                c.agent_answered_at,
                c.agent_disconnected_at,
                c.agent_duration,
                c.customer_duration,
                c.customer_dial_start,
                c.customer_answered_at,
                c.customer_disconnected_at,
                c.api_response,
                c.recording_file,
                c.agent_disposition,
                c.customer_disposition

            FROM customcdr c

            JOIN rs_agentmobile a ON c.agent = a.agentmobile
            WHERE a.manager_id = ?
            AND c.call_datetime BETWEEN ? AND ?
              AND c.agent_disposition = 'ANSWERED'
              AND c.customer_disposition = 'ANSWERED';
        `;

            queryParams.unshift(manager_id);

        }

        const cdrData = await query(querySql, queryParams);

        return res.json({ manager_id, cdr_data: cdrData });

    } catch (err) {
        console.error('Error fetching inbound CDR data:', err);
        return res.status(500).json({ error: 'Failed to fetch inbound CDR data' });
    }
};


/************************************************         Not Connected      ************************************************/

const getNotconnectedCall = async (req, res) => {
    const { manager_id } = req.params;
    const { startDate, endDate, startTime, endTime } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Both startDate and endDate are required' });
    }

    const queryStartTime = startTime || '00:00:00';
    const queryEndTime = endTime || '23:59:59';


    const queryStartDateTime = `${startDate} ${queryStartTime}`;
    const queryEndDateTime = `${endDate} ${queryEndTime}`;

    try {

        let querySql;
        let queryParams = [queryStartDateTime, queryEndDateTime];

        if (manager_id == 2) {

            querySql = `
            SELECT 
                c.call_datetime,
                c.calltype,
                c.custphone,
                a.agentname,
                c.agent,
                c.agent_dial_start,
                c.agent_answered_at,
                c.agent_disconnected_at,
                c.agent_duration,
                c.customer_duration,
                c.customer_dial_start,
                c.customer_answered_at,
                c.customer_disconnected_at,
                c.api_response,
                c.recording_file,
                c.agent_disposition,
                c.customer_disposition

            FROM customcdr c

            JOIN rs_agentmobile a ON c.agent = a.agentmobile
            WHERE c.call_datetime BETWEEN ? AND ?
              AND c.agent_disposition = 'ANSWERED'
              AND c.customer_disposition = 'NO ANSWER';
        `;
        } else {

            querySql = `
            SELECT 
                c.call_datetime,
                c.calltype,
                c.custphone,
                a.agentname,
                c.agent,
                c.agent_dial_start,
                c.agent_answered_at,
                c.agent_disconnected_at,
                c.agent_duration,
                c.customer_duration,
                c.customer_dial_start,
                c.customer_answered_at,
                c.customer_disconnected_at,
                c.api_response,
                c.recording_file,
                c.agent_disposition,
                c.customer_disposition

            FROM customcdr c

            JOIN rs_agentmobile a ON c.agent = a.agentmobile
            WHERE a.manager_id = ?
              AND c.call_datetime BETWEEN ? AND ?
              AND c.agent_disposition = 'ANSWERED'
              AND c.customer_disposition = 'NO ANSWER';
        `;

            queryParams.unshift(manager_id);

        }

        const cdrData = await query(querySql, queryParams);

        return res.json({ manager_id, cdr_data: cdrData });

    } catch (err) {
        console.error('Error fetching inbound CDR data:', err);
        return res.status(500).json({ error: 'Failed to fetch inbound CDR data' });
    }
};



/**********************************************     Missedoutbound Calls    *************************************/

const getMissedOutboundCall = async (req, res) => {
    const { manager_id } = req.params;
    const { startDate, endDate, startTime, endTime, filter } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Both startDate and endDate are required' });
    }

    const queryStartTime = startTime || '00:00:00';
    const queryEndTime = endTime || '23:59:59';


    const queryStartDateTime = `${startDate} ${queryStartTime}`;
    const queryEndDateTime = `${endDate} ${queryEndTime}`;

    let filterCondition = "";

    if (filter === 'missedByCustomer') {
        filterCondition = "(c.agent_disposition = 'ANSWERED' AND c.customer_disposition = 'NO ANSWER')";
    } else if (filter === 'missedByAgent') {
        filterCondition = "(c.agent_disposition = 'NO ANSWER' AND c.customer_disposition IS NULL)";
    } else if (filter === 'all') {
        filterCondition = `
            ((c.agent_disposition = 'ANSWERED' AND c.customer_disposition = 'NO ANSWER') 
            OR 
            (c.agent_disposition = 'NO ANSWER' AND c.customer_disposition IS NULL))
        `;
    } else {
        return res.status(400).json({ error: 'Invalid filter provided' });
    }

    try {

        let querySql;
        let queryParams = [queryStartDateTime, queryEndDateTime];

        if (manager_id == 2) {

            querySql = `
            SELECT 
                c.call_datetime,
                c.calltype,
                c.custphone,
                a.agentname,
                c.agent,
                c.agent_dial_start,
                c.agent_answered_at,
                c.agent_disconnected_at,
                c.agent_duration,
                c.customer_duration,
                c.customer_dial_start,
                c.customer_answered_at,
                c.customer_disconnected_at,
                c.api_response,
                c.recording_file,
                c.agent_disposition,
                c.customer_disposition
            FROM customcdr c
            JOIN rs_agentmobile a ON c.agent = a.agentmobile
            WHERE c.call_datetime BETWEEN ? AND ?
            AND c.calltype = 'Outbound'
            AND ${filterCondition};
        `;
        } else {

            querySql = `
            SELECT 
                c.call_datetime,
                c.calltype,
                c.custphone,
                a.agentname,
                c.agent,
                c.agent_dial_start,
                c.agent_answered_at,
                c.agent_disconnected_at,
                c.agent_duration,
                c.customer_duration,
                c.customer_dial_start,
                c.customer_answered_at,
                c.customer_disconnected_at,
                c.api_response,
                c.recording_file,
                c.agent_disposition,
                c.customer_disposition
            FROM customcdr c
            JOIN rs_agentmobile a ON c.agent = a.agentmobile
            WHERE a.manager_id = ?
            AND c.call_datetime BETWEEN ? AND ?
            AND c.calltype = 'Outbound'
            AND ${filterCondition};
        `;

            queryParams.unshift(manager_id);
        }

        const cdrData = await query(querySql, queryParams);


        return res.json({ manager_id, cdr_data: cdrData });

    } catch (err) {
        console.error('Error fetching missed outbound CDR data:', err);
        return res.status(500).json({ error: 'Failed to fetch missed outbound CDR data' });
    }
};


/**********************************************************  Missed Calls  *************************************************/

const getMissedCall = async (req, res) => {
    const { manager_id } = req.params;
    const { startDate, endDate, startTime, endTime } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Both startDate and endDate are required' });
    }

    const queryStartTime = startTime || '00:00:00';
    const queryEndTime = endTime || '23:59:59';


    const queryStartDateTime = `${startDate} ${queryStartTime}`;
    const queryEndDateTime = `${endDate} ${queryEndTime}`;

    try {

        let querySql;
        let queryParams = [queryStartDateTime, queryEndDateTime];

        if (manager_id == 2) {

            querySql = `
            SELECT 
                c.call_datetime,
                c.calltype,
                c.custphone,
                a.agentname,
                c.agent,
                c.agent_dial_start,
                c.agent_answered_at,
                c.agent_disconnected_at,
                c.agent_duration,
                c.customer_duration,
                c.customer_dial_start,
                c.customer_answered_at,
                c.customer_disconnected_at,
                c.api_response,
                c.recording_file,
                c.agent_disposition,
                c.customer_disposition

            FROM customcdr c

            JOIN rs_agentmobile a ON c.agent = a.agentmobile
            WHERE c.call_datetime BETWEEN ? AND ?
              AND c.calltype = 'Incomming Call'
              AND c.agent_disposition = 'NO ANSWER';
        `;
        } else {

            querySql = `
            SELECT 
                c.call_datetime,
                c.calltype,
                c.custphone,
                a.agentname,
                c.agent,
                c.agent_dial_start,
                c.agent_answered_at,
                c.agent_disconnected_at,
                c.agent_duration,
                c.customer_duration,
                c.customer_dial_start,
                c.customer_answered_at,
                c.customer_disconnected_at,
                c.api_response,
                c.recording_file,
                c.agent_disposition,
                c.customer_disposition

            FROM customcdr c

            JOIN rs_agentmobile a ON c.agent = a.agentmobile
            WHERE a.manager_id = ?
              AND c.call_datetime BETWEEN ? AND ?
              AND c.calltype = 'Incomming Call'
              AND c.agent_disposition = 'NO ANSWER';
        `;

            queryParams.unshift(manager_id);
        }

        const cdrData = await query(querySql, queryParams);

        return res.json({ manager_id, cdr_data: cdrData });

    } catch (err) {
        console.error('Error fetching inbound CDR data:', err);
        return res.status(500).json({ error: 'Failed to fetch inbound CDR data' });
    }
};

module.exports = { getConnectedCall, getNotconnectedCall, getMissedOutboundCall, getMissedCall };
