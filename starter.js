const ipreg = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/g
const hashIp = window.location.hash.replace('#', '')
const ms = 2500;

if (hashIp) {
  ip = hashIp;
  document.getElementById('ip').value = hashIp;
} else {
  ip = document.getElementById('ip').value;
  window.location.hash = document.getElementById('ip').value;
}

if (ipreg.test(ip)) {
  doThings(ip);
  window.setInterval(doThings, parseInt(ms), [ip]);
} else {
  document.getElementById('out').innerHTML = '<h3>Invalid IP Given</h3>'
}
