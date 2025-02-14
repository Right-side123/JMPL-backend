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

router.get('/agents', AgentsController);

router.get('/customcdr', getCdrData);

router.get('/inbound', getInboundCdrData);

router.get('/outbound', getOutboundCdrData);

router.get('/connectedcalls', getConnectedCall);

router.get('/notconnectedcalls', getNotconnectedCall);

router.get('/missedoutboundcalls', getMissedOutboundCall);

router.get('/missedcalls', getMissedCall);

router.get('/cdr/:agent', getCdrByAgent);



router.get('/totalcdr', getCustomcdrLength);

router.get('/totalinbound', getInboundLength);

router.get('/totaloutbound', getOutboundLength);

router.get('/totalconnected', getconnectedLength);

router.get('/totalnotconnected', getnotconnectedLength);

router.get('/totalmissedoutbound', getMissedoutboundLength);

router.get('/totalmissed', getMissedLength);

module.exports = router;
