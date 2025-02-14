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
            
            WHERE 
                agent = ? AND 
                call_datetime BETWEEN ? AND ?`;

        const queryParams = [agent, queryStartDateTime, queryEndDateTime];


        // if (startTime && endTime) {
        //     query += ` AND cdr.calldate BETWEEN ? AND ?`;  
        //     queryParams.push(startTime, endTime);
        // }


        if (calltype && calltype !== 'all') {
            query += ` AND calltype = ?`;
            queryParams.push(calltype);
        }


        if (agentDisposition && agentDisposition !== 'all') {
            query += ` AND agent_disposition = ?`;
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
