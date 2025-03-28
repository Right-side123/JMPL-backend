const db = require('../config/db');

const getCdrByAgent = async (req, res) => {
    const agent = req.params.agent;
    const { startDate, endDate, startTime, endTime, calltype, status } = req.query;

    const queryStartTime = startTime || '00:00:00';
    const queryEndTime = endTime || '23:59:59';


    const queryStartDateTime = `${startDate} ${queryStartTime}`;
    const queryEndDateTime = `${endDate} ${queryEndTime}`;

    let callTypeCondition = "";

    if (calltype === 'outbound') {
        callTypeCondition = "(c.calltype = 'Outbound')";
    } else if (calltype === 'incommingCall') {
        callTypeCondition = "(c.calltype = 'Incomming Call')";
    } else if (calltype === 'all') {
        callTypeCondition = `((c.calltype = 'Outbound')
        OR (c.calltype = 'Incomming Call'))`;
    } else {
        return res.status(400).json({ error: 'Invalid calltype provided' });
    }

    let statusCondition = "";

    if (status === 'connected') {
        statusCondition = "(c.agent_disposition = 'ANSWERED' AND c.customer_disposition = 'ANSWERED')";
    } else if (status === 'notConnected') {
        statusCondition = `((c.agent_disposition = 'ANSWERED' AND c.customer_disposition = 'NO ANSWER') 
            OR 
            (c.agent_disposition = 'NO ANSWER' AND c.customer_disposition IS NULL))`;
    } else if (status === 'all') {

        statusCondition = `(
            (c.agent_disposition = 'ANSWERED' AND c.customer_disposition = 'ANSWERED') 
            OR 
            ((c.agent_disposition = 'ANSWERED' AND c.customer_disposition = 'NO ANSWER') 
            OR 
            (c.agent_disposition = 'NO ANSWER' AND c.customer_disposition IS NULL))
        )`;
    } else {
        return res.status(400).json({ error: 'Invalid status provided' });
    }

    try {
        let query = `
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
            
            WHERE 
                c.agent = ? AND 
                c.call_datetime BETWEEN ? AND ?
                AND ${statusCondition}
                AND ${callTypeCondition};
                `;

        const queryParams = [agent, queryStartDateTime, queryEndDateTime];


        // if (startTime && endTime) {
        //     query += ` AND cdr.calldate BETWEEN ? AND ?`;  
        //     queryParams.push(startTime, endTime);
        // }


        // if (calltype && calltype !== 'all') {
        //     query += ` AND c.calltype = ?`;
        //     queryParams.push(calltype);
        // }


        // if (agentDisposition && agentDisposition !== 'all') {
        //     query += ` AND c.agent_disposition = ?`;
        //     queryParams.push(agentDisposition);
        // }

        const cdrData = await db.query(query, queryParams);

        if (cdrData.length === 0) {
            return res.json({ cdrData: [] });
        }

        res.status(200).json({ cdr_data: cdrData });

    } catch (error) {
        console.error("Error fetching CDR data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getCdrByAgent,
};
