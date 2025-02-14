const { query } = require('../config/db');


async function getCustomcdrLength(req, res) {

    try {

        const results = await query(`
            SELECT COUNT(*) AS total_count
            FROM customcdr
        `);

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

    try {

        const results = await query(`
            SELECT COUNT(*) AS total_count
            FROM customcdr
            WHERE calltype = 'Incomming Call';
        `);

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

    try {

        const results = await query(`
            SELECT COUNT(*) AS total_count
            FROM customcdr
            WHERE calltype = 'Outbound';
        `);

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

    try {

        const results = await query(`
            SELECT COUNT(*) AS total_count
            FROM customcdr           
            Where agent_disposition = 'ANSWERED';
        `);

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

    try {

        const results = await query(`
            SELECT COUNT(*) AS total_count
            FROM customcdr           
            Where agent_disposition = 'NO ANSWER';
        `);

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
            FROM customcdr
            WHERE calltype = 'Outbound'
            AND agent_disposition = 'NO ANSWER';
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
            FROM customcdr

            WHERE calltype = 'Incomming Call'
              AND agent_disposition = 'NO ANSWER';
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
