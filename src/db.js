import moment from 'moment';
import AWS from 'aws-sdk';

// Initialize the Amazon Cognito credentials provider (unauth customers)
AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:6b1c9a14-8ebb-405c-8c0c-7724487f9078',
});

const TASKMAN_TABLE = 'taskman_tasks';

// Create the DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-10-08' });

function syncTask(task, callback) {
    const item = task.snoozeUntil ? { ...task, snoozeUntil: task.snoozeUntil.toISOString() } : task;
    const params = {
        TableName: TASKMAN_TABLE,
        Item: AWS.DynamoDB.Converter.marshall(item)
    };
    ddb.putItem(params, callback);
}

function loadTasks(callback) {

    const params = {
        Select: 'ALL_ATTRIBUTES',
        TableName: TASKMAN_TABLE,
        KeyConditionExpression: "user_id = :id",
        ExpressionAttributeValues: {
            ":id": { 'S': AWS.config.credentials.identityId }
        }
    };

    ddb.query(params, (err, data) => {
        if (err) {
            callback(err, data);
        } else {
            // TODO index by task id?
            const tasks = data.Items.map(AWS.DynamoDB.Converter.unmarshall)
                .map(task => task.snoozeUntil
                    // Special parse for dates
                    ? { ...task, snoozeUntil: moment(task.snoozeUntil, moment.ISO8601, true) }
                    : task);
            callback(err, tasks);
        }
    });
}

export const Api = { syncTask, loadTasks };
