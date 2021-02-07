let lastIP;
let autoRefresh;

function status(message) {
  document.getElementById('js-status').innerHTML = `Last Status Msg: <b>${message}</b>`;
}

async function kickstart(ipAddr) {
  if(!ipAddr || ipAddr.length < 7) return status('You need to give an IP address!');

  status('Making the request to middleman.php');
  let j = await (await fetch(`middleman.php?ip=${ipAddr}`)).json();
  // status('Making the request to device');
  // let j = await (await fetch(`http://${ipAddr}:8008/setup/eureka_info`)).json();
  // console.log(j);

  if(j.error) return document.getElementById('js-out').innerHTML = `<p>Error: <b>${j.error}</b></p>`;
  
  lastIP = ipAddr;

  let uptime = new Date(null);
  uptime.setSeconds(j.uptime);

  status('Computing output');
  let htmlOut = `
    <h1>${(j.name) ? j.name : 'Unknown Name'}</h1>
 
    <h2>Device</h2>
    <p>Currently on <b>${j.release_track}</b> release track, ${(j.has_update) ? 'Updates' : 'No Updates'} Available</p>
    <p>Running <b>v${j.version}</b> <b>build ${j.build_version}</b>, Cast Build Rev: <b>${j.cast_build_revision}</b></p>
    <p>Uptime (HH:MM:SS): <b>${uptime.toISOString().substr(11, 8)}</b><p>

    <hr>

    <h2>Network</h2>
    <p>WiFi: <b>${(j.wpa_configured) ? 'Configured' : 'Not Configured'}</b>, SSID: <b>"${(j.ssid) ? j.ssid : 'None Saved'}"</b></p>
    <p>WiFi Signal Strength: <b>${(j.signal_level) ? j.signal_level : 'Unknown'}dBm</b>, Noise Level: <b>${(j.noise_level) ? j.noise_level : 'Unknown'}</b></p>
    <p>Ethernet: <b>${(j.ethernet_connected) ? 'Connected' : 'Not Connected'}</b></p>
    <p>LAN IP: <b>${(j.ip_address) ? j.ip_address : 'Unknown'}</b>, MAC Address: <b>${j.mac_address}</b></p>
    <p>BSSID of Setup Hotspot: <b>${j.hotspot_bssid}</b></p>

    <hr>
    
    <h2>Analytics</h2>
    <p>Crash Reports: <b>${(j.opt_in.crash) ? 'Opted In' : 'Opted Out'}</b>, OpenCast: <b>${(j.opt_in.opencast) ? 'Opted In' : 'Opted Out'}</b>, Statistics: <b>${(j.opt_in.stats) ? 'Opted In' : 'Opted Out'}</b></p>

    <hr>

    <h2>Regional</h2>
    <p>Timezone: <b>${j.timezone}</b>, Language: <b>${j.locale}</b></p>
    <p>Location: <b>${j.location.country_code}</b> (<b>${j.location.latitude}</b>, <b>${j.location.longitude}</b>)</p>

    <hr>

    <p style="text-align: right;"><a href="http://${j.ip_address}:8008/setup/eureka_info">View Raw JSON &raquo;</a></p>
  `;

  status('Showing output');
  return document.getElementById('js-out').innerHTML = htmlOut;
}

async function checkAutorefresh(checked) {
  if(checked) {
    status('Enabling autorefresh timer');
    if(!lastIP) {
      status('Load some data before enabling autorefresh!');
      document.getElementById('in-ar').checked = false;
      return;
    } else {
      return autoRefresh = setInterval(function(){kickstart(lastIP)},2000);
    }
  } else {
    status('Removing autorefresh timer');
    return clearInterval(autoRefresh);
  }
}