const { query } = require('../config/db');

const getInboundCdrData = async (req, res) => {
    const { startDate, endDate, startTime, endTime } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Both startDate and endDate are required' });
    }

    const queryStartTime = startTime || '00:00:00';
    const queryEndTime = endTime || '23:59:59';


    const queryStartDateTime = `${startDate} ${queryStartTime}`;
    const queryEndDateTime = `${endDate} ${queryEndTime}`;

    try {
        const querySql = `
            SELECT 
                call_datetime,
                calltype,
                custphone,
                agent,
                agent_dial_start,
                agent_answered_at,
                agent_disconnected_at,
                agent_duration,
                customer_duration,
                customer_dial_start,
                customer_answered_at,
                customer_disconnected_at,
                api_response,
                recording_file,
                agent_disposition,
                customer_disposition

            FROM customcdr
           
            WHERE call_datetime BETWEEN ? AND ?
              AND calltype = 'Incomming Call';
        `;

        const cdrData = await query(querySql, [queryStartDateTime, queryEndDateTime]);

        return res.json({ cdr_data: cdrData });

    } catch (err) {
        console.error('Error fetching inbound CDR data:', err);
        return res.status(500).json({ error: 'Failed to fetch inbound CDR data' });
    }
};


const getOutboundCdrData = async (req, res) => {
    const { startDate, endDate, startTime, endTime } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Both startDate and endDate are required' });
    }

    const queryStartTime = startTime || '00:00:00';
    const queryEndTime = endTime || '23:59:59';


    const queryStartDateTime = `${startDate} ${queryStartTime}`;
    const queryEndDateTime = `${endDate} ${queryEndTime}`;

    try {
        const querySql = `
            SELECT 
                call_datetime,
                calltype,
                custphone,
                agent,
                agent_dial_start,
                agent_answered_at,
                agent_disconnected_at,
                agent_duration,
                customer_duration,
                customer_dial_start,
                customer_answered_at,
                customer_disconnected_at,
                api_response,
                recording_file,
                agent_disposition,
                customer_disposition

            FROM customcdr
           
            WHERE call_datetime BETWEEN ? AND ?
              AND CallType = 'Outbound';
        `;

        const cdrData = await query(querySql, [queryStartDateTime, queryEndDateTime]);

        return res.json({ cdr_data: cdrData });

    } catch (err) {
        console.error('Error fetching inbound CDR data:', err);
        return res.status(500).json({ error: 'Failed to fetch inbound CDR data' });
    }
};

module.exports = { getInboundCdrData, getOutboundCdrData };
