export const FIXTURE_GET_QUOTE_FOR_SMALL = {
    code: '200',
    message: 'Successful',
    data: {
      origin: 'Dakar, Senegal',
      destination: 'Avenue Félix Éboué x, Route des Brasseries, Dakar, Senegal',
      legs: [{"distance":{"text":"5.6 km","value":5579},"duration":{"text":"19 mins","value":1124},"start_address":"Dakar, Senegal","end_address":"Avenue Félix Éboué x, Route des Brasseries, Dakar, Senegal","start_location":{"lat":14.7165766,"lng":-17.467633},"end_location":{"lat":14.691815,"lng":-17.4332306}}],
      total_distance: 5579,
      quote: 1000,
      normal_quote: 1000,
      package_size: 'small',
      coupon_quote: 0,
      delivery_type: 'standard'
    }
  }

export const FIXTURE_GET_QUOTE_FOR_MEDIUM = {
  "code": "200",
  "message": "Successful",
  "data": {
    "origin": "Ouest Foire, Dakar, Senegal",
    "destination": "Grand-Mbao, Dakar, Senegal",
    "legs": [
      {
        "distance": {
          "text": "20.6 km",
          "value": 20555
        },
        "duration": {
          "text": "38 mins",
          "value": 2268
        },
        "start_address": "Ouest Foire, Dakar, Senegal",
        "end_address": "Grand-Mbao, Dakar, Senegal",
        "start_location": {
          "lat": 14.7506602,
          "lng": -17.4708956
        },
        "end_location": {
          "lat": 14.7293286,
          "lng": -17.3212919
        }
      }
    ],
    "total_distance": 20555,
    "quote": 0,
    "normal_quote": 0,
    "package_size": "medium ",
    "coupon_quote": 0,
    "delivery_type": "standard"
  }
}

export const FIXTURE_GET_QUOTE_FOR_LARGE = {
  "code": "200",
  "message": "Successful",
  "data": {
    "origin": "11, Dakar, Senegal",
    "destination": "Liberte 6 Extension, Dakar, Senegal",
    "legs": [
      {
        "distance": {
          "text": "10.3 km",
          "value": 10289
        },
        "duration": {
          "text": "23 mins",
          "value": 1406
        },
        "start_address": "Rue PL 23, Dakar, Senegal",
        "end_address": "Liberte 6 Extension, Dakar, Senegal",
        "start_location": {
          "lat": 14.6722002,
          "lng": -17.4300655
        },
        "end_location": {
          "lat": 14.729225,
          "lng": -17.4691738
        }
      }
    ],
    "total_distance": 10289,
    "quote": 5000,
    "normal_quote": 5000,
    "package_size": "large",
    "coupon_quote": 0,
    "delivery_type": "standard"
  }
}

export const FIXTURE_GET_QUOTE_FOR_XLARGE =  {
  "code": "200",
  "message": "Successful",
  "data": {
    "origin": "Sacre Coeur 3 Extension, Dakar, Senegal",
    "destination": "Liberte 6 Extension, Dakar, Senegal",
    "legs": [
      {
        "distance": {
          "text": "3.0 km",
          "value": 3012
        },
        "duration": {
          "text": "10 mins",
          "value": 571
        },
        "start_address": "Sacre Coeur 3 Extension, Dakar, Senegal",
        "end_address": "Liberte 6 Extension, Dakar, Senegal",
        "start_location": {
          "lat": 14.7225972,
          "lng": -17.4727602
        },
        "end_location": {
          "lat": 14.729225,
          "lng": -17.4691738
        }
      }
    ],
    "total_distance": 3012,
    "quote": 0,
    "normal_quote": 0,
    "package_size": "xlarge",
    "coupon_quote": 0,
    "delivery_type": "standard"
  }
}
