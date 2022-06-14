function indexOf(str, strx) {
  if (str == strx) return 0;

  var n = str.length;
  var m = strx.length;
  if (n < m) {
    return -1;
  }
  var sx = "";
  for (var i = 0; i < m - 1; i++) {
    sx = sx + str[i];
  }
  for (var i = m - 1; i < n; i++) {
    sx = sx + str[i];
    //console.log(sx);
    if (sx === strx) {
      return i - m + 1;
    }
    sx = sx.substr(1);
  }
  return -1;
}

export default function(row, filter) {
  filter = filter.trim();
  var Ok = false,
    x = -1;
  filter = (filter + " ").toUpperCase();
  var object = JSON.stringify(Object.values(row)).toUpperCase();

  while (filter.length > 0) {
    x = filter.indexOf(" ");
    if (x === -1) break;
    Ok = Ok || object.indexOf(filter.substr(0, x)) !== -1;
    //Ok = Ok || (indexOf(object, filter.substr(0, x)) !== -1);
    filter = filter.substr(x + 1);
    if (Ok) return Ok;
  }

  return Ok;
}
