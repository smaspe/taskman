import AWS from 'aws-sdk';
AWS.config.update({
    // TODO read about how to not give the credentials to the browser
    accessKeyId: '<access key>',
    secretAccessKey: '<secret>',
    region: 'us-east-1'
});

const TASKMAN_TABLE = 'taskman_tasks';

// Create the DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-10-08' });

function syncTask(task, callback) {
    const params = {
        TableName: TASKMAN_TABLE,
        Item: AWS.DynamoDB.Converter.marshall(task)
    };
    ddb.putItem(params, callback);
}

function loadTasks(callback) {

    const params = {
        Select: 'ALL_ATTRIBUTES',
        TableName: TASKMAN_TABLE
    };

    ddb.scan(params, (err, data) => {
        if (err) {
            callback(err, data);
        } else {
            // TODO look at parsing the dates from the snooze
            const tasks = data.Items.map(AWS.DynamoDB.Converter.unmarshall);
            callback(err, tasks);
        }
    });
}

export const Api = { syncTask, loadTasks };
