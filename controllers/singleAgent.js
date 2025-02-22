const db = require('../config/db');

const getCdrByAgent = async (req, res) => {
    const agent = req.params.agent;
    const { startDate, endDate, startTime, endTime, calltype, agentDisposition } = req.query;

    const queryStartTime = startTime || '00:00:00';
    const queryEndTime = endTime || '23:59:59';


    const queryStartDateTime = `${startDate} ${queryStartTime}`;
    const queryEndDateTime = `${endDate} ${queryEndTime}`;

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
                c.call_datetime BETWEEN ? AND ?`;

        const queryParams = [agent, queryStartDateTime, queryEndDateTime];


        // if (startTime && endTime) {
        //     query += ` AND cdr.calldate BETWEEN ? AND ?`;  
        //     queryParams.push(startTime, endTime);
        // }


        if (calltype && calltype !== 'all') {
            query += ` AND c.calltype = ?`;
            queryParams.push(calltype);
        }


        if (agentDisposition && agentDisposition !== 'all') {
            query += ` AND c.agent_disposition = ?`;
            queryParams.push(agentDisposition);
        }

        const cdrData = await db.query(query, queryParams);

        if (cdrData.length === 0) {
            return res.status(404).json({ message: "No CDR found for this agent." });
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
