const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const distance = require('google-distance-matrix');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const googleDistanceKey = process.env.GOOGLE_DISTANCE_MATRIX_API_KEY;
const dbConnectionString = process.env.DB_CONNECTION_STRING;

if (!(googleDistanceKey && dbConnectionString)) {
    console.error('Environment variables missing. Please check `.env.example` and try again.');
    process.exit();
}

distance.key(googleDistanceKey);

const port = process.env.PORT || 3000;
const connectionString = dbConnectionString;
const dataService = require('./data-service.js');
const serverData = dataService(connectionString);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/customers', (req, res) => {
    serverData.getAllCustomers().then((data) => {
        console.log(data);
        res.json(data);
    }).catch((err) => {
        console.log(err);
    });
});

app.put("/customers/:customerId", (req, res) => {
    data.updateCustomerById(req.params.customerId, req.body).then((data) => {
        res.json({ "message": "Customer " + data + " updated successfully" });
    })
        .catch((err) => {
            res.status(500).end();
        })
});

// app.get('/testdistance', (req, res) => {
//     const userAddress = req.body.address || '4000 Yonge Street';
//     const userDistance = req.body.distanceFromLocation || 2000;
//     let destinations = [];
//     let destinationObjs = [];
//     let places = [];

//     // Get server data for list of postings
//     serverData.getAllPostings().then((postings) => {
//         postings.forEach(function (element) {
//             destinations.push(element.Address);
//             destinationObjs.push(element);
//         }, this);

//         distance.matrix([userAddress], destinations, (err, distances) => {
//             if (!err) {
//                 // console.log(distances.rows[0]);
//                 distances.rows[0].elements.forEach((ele, i)=>{
//                     console.log(ele);
//                     if (ele.distance.value < userDistance) {
//                         places.push(destinationObjs[i]);
//                     }
//                     // ele.distance.value < 5000 && indices.push([i, ele]);
//                 })
//                 res.json(places);
//             }       
//         });
//     })
// });

app.post('/testdistance', (req, res) => {
    const userAddress = req.body.address || '4800 Yonge Street';
    const userDistance = req.body.distanceFromLocation || 2000;
    let destinations = [];
    let destinationObjs = [];
    let places = [];
    // console.log('userAddress: ' + userAddress);
    // console.log(req.body);
    // console.log('req.body.distanceFromLocation: ' + req.body.distanceFromLocation);
    // console.log('userDistance: ' + userDistance);

    // Get server data for list of postings
    serverData.getAllPostings().then((postings) => {
        postings.forEach(function (element) {
            destinations.push(element.Address);
            destinationObjs.push(element);
        }, this);

        // console.log(destinationObjs)
        distance.matrix([userAddress], destinations, (err, distances) => {
            if (!err) {
                console.log(distances);
                // if (distances.rows[0].elements.length > 0) {
                    distances.rows[0].elements.forEach((ele, i)=>{
                        try {
                            if (ele.distance.value < userDistance && destinationObjs[i].Available) {
                                places.push(destinationObjs[i]);
                            }
                        } catch (e) { console.log(e); }
                    })
                // }
                res.json(places);
            }       
        });
    })
}); 

app.get('/testdistance', (req, res) => {
    const userAddress = req.body.address || '700 Bloor Street';
    const userDistance = req.body.distanceFromLocation || 2000;
    let destinations = [];
    let destinationObjs = [];
    let places = [];
    // console.log('userAddress: ' + userAddress);
    // console.log(req.body);
    // console.log('req.body.distanceFromLocation: ' + req.body.distanceFromLocation);
    // console.log('userDistance: ' + userDistance);
    let testData = [];

    // Get server data for list of postings
    serverData.getAllPostings().then((postings) => {
        postings.forEach(function (element) {
            destinations.push(element.Address);
            destinationObjs.push(element);
        }, this);

        // console.log(dist)
        distance.matrix([userAddress], destinations, (err, distances) => {
            if (!err) {
                // console.log(distances.rows[0].elements);
                if (distances.rows[0].elements.length > 0) {
                    distances.rows[0].elements.forEach((ele, i)=>{
                        console.log(ele);
                        testData.push(ele);
                        if (ele.distance.value < userDistance && destinationObjs[i].Available) {
                            places.push(destinationObjs[i]);
                        }
                    })
                }
                res.json(testData);
            }       
        });
    })
}); 

app.post("/customers", (req, res) => {

    data.addCustomer(req.body).then((data) => {
        res.json({ "message": "Customer " + data + " added successfully" });
    })
        .catch((err) => {
            res.status(500).end();
        })
});
app.get('/postings', (req, res) => {
    serverData.getAllPostings().then((data) => {
        console.log(data);
        res.json(data);
    }).catch((err) => {
        console.log(err);
    });
});
app.get('/invoices', (req, res) => {
    serverData.getAllInvoices().then((data) => {
        console.log(data);
        res.json(data);
    }).catch((err) => {
        console.log(err);
    });
});

app.post('/submit', (req, res) => {
    const submissionData = req.body.submission;
    console.log(submissionData);
    serverData.updatePostingById(submissionData.postingId, { Available: false })
    .then((data) => {
        res.json({'successful': true});
    })
    .catch((err) => {
        console.log(err);
    })
});

serverData.connect().then(() => {
    app.listen(port, () => {
        console.log('Listening at port ' + port);
    });
});