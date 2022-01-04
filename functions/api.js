// Interacts with the APIs set up in AWS

import axios from 'axios';

const fatdsUrl = 'https://2d3gyzaz6e.execute-api.us-east-1.amazonaws.com/arma/'


class FATDSService {

  // Firing data for a single target
  static SingleTarget(fp, tgt) {
    return new Promise(async (resolve, reject) => {
      try {
        // POST data
        const payload = {
          fp_lat: parseInt(fp.latitude),
          fp_lon: parseInt(fp.longitude),
          fp_alt: parseFloat(fp.altitude),
          tgt_lat: parseInt(tgt.latitude),
          tgt_lon: parseInt(tgt.longitude),
          tgt_alt: parseFloat(tgt.altitude),
          llama: true
        }

        let res = await axios.post(fatdsUrl, payload)

        res = res.data
        // rename and remove unnessecary items
        res = CleanupResponse(res)


        resolve(res)
      } catch (err) {
        reject(err)
      }
    })
  }


  // Firing data for multiple targets
  static MultiTarget(fp, tgts) {
    return new Promise(async (resolve, reject) => {
      try {
        let targetList = [];
        for (const idx in tgts) {
          // lat/lng flipped.
          // was a fix for the leaflet version
          let pushItem = {
            lng: tgts[idx].latitude,
            lat: tgts[idx].longitude,
            alt: tgts[idx].altitude,
            name: tgts[idx].title,
            llama: true
          };
          targetList.push(pushItem);
        }

        const payload = {
          fp_lat: parseInt(fp.latitude),
          fp_lon: parseInt(fp.longitude),
          fp_alt: parseFloat(fp.altitude),
          targets: targetList,
        };


        let res = await axios.post(fatdsUrl, payload)
        res = res.data

        if (!Array.isArray(res)) {
            res = [res];
          }

        // rename and remove unnessecary items

        for (let tgt in res) {
          res[tgt] = CleanupResponse(res[tgt])
        }


        resolve(res)
      } catch (err) {
        reject(err)
      }
    })
  }


  static LineOfSight(range, elevation) {
      return new Promise(async (resolve, reject) => {
          try {

            let payload = {
                range: parseInt(range),
                ele: parseFloat(elevation),
                llama: true
            }

            let res = await axios.post(fatdsUrl, payload)

            resolve(res.data)


          } catch(err) {
              reject(err)
          }
      })
  }

}

function CleanupResponse(resp) {

    // rename some keys from the api response
    resp.altDiff = resp.alt_diff;
    resp.latitude = resp.lat;
    resp.longitude = resp.lon;
    delete resp["alt_diff"];
    delete resp["lat"];
    delete resp["lon"];
    return resp
}

export default FATDSService
