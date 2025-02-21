const { query } = require("../config/db");

const login = async (req, res) => {
  const { manager_name, password } = req.body;

  try {

    const managerNameLower = manager_name.toLowerCase();


    const sql = "SELECT * FROM managers WHERE LOWER(source) = ? AND password = ?";
    const result = await query(sql, [managerNameLower, password]);

    if (result.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const manager = result[0];

    // You can generate JWT token here if needed:
    // const accessToken = jwt.sign(
    //   { manager_id: manager.manager_id, manager_name: manager.manager_name },
    //   'secretKey', // Use a secret key in your environment (e.g., process.env.JWT_SECRET)
    //   { expiresIn: '1h' } // Token expires in 1 hour
    // );

    // const agentSql = "SELECT * FROM rs_agentmobile";
    // const agents = await query(agentSql, [manager.manager_id]);


    res.json({
      manager_id: manager.manager_id,
      manager_name: manager.source,
      // accessToken: accessToken,
      // agents: agents,
    });

  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = { login };
