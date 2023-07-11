require('dotenv').config();
// import axios from 'axios';
const { default: axios } = require('axios');
const express = require('express');
const jwt = require('jsonwebtoken');

const currencyApiBaseURL = process.env.CURRENCY_API_BASE_URL;
const accessKey = process.env.CURRENCY_API_ACCESS_KEY;

const app = express();
app.use(express.json());

const secretKey = process.env.ACCESS_TOKEN_SECRET;

const CurRates = {
    AED: 4.036328,
    AFN: 95.609036,
    ALL: 104.415595,
    AMD: 427.06767,
    ANG: 1.98395,
    AOA: 908.276666,
    ARS: 289.303841,
    AUD: 1.649442,
    AWG: 1.978108,
    AZN: 1.866524,
    BAM: 1.95611,
    BBD: 2.222552,
    BDT: 119.748975,
    BGN: 1.955854,
    BHD: 0.414326,
    BIF: 3115.520791,
    BMD: 1.098949,
    BND: 1.477181,
    BOB: 7.606205,
    BRL: 5.384302,
    BSD: 1.100764,
    BTC: 0.000036055438,
    BTN: 90.714299,
    BWP: 14.736335,
    BYN: 2.778466,
    BYR: 21539.402998,
    BZD: 2.2187,
    CAD: 1.457998,
    CDF: 2719.899085,
    CHF: 0.968878,
    CLF: 0.03245,
    CLP: 895.35786,
    CNY: 7.920564,
    COP: 4591.233644,
    CRC: 602.70647,
    CUC: 1.098949,
    CUP: 29.122152,
    CVE: 110.654087,
    CZK: 23.885619,
    DJF: 195.991056,
    DKK: 7.453095,
    DOP: 61.380843,
    DZD: 148.723305,
    EGP: 33.956761,
    ERN: 16.484237,
    ETB: 60.581504,
    EUR: 1,
    FJD: 2.443788,
    FKP: 0.856089,
    GBP: 0.851295,
    GEL: 2.846442,
    GGP: 0.856089,
    GHS: 12.520984,
    GIP: 0.856089,
    GMD: 65.552295,
    GNF: 9505.910087,
    GTQ: 8.632368,
    GYD: 230.296491,
    HKD: 8.602355,
    HNL: 27.091279,
    HRK: 7.666392,
    HTG: 152.455544,
    HUF: 379.475956,
    IDR: 16659.244637,
    ILS: 4.053023,
    IMP: 0.856089,
    INR: 90.583634,
    IQD: 1442.028495,
    IRR: 46444.337076,
    ISK: 146.896517,
    JEP: 0.856089,
    JMD: 170.151606,
    JOD: 0.779046,
    JPY: 154.698874,
    KES: 155.063122,
    KGS: 96.422101,
    KHR: 4545.761657,
    KMF: 492.329094,
    KPW: 989.072247,
    KRW: 1421.589393,
    KWD: 0.33762,
    KYD: 0.917329,
    KZT: 486.148184,
    LAK: 21082.532447,
    LBP: 16522.768444,
    LKR: 344.637745,
    LRD: 201.382385,
    LSL: 20.648942,
    LTL: 3.244911,
    LVL: 0.664743,
    LYD: 5.286301,
    MAD: 10.723199,
    MDL: 20.067362,
    MGA: 4989.229167,
    MKD: 61.624765,
    MMK: 2311.645254,
    MNT: 3781.282667,
    MOP: 8.876106,
    MRO: 392.324651,
    MUR: 49.998141,
    MVR: 16.896363,
    MWK: 1159.58374,
    MXN: 18.762028,
    MYR: 5.118352,
    MZN: 69.508929,
    NAD: 20.6495,
    NGN: 860.35628,
    NIO: 40.123151,
    NOK: 11.402454,
    NPR: 145.143319,
    NZD: 1.778248,
    OMR: 0.42309,
    PAB: 1.100774,
    PEN: 4.006235,
    PGK: 3.985758,
    PHP: 60.783916,
    PKR: 305.507876,
    PLN: 4.446963,
    PYG: 8006.268623,
    QAR: 4.001257,
    RON: 4.949117,
    RSD: 117.2414,
    RUB: 99.234921,
    RWF: 1285.22101,
    SAR: 4.122029,
    SBD: 9.204575,
    SCR: 14.390173,
    SDG: 659.927877,
    SEK: 11.744084,
    SGD: 1.475218,
    SHP: 1.337147,
    SLE: 21.873977,
    SLL: 21704.2454,
    SOS: 625.851442,
    SRD: 41.3263,
    STD: 22746.028274,
    SVC: 9.631526,
    SYP: 2761.160294,
    SZL: 20.518438,
    THB: 38.248374,
    TJS: 12.048009,
    TMT: 3.846322,
    TND: 3.384217,
    TOP: 2.582915,
    TRY: 28.693913,
    TTD: 7.473048,
    TWD: 34.426232,
    TZS: 2693.675846,
    UAH: 40.656142,
    UGX: 4050.641839,
    USD: 1.098949,
    UYU: 41.976651,
    UZS: 12714.841771,
    VEF: 3106266.248841,
    VES: 30.925626,
    VND: 26045.094441,
    VUV: 130.410799,
    WST: 2.977637,
    XAF: 656.072897,
    XAG: 0.04738,
    XAU: 0.000568,
    XCD: 2.969965,
    XDR: 0.825031,
    XOF: 656.066926,
    XPF: 119.64812,
    YER: 275.071057,
    ZAR: 20.406551,
    ZMK: 9891.856814,
    ZMW: 20.070811,
    ZWL: 353.861172
}

const users = [
    {
        id: 1,
        name: 'Mateo',
        email: 'mateo33@gmail.com'
    },
    {
        id: 2,
        name: 'Mariana',
        email: 'mariana33@gmail.com'
    },
    {
        id: 3,
        name: 'Rodrigo',
        email: 'rodrigo33@gmail.com'
    },
    {
        id: 4,
        name: 'Juana',
        email: 'juana33@gmail.com'
    },
]

const posts = [
    {
        title: 'mateo_post_1',
        id: 1,
        user: 'Mateo'
    },
    {
        title: 'mateo_post_2',
        id: 2,
        user: 'Mateo'
    },
    {
        title: 'mateo_post_3',
        id: 3,
        user: 'Mateo'
    },
    {
        title: 'mateo_post_4',
        id: 4,
        user: 'Mateo'
    },
    {
        title: 'Mariana_post_1',
        id: 1,
        user: 'Mariana'
    },
    {
        title: 'Mariana_post_2',
        id: 2,
        user: 'Mariana'
    },
    {
        title: 'Mariana_post_3',
        id: 3,
        user: 'Mariana'
    },
    {
        title: 'Mariana_post_4',
        id: 4,
        user: 'Mariana'
    },
    {
        title: 'Juana_post_1',
        id: 1,
        user: 'Juana'
    },
    {
        title: 'Juana_post_2',
        id: 2,
        user: 'Juana'
    },
    {
        title: 'Juana_post_3',
        id: 3,
        user: 'Juana'
    },
    {
        title: 'Juana_post_4',
        id: 4,
        user: 'Juana'
    },
]

const invalidatedTokens = [];

// Middleware to authenticate the token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if ( (!token) || (invalidatedTokens.includes(token)) ) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const user = jwt.verify(token, secretKey);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

// Login route
app.post('/login', (req, res) => {
    const email = req.body.email;
    const token = jwt.sign({ email }, secretKey);
    res.json({ token })
});

// Logout route
app.delete('/logout', invalidateToken, (req, res) => {
    res.json({ message: 'Loggedout succesfully' });
});

// Posts route
app.get('/posts', authenticateToken, (req, res) => {
    const user = req.user;
    userName = users.find(obj => obj.email == user.email).name;
    res.json(posts.filter(obj => obj.user == userName));
});

// Currency symbols
app.get('/currency/symbols', authenticateToken, async (req, res) => {
    const symbols = await getCurrancySymbols();
    res.json(symbols);
})

// Conver currency
app.get('/currency/convert', authenticateToken, async (req, res) => {
    const initialCurrency = 'EUR';
    const finalCurrency = req.body.finalCurrency;
    const amount = req.body.amount;
    const currencyRates = await getCurrencyRates('EUR');
    const finalAmount = amount * currencyRates[finalCurrency];
    res.json({ convertedAmount: finalAmount })
})

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

function invalidateToken(req, res, next) {
    const token = req.headers['authorization'].split(' ')[1];
    invalidatedTokens.push(token);
    next();
}

async function getCurrancySymbols() {
    try {
        const response = await axios.get(`${currencyApiBaseURL}symbols?access_key=${accessKey}`);
        const data = await response.data;
        return data;
    } catch (error) {
        return error;
    }
}

async function getCurrencyRates(baseCurrency) {
    try {
        const response = await axios.get(`${currencyApiBaseURL}latest?access_key=${accessKey}`);
        const data = await response.data;
        // console.log(data.rates);
        return data.rates;
    } catch (error) {
        return error;
    }
}