const express = require('express');
const router = express.Router();
const { login } = require('../controllers/loginController');
const { AgentsController } = require('../controllers/agentController');
const { getCdrData } = require('../controllers/cdrController')

const {
    getInboundCdrData,
    getOutboundCdrData
} = require('../controllers/callTypeController');

const { getConnectedCall,
    getNotconnectedCall,
    getMissedOutboundCall,
    getMissedCall
} = require('../controllers/callDisposition')

const { getCdrByAgent } = require('../controllers/singleAgent')


const {
    getCustomcdrLength,
    getInboundLength, 
    getOutboundLength,
    getconnectedLength,
    getnotconnectedLength,
    getMissedoutboundLength,
    getMissedLength
} = require('../controllers/dashboard');

router.post('/login', login);

router.get('/agents/:manager_id', AgentsController);

router.get('/customcdr/:manager_id', getCdrData);

router.get('/inbound/:manager_id', getInboundCdrData);

router.get('/outbound/:manager_id', getOutboundCdrData);

router.get('/connectedcalls/:manager_id', getConnectedCall);

router.get('/notconnectedcalls/:manager_id', getNotconnectedCall);

router.get('/missedoutboundcalls/:manager_id', getMissedOutboundCall);

router.get('/missedcalls/:manager_id', getMissedCall);

router.get('/cdr/:agent', getCdrByAgent);



router.get('/totalcdr/:manager_id', getCustomcdrLength);

router.get('/totalinbound/:manager_id', getInboundLength);

router.get('/totaloutbound/:manager_id', getOutboundLength);

router.get('/totalconnected/:manager_id', getconnectedLength);

router.get('/totalnotconnected/:manager_id', getnotconnectedLength);

router.get('/totalmissedoutbound/:manager_id', getMissedoutboundLength);

router.get('/totalmissed/:manager_id', getMissedLength);

module.exports = router;
