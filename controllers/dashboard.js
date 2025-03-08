const { query } = require('../config/db');


async function getCustomcdrLength(req, res) {
    const { manager_id } = req.params;

    try {

        const results = await query(`
            SELECT COUNT(*) AS total_count
            FROM customcdr c
            JOIN rs_agentmobile a ON c.agent = a.agentmobile
            WHERE a.manager_id = ?  
        `, [manager_id]);

        const formattedResults = results.map(item => {
            for (let key in item) {
                if (typeof item[key] === "bigint") {
                    item[key] = item[key].toString();
                }
            }
            return item;
        });

        res.json({ total_cdr_count: formattedResults[0].total_count });

    } catch (err) {
        console.error("Database query error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


async function getInboundLength(req, res) {
    const { manager_id } = req.params;
    try {

        const results = await query(`
            SELECT COUNT(*) AS total_count
            FROM customcdr c
            JOIN rs_agentmobile a ON c.agent = a.agentmobile  
            WHERE a.manager_id = ? 
            AND c.calltype = 'Incomming Call';
        `, [manager_id]);

        const formattedResults = results.map(item => {
            for (let key in item) {
                if (typeof item[key] === "bigint") {
                    item[key] = item[key].toString();
                }
            }
            return item;
        });

        res.json({ total_cdr_count: formattedResults[0].total_count });

    } catch (err) {
        console.error("Database query error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


async function getOutboundLength(req, res) {
    const { manager_id } = req.params;
    try {

        const results = await query(`
            SELECT COUNT(*) AS total_count
            FROM customcdr c
            JOIN rs_agentmobile a ON c.agent = a.agentmobile  
            WHERE a.manager_id = ?
            AND c.calltype = 'Outbound';
        `, [manager_id]);

        const formattedResults = results.map(item => {
            for (let key in item) {
                if (typeof item[key] === "bigint") {
                    item[key] = item[key].toString();
                }
            }
            return item;
        });

        res.json({ total_cdr_count: formattedResults[0].total_count });

    } catch (err) {
        console.error("Database query error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


async function getconnectedLength(req, res) {
    const { manager_id } = req.params;

    try {

        const results = await query(`
            SELECT COUNT(*) AS total_count
            FROM customcdr c 
            JOIN rs_agentmobile a ON c.agent = a.agentmobile         
            WHERE a.manager_id = ?
            AND c.agent_disposition = 'ANSWERED'
            AND c.customer_disposition = 'ANSWERED';
        `, [manager_id]);

        const formattedResults = results.map(item => {
            for (let key in item) {
                if (typeof item[key] === "bigint") {
                    item[key] = item[key].toString();
                }
            }
            return item;
        });

        res.json({ total_cdr_count: formattedResults[0].total_count });

    } catch (err) {
        console.error("Database query error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


async function getnotconnectedLength(req, res) {
    const { manager_id } = req.params;
    try {

        const results = await query(`
            SELECT COUNT(*) AS total_count
            FROM customcdr c
            JOIN rs_agentmobile a ON c.agent = a.agentmobile           
            WHERE a.manager_id = ?
            AND c.agent_disposition = 'ANSWERED'
            AND c.customer_disposition = 'NO ANSWER';
        `, [manager_id]);

        const formattedResults = results.map(item => {
            for (let key in item) {
                if (typeof item[key] === "bigint") {
                    item[key] = item[key].toString();
                }
            }
            return item;
        });

        res.json({ total_cdr_count: formattedResults[0].total_count });

    } catch (err) {
        console.error("Database query error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


async function getMissedoutboundLength(req, res) {
    const { manager_id } = req.params;

    try {

        const results = await query(`
            SELECT COUNT(*) AS total_count
            FROM customcdr c
            JOIN rs_agentmobile a ON c.agent = a.agentmobile  
            WHERE a.manager_id = ?
            AND c.calltype = 'Outbound'
             AND (
                 (c.agent_disposition = 'ANSWERED' AND c.customer_disposition = 'NO ANSWER')
                 OR 
                 (c.agent_disposition = 'NO ANSWER' AND c.customer_disposition IS NULL)
                 );
        `, [manager_id]);

        const formattedResults = results.map(item => {
            for (let key in item) {
                if (typeof item[key] === "bigint") {
                    item[key] = item[key].toString();
                }
            }
            return item;
        });

        res.json({ total_cdr_count: formattedResults[0].total_count });

    } catch (err) {
        console.error("Database query error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


async function getMissedLength(req, res) {
    const { manager_id } = req.params;

    try {

        const results = await query(`
            SELECT COUNT(*) AS total_count
            FROM customcdr c
            JOIN rs_agentmobile a ON c.agent = a.agentmobile  
            WHERE a.manager_id = ?
            AND c.calltype = 'Incomming Call'
              AND c.agent_disposition = 'NO ANSWER';
        `, [manager_id]);

        const formattedResults = results.map(item => {
            for (let key in item) {
                if (typeof item[key] === "bigint") {
                    item[key] = item[key].toString();
                }
            }
            return item;
        });

        res.json({ total_cdr_count: formattedResults[0].total_count });

    } catch (err) {
        console.error("Database query error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    getCustomcdrLength,
    getInboundLength,
    getOutboundLength,
    getconnectedLength,
    getnotconnectedLength,
    getMissedoutboundLength,
    getMissedLength
};
