function fancyTimeFormat(time) {
  // Hours, minutes and seconds
  var hrs = ~~(time / 3600);
  var mins = ~~((time % 3600) / 60);
  var secs = time % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = "";

  if (hrs > 0) {
    ret += "" + hrs + "H " + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + "M " + (secs < 10 ? "0" : "");
  ret += "" + parseInt(secs) + "S";
  return ret;
}

function doThings(ip) {
  document.getElementById('out').innerHTML = '<h3>Loading from middleman.php</h3>';
  $.getJSON(`middleman.php?ip=${ip}`, function(j) {
    document.getElementById('out').innerHTML = '';
    if (j.error) {
      let outHTML = `<div class="row"><div class="col"><h3>error</h3></p>${j.error}</p></div><div class="col"><h3>req ip</h3></p>${j.ip}</p></div><div class="col"><h3>url</h3></p>${j.url}</p></div></div>`
      document.getElementById('out').innerHTML = outHTML;
      document.getElementById('out').innerHTML += `<a href="middleman.php?ip=${ip}" style="display: block; margin-top: 2em; color: #999; text-decoration: none;">View Raw JSON</a>`;
    } else {
      if (j.name) {
        document.getElementById('homename').innerHTML = j.name;
      }
      let i = -1;
      let a = -1;
      let outHTML = '';

      for (k in j) {
        if (j[k].toString() !== '[object Object]') {
          i++;
          if (i % 4 == 0 || i == 0) {
            outHTML += '</div><div class="row">';
          }

          let dots = '';
          if (j[k].toString().length > 20) {
            dots = '...';
          }

          let p = `${j[k].toString().substring(0,20)}${dots}`;
          let pO = `${j[k].toString()}`;

          if (k == 'uptime') {
            p = fancyTimeFormat(j[k]);
          }

          outHTML += `<div class="col"><h3>${k.replace('_',' ')}</h3><p title="${pO}">${p}</p></div>`;
        } else {
          // i++;
          // outHTML += '</div><div class="row">';
          // for (x in j[k]) {
          //   outHTML += `<div class="col"><h4>${k.replace('_',' ')}: ${x.replace('_',' ')}</h4><p>${j[k][x]}</p></div>`;
          // }
        }
      }

      document.getElementById('out').innerHTML = outHTML;
      document.getElementById('out').innerHTML += `<a href="middleman.php?ip=${ip}" style="display: block; margin-top: 2em; color: #999; text-decoration: none;">View Raw JSON</a>`
    }
  });
}
